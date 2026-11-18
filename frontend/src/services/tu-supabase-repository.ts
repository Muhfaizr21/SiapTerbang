import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import type {
  DormitoryRoomRecord,
  MandatoryDocType,
  NewApplicantFormInput,
  OffboardingRecord,
  OfficialLetterRecord,
  OfficialLetterType,
  PhysicalSelectionFormInput,
  StudentRecord,
  StudentDocItem,
  ViolationLogItem,
  DocVerificationStatus,
} from "@/types/tu";
import {
  calculateBMI,
  evaluateDisciplineLock,
  calculateNetRefund,
  MANDATORY_DOCUMENT_META,
} from "@/services/tu-domain-engine";

const DEFAULT_TENANT = "tenant-lpk-nusantara";

export interface DatabaseStudentRow {
  id: string;
  tenant_id: string;
  nis: string | null;
  nik: string;
  full_name: string;
  gender: "LAKI_LAKI" | "PEREMPUAN";
  birth_place: string;
  birth_date: string;
  phone_student: string;
  parent_name: string;
  phone_parent: string;
  address: string;
  education_level: string;
  target_program: "MAGANG_JEPANG" | "TOKUTEI_GINOU" | "KOREA_G2G";
  batch_name: string;
  ppdb_status: "MENUNGGU_SELEKSI" | "LULUS_SELEKSI" | "DITOLAK";
  height_cm: number;
  weight_kg: number;
  bmi_score: number;
  color_blind_status: "NORMAL" | "PARSIAL" | "TOTAL";
  has_tattoo_or_piercing: boolean;
  math_score: number;
  dormitory_room_id: string | null;
  violation_points: number;
  student_status: "CALON_SISWA" | "AKTIF" | "SUSPENDED" | "OFFBOARDED" | "ALUMNI";
  locked_from_mensetsu: boolean;
  portal_account_active: boolean;
  initial_invoice_triggered: boolean;
  created_at: string;
}

export interface DatabaseDocumentRow {
  id: string;
  tenant_id: string;
  student_id: string;
  doc_type: MandatoryDocType;
  document_number: string | null;
  file_url: string | null;
  verification_status: DocVerificationStatus;
  rejection_reason: string | null;
  issued_date: string | null;
  expiry_date: string | null;
  verified_by: string | null;
  verified_at: string | null;
  updated_at: string;
}

export interface DatabaseRoomRow {
  id: string;
  tenant_id: string;
  room_code: string;
  building_name: string;
  gender_zone: "PUTRA" | "PUTRI";
  capacity: number;
  occupied_count: number;
}

export interface DatabaseViolationRow {
  id: string;
  tenant_id: string;
  student_id: string;
  violation_title: string;
  category: "RINGAN" | "SEDANG" | "BERAT";
  points_added: number;
  recorded_by: string;
  notes: string | null;
  occurred_at: string;
  students?: {
    full_name: string;
    nis: string | null;
  };
}

export interface DatabaseLetterRow {
  id: string;
  tenant_id: string;
  student_id: string;
  letter_number: string;
  letter_type: OfficialLetterType;
  destination_agency: string;
  signer_name: string;
  signer_role: string;
  issued_date: string;
  students?: {
    full_name: string;
    nis: string | null;
    nik: string;
  };
}

export interface DatabaseOffboardingRow {
  id: string;
  tenant_id: string;
  student_id: string;
  reason: string;
  total_paid_idr: number;
  deduction_mcu_idr: number;
  deduction_passport_idr: number;
  deduction_uniform_idr: number;
  deduction_dorm_idr: number;
  net_refund_idr: number;
  approval_status: "MENUNGGU_DIREKTUR" | "DISETUJUI_DIREKTUR" | "DICAIRKAN_KEUANGAN";
  created_at: string;
  students?: {
    full_name: string;
    nis: string | null;
  };
}

function getLabelForDocType(docType: MandatoryDocType): string {
  const meta = MANDATORY_DOCUMENT_META.find((m) => m.docType === docType);
  return meta ? meta.label : docType;
}

export class TuSupabaseRepository {
  private client = createBrowserSupabaseClient();

  /**
   * Pastikan database Supabase memiliki data awal untuk tenant jika tabel masih kosong.
   */
  async ensureSeeded(tenantId: string = DEFAULT_TENANT): Promise<void> {
    const { count, error } = await this.client
      .from("dormitory_rooms")
      .select("*", { count: "exact", head: true })
      .eq("tenant_id", tenantId);

    if (error) {
      console.warn("Cek seed kamar asrama Supabase:", error.message);
      return;
    }

    if (count !== null && count > 0) {
      return; // Sudah memiliki data live di Supabase
    }

    // 1. Seed Kamar Asrama
    const initialRooms: Omit<DatabaseRoomRow, "id">[] = [
      {
        tenant_id: tenantId,
        room_code: "A-101",
        building_name: "Asrama Putra Sakura",
        gender_zone: "PUTRA",
        capacity: 8,
        occupied_count: 6,
      },
      {
        tenant_id: tenantId,
        room_code: "A-102",
        building_name: "Asrama Putra Sakura",
        gender_zone: "PUTRA",
        capacity: 8,
        occupied_count: 7,
      },
      {
        tenant_id: tenantId,
        room_code: "B-201",
        building_name: "Asrama Putri Fuji",
        gender_zone: "PUTRI",
        capacity: 8,
        occupied_count: 5,
      },
      {
        tenant_id: tenantId,
        room_code: "B-202",
        building_name: "Asrama Putri Fuji",
        gender_zone: "PUTRI",
        capacity: 8,
        occupied_count: 4,
      },
    ];

    const { data: createdRooms, error: roomErr } = await this.client
      .from("dormitory_rooms")
      .insert(initialRooms)
      .select();

    if (roomErr || !createdRooms) {
      console.error("Gagal seed kamar:", roomErr);
      return;
    }

    const roomMap = new Map<string, string>();
    createdRooms.forEach((r) => roomMap.set(r.room_code, r.id));

    // 2. Seed Siswa Awal
    const initialStudents: Array<Omit<DatabaseStudentRow, "id" | "created_at">> = [
      {
        tenant_id: tenantId,
        nis: "LPK-2026-1001",
        nik: "3204011805030001",
        full_name: "Rizky Pratama Putra",
        gender: "LAKI_LAKI",
        birth_place: "Bandung",
        birth_date: "2003-05-18",
        phone_student: "081234567890",
        parent_name: "Hendra Wijaya",
        phone_parent: "081234567899",
        address: "Jl. Sukajadi No. 42, Sukajadi, Kota Bandung",
        education_level: "SMK Teknik Mesin",
        target_program: "MAGANG_JEPANG",
        batch_name: "Angkatan 42 - Manufaktur",
        ppdb_status: "LULUS_SELEKSI",
        height_cm: 172,
        weight_kg: 64,
        bmi_score: 21.6,
        color_blind_status: "NORMAL",
        has_tattoo_or_piercing: false,
        math_score: 88,
        dormitory_room_id: roomMap.get("A-101") || null,
        violation_points: 65,
        student_status: "AKTIF",
        locked_from_mensetsu: false,
        portal_account_active: true,
        initial_invoice_triggered: true,
      },
      {
        tenant_id: tenantId,
        nis: "LPK-2026-1002",
        nik: "3204015409040002",
        full_name: "Aulia Rahmawati",
        gender: "PEREMPUAN",
        birth_place: "Cimahi",
        birth_date: "2004-09-14",
        phone_student: "081398765400",
        parent_name: "Siti Maryam",
        phone_parent: "081398765499",
        address: "Komplek Cihanjuang Asri B-12, Cimahi",
        education_level: "D3 Keperawatan",
        target_program: "TOKUTEI_GINOU",
        batch_name: "Angkatan 43 - Careworker Kaigo",
        ppdb_status: "LULUS_SELEKSI",
        height_cm: 158,
        weight_kg: 50,
        bmi_score: 20.0,
        color_blind_status: "NORMAL",
        has_tattoo_or_piercing: false,
        math_score: 92,
        dormitory_room_id: roomMap.get("B-201") || null,
        violation_points: 0,
        student_status: "AKTIF",
        locked_from_mensetsu: false,
        portal_account_active: true,
        initial_invoice_triggered: true,
      },
      {
        tenant_id: tenantId,
        nis: "LPK-2026-1003",
        nik: "3204021201020003",
        full_name: "Fajar Nugroho",
        gender: "LAKI_LAKI",
        birth_place: "Garut",
        birth_date: "2002-01-12",
        phone_student: "082144556600",
        parent_name: "Agus Nugroho",
        phone_parent: "082144556699",
        address: "Kp. Tarogong Kidul RT 02/05, Garut",
        education_level: "SMA IPA",
        target_program: "MAGANG_JEPANG",
        batch_name: "Angkatan 42 - Konstruksi",
        ppdb_status: "LULUS_SELEKSI",
        height_cm: 168,
        weight_kg: 59,
        bmi_score: 20.9,
        color_blind_status: "NORMAL",
        has_tattoo_or_piercing: false,
        math_score: 80,
        dormitory_room_id: roomMap.get("A-102") || null,
        violation_points: 80,
        student_status: "AKTIF",
        locked_from_mensetsu: false,
        portal_account_active: true,
        initial_invoice_triggered: true,
      },
      {
        tenant_id: tenantId,
        nis: null,
        nik: "3204031911040004",
        full_name: "Bagas Adi Saputra",
        gender: "LAKI_LAKI",
        birth_place: "Tasikmalaya",
        birth_date: "2004-11-19",
        phone_student: "085711223300",
        parent_name: "Bambang Saputra",
        phone_parent: "085711223399",
        address: "Jl. Indihiang No. 8, Tasikmalaya",
        education_level: "SMK Otomotif",
        target_program: "KOREA_G2G",
        batch_name: "Angkatan 12 - Manufaktur Korea",
        ppdb_status: "MENUNGGU_SELEKSI",
        height_cm: 170,
        weight_kg: 62,
        bmi_score: 21.5,
        color_blind_status: "NORMAL",
        has_tattoo_or_piercing: false,
        math_score: 0,
        dormitory_room_id: null,
        violation_points: 0,
        student_status: "CALON_SISWA",
        locked_from_mensetsu: true,
        portal_account_active: false,
        initial_invoice_triggered: false,
      },
      {
        tenant_id: tenantId,
        nis: null,
        nik: "3204016603050005",
        full_name: "Siti Nurhaliza Putri",
        gender: "PEREMPUAN",
        birth_place: "Sumedang",
        birth_date: "2005-03-26",
        phone_student: "087812349000",
        parent_name: "Dadang Ruhiyat",
        phone_parent: "087812349099",
        address: "Dusun Cimalaka RT 01/02, Sumedang",
        education_level: "SMK Perhotelan",
        target_program: "TOKUTEI_GINOU",
        batch_name: "Angkatan 44 - Food Service",
        ppdb_status: "MENUNGGU_SELEKSI",
        height_cm: 161,
        weight_kg: 52,
        bmi_score: 20.1,
        color_blind_status: "NORMAL",
        has_tattoo_or_piercing: false,
        math_score: 0,
        dormitory_room_id: null,
        violation_points: 0,
        student_status: "CALON_SISWA",
        locked_from_mensetsu: true,
        portal_account_active: false,
        initial_invoice_triggered: false,
      },
    ];

    const { data: createdStudents, error: stuErr } = await this.client
      .from("students")
      .insert(initialStudents)
      .select();

    if (stuErr || !createdStudents) {
      console.error("Gagal seed siswa:", stuErr);
      return;
    }

    // 3. Seed Dokumen 7 Berkas per Siswa
    const docInserts: Array<{
      tenant_id: string;
      student_id: string;
      doc_type: MandatoryDocType;
      document_number: string;
      verification_status: DocVerificationStatus;
      rejection_reason: string;
      expiry_date: string | null;
      verified_by: string;
    }> = [];

    createdStudents.forEach((st) => {
      const isGraduated = st.ppdb_status === "LULUS_SELEKSI";
      MANDATORY_DOCUMENT_META.forEach((meta) => {
        let status: DocVerificationStatus = isGraduated ? "VALID" : "MENUNGGU";
        let expiryDate: string | null = null;
        let docNum = `${meta.docType}-${st.nik.slice(-6)}`;

        if (meta.docType === "PASPOR") {
          expiryDate = st.full_name.includes("Rizky") ? "2026-12-06" : "2028-05-18";
        } else if (meta.docType === "MCU") {
          expiryDate = st.full_name.includes("Aulia") ? "2026-11-29" : "2027-04-12";
        }

        docInserts.push({
          tenant_id: tenantId,
          student_id: st.id,
          doc_type: meta.docType,
          document_number: docNum,
          verification_status: status,
          rejection_reason: "",
          expiry_date: expiryDate,
          verified_by: isGraduated ? "Nadia Putri (TU)" : "",
        });
      });
    });

    await this.client.from("student_documents").insert(docInserts);

    // 4. Seed Buku Log Pelanggaran
    const fajar = createdStudents.find((s) => s.full_name.includes("Fajar"));
    if (fajar) {
      await this.client.from("dormitory_violations").insert([
        {
          tenant_id: tenantId,
          student_id: fajar.id,
          violation_title: "Keluar area asrama melewati jam malam (22:30 WIB)",
          category: "BERAT",
          points_added: 50,
          recorded_by: "Nadia Putri (Admin TU)",
          notes: "Melompat pagar belakang gedung asrama putra.",
          occurred_at: "2026-11-15T22:45:00Z",
        },
        {
          tenant_id: tenantId,
          student_id: fajar.id,
          violation_title: "Merokok di balkon Gedung Asrama Putra A-102",
          category: "SEDANG",
          points_added: 30,
          recorded_by: "Nadia Putri (Admin TU)",
          notes: "Ditemukan puntung rokok di area jemuran balkon.",
          occurred_at: "2026-11-10T19:20:00Z",
        },
      ]);
    }

    // 5. Seed Surat Resmi
    const rizky = createdStudents.find((s) => s.full_name.includes("Rizky"));
    if (rizky) {
      await this.client.from("official_letters").insert([
        {
          tenant_id: tenantId,
          student_id: rizky.id,
          letter_number: "042/TU-LPKN/XI/2026",
          letter_type: "PENGANTAR_PASPOR",
          destination_agency: "Kantor Imigrasi Kelas I TPI Bandung",
          signer_name: "Drs. H. Ahmad Fauzi, M.M.",
          signer_role: "Direktur Utama LPK",
          issued_date: "2026-11-12",
        },
      ]);
    }

    // 6. Seed Permohonan Offboarding & Refund
    if (fajar) {
      await this.client.from("offboarding_requests").insert([
        {
          tenant_id: tenantId,
          student_id: fajar.id,
          reason: "Permintaan mengundurkan diri atas alasan keluarga & akumulasi disiplin 80 poin.",
          total_paid_idr: 15000000,
          deduction_mcu_idr: 1250000,
          deduction_passport_idr: 650000,
          deduction_uniform_idr: 750000,
          deduction_dorm_idr: 2000000,
          net_refund_idr: 10350000,
          approval_status: "MENUNGGU_DIREKTUR",
        },
      ]);
    }
  }

  /**
   * Mengambil daftar kamar asrama live dari Supabase
   */
  async fetchRooms(tenantId: string = DEFAULT_TENANT): Promise<DormitoryRoomRecord[]> {
    const { data, error } = await this.client
      .from("dormitory_rooms")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("room_code", { ascending: true });

    if (error || !data) {
      console.error("Gagal mengambil kamar dari Supabase:", error);
      return [];
    }

    return data.map((r: DatabaseRoomRow) => ({
      id: r.id,
      roomCode: r.room_code,
      buildingName: r.building_name,
      genderZone: r.gender_zone,
      capacity: r.capacity,
      occupiedCount: r.occupied_count,
    }));
  }

  /**
   * Mengambil seluruh data siswa beserta dokumen 7 berkas legalitas dari Supabase
   */
  async fetchStudents(tenantId: string = DEFAULT_TENANT): Promise<StudentRecord[]> {
    const { data: studentsData, error: stuError } = await this.client
      .from("students")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });

    if (stuError || !studentsData) {
      console.error("Gagal mengambil siswa dari Supabase:", stuError);
      return [];
    }

    const { data: docsData } = await this.client
      .from("student_documents")
      .select("*")
      .eq("tenant_id", tenantId);

    const docsByStudent = new Map<string, StudentDocItem[]>();
    (docsData || []).forEach((d: DatabaseDocumentRow) => {
      const list = docsByStudent.get(d.student_id) || [];
      list.push({
        id: d.id,
        docType: d.doc_type,
        label: getLabelForDocType(d.doc_type),
        documentNumber: d.document_number || "",
        status: d.verification_status,
        rejectionReason: d.rejection_reason || "",
        expiryDate: d.expiry_date || "",
        verifiedBy: d.verified_by || "",
        updatedAt: d.updated_at ? d.updated_at.slice(0, 10) : "",
      });
      docsByStudent.set(d.student_id, list);
    });

    const { data: roomsData } = await this.client
      .from("dormitory_rooms")
      .select("id, room_code")
      .eq("tenant_id", tenantId);

    const roomCodeMap = new Map<string, string>();
    (roomsData || []).forEach((r) => roomCodeMap.set(r.id, r.room_code));

    return studentsData.map((s: DatabaseStudentRow) => {
      const docs = docsByStudent.get(s.id) || [];
      return {
        id: s.id,
        tenantId: s.tenant_id,
        nis: s.nis || "",
        nik: s.nik,
        fullName: s.full_name,
        gender: s.gender,
        birthPlace: s.birth_place,
        birthDate: s.birth_date,
        phoneStudent: s.phone_student,
        parentName: s.parent_name,
        phoneParent: s.phone_parent,
        address: s.address,
        educationLevel: s.education_level,
        targetProgram: s.target_program,
        batchName: s.batch_name,
        ppdbStatus: s.ppdb_status,
        heightCm: Number(s.height_cm),
        weightKg: Number(s.weight_kg),
        bmiScore: Number(s.bmi_score),
        colorBlindStatus: s.color_blind_status,
        hasTattooOrPiercing: s.has_tattoo_or_piercing,
        mathScore: s.math_score,
        dormitoryRoomId: s.dormitory_room_id || "",
        dormitoryRoomCode: s.dormitory_room_id
          ? roomCodeMap.get(s.dormitory_room_id) || "-"
          : "-",
        violationPoints: s.violation_points,
        studentStatus: s.student_status,
        lockedFromMensetsu: s.locked_from_mensetsu,
        portalAccountActive: s.portal_account_active,
        initialInvoiceTriggered: s.initial_invoice_triggered,
        totalPaidIdr: 1500000,
        documents: docs,
        createdAt: s.created_at ? s.created_at.slice(0, 10) : "",
      };
    });
  }

  /**
   * Mengambil buku log pelanggaran asrama dari Supabase
   */
  async fetchViolations(tenantId: string = DEFAULT_TENANT): Promise<ViolationLogItem[]> {
    const { data, error } = await this.client
      .from("dormitory_violations")
      .select("*, students(full_name, nis)")
      .eq("tenant_id", tenantId)
      .order("occurred_at", { ascending: false });

    if (error || !data) {
      console.error("Gagal mengambil log pelanggaran:", error);
      return [];
    }

    return data.map((v: DatabaseViolationRow) => ({
      id: v.id,
      studentId: v.student_id,
      studentName: v.students?.full_name || "Siswa LPK",
      studentNis: v.students?.nis || "-",
      violationTitle: v.violation_title,
      category: v.category,
      pointsAdded: v.points_added,
      recordedBy: v.recorded_by,
      occurredAt: v.occurred_at ? v.occurred_at.replace("T", " ").slice(0, 16) + " WIB" : "",
    }));
  }

  /**
   * Mengambil surat resmi dari Supabase
   */
  async fetchLetters(tenantId: string = DEFAULT_TENANT): Promise<OfficialLetterRecord[]> {
    const { data, error } = await this.client
      .from("official_letters")
      .select("*, students(full_name, nis, nik)")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Gagal mengambil surat resmi:", error);
      return [];
    }

    return data.map((l: DatabaseLetterRow) => ({
      id: l.id,
      studentId: l.student_id,
      studentName: l.students?.full_name || "-",
      studentNis: l.students?.nis || "-",
      studentNik: l.students?.nik || "-",
      letterNumber: l.letter_number,
      letterType: l.letter_type,
      destinationAgency: l.destination_agency,
      signerName: l.signer_name,
      signerRole: l.signer_role,
      issuedDate: l.issued_date,
    }));
  }

  /**
   * Mengambil pengajuan offboarding & kalkulasi refund dari Supabase
   */
  async fetchOffboardings(tenantId: string = DEFAULT_TENANT): Promise<OffboardingRecord[]> {
    const { data, error } = await this.client
      .from("offboarding_requests")
      .select("*, students(full_name, nis)")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Gagal mengambil data offboarding:", error);
      return [];
    }

    return data.map((o: DatabaseOffboardingRow) => ({
      id: o.id,
      studentId: o.student_id,
      studentName: o.students?.full_name || "-",
      studentNis: o.students?.nis || "-",
      reason: o.reason,
      totalPaidIdr: Number(o.total_paid_idr),
      deductionMcuIdr: Number(o.deduction_mcu_idr),
      deductionPassportIdr: Number(o.deduction_passport_idr),
      deductionUniformIdr: Number(o.deduction_uniform_idr),
      deductionDormIdr: Number(o.deduction_dorm_idr),
      netRefundIdr: Number(o.net_refund_idr),
      approvalStatus: o.approval_status,
      createdAt: o.created_at ? o.created_at.slice(0, 10) : "",
    }));
  }

  /**
   * Menambah pendaftar PPDB baru ke Supabase
   */
  async createApplicant(
    tenantId: string = DEFAULT_TENANT,
    input: NewApplicantFormInput
  ): Promise<{ student: StudentRecord | null; error: string | null }> {
    const cleanNik = input.nik.trim();
    const bmi = calculateBMI(input.heightCm, input.weightKg);

    const { data: stuData, error: stuErr } = await this.client
      .from("students")
      .insert({
        tenant_id: tenantId,
        nik: cleanNik,
        full_name: input.fullName.trim(),
        gender: input.gender,
        birth_place: input.birthPlace.trim(),
        birth_date: input.birthDate,
        phone_student: input.phoneStudent.trim(),
        parent_name: input.parentName.trim(),
        phone_parent: input.phoneParent.trim(),
        address: input.address.trim(),
        education_level: input.educationLevel.trim(),
        target_program: input.targetProgram,
        batch_name: input.batchName.trim(),
        ppdb_status: "MENUNGGU_SELEKSI",
        height_cm: input.heightCm,
        weight_kg: input.weightKg,
        bmi_score: bmi,
        color_blind_status: "NORMAL",
        has_tattoo_or_piercing: false,
        math_score: 0,
        dormitory_room_id: null,
        violation_points: 0,
        student_status: "CALON_SISWA",
        locked_from_mensetsu: true,
        portal_account_active: false,
        initial_invoice_triggered: false,
      })
      .select()
      .single();

    if (stuErr || !stuData) {
      return { student: null, error: stuErr?.message || "Gagal menyimpan siswa ke Supabase." };
    }

    // Buat 7 Berkas Wajib untuk siswa baru
    const docsPayload = MANDATORY_DOCUMENT_META.map((meta) => ({
      tenant_id: tenantId,
      student_id: stuData.id,
      doc_type: meta.docType,
      document_number: "",
      verification_status: "MENUNGGU" as DocVerificationStatus,
      rejection_reason: "",
      expiry_date: null,
      verified_by: "",
    }));

    const { data: createdDocs } = await this.client
      .from("student_documents")
      .insert(docsPayload)
      .select();

    const formattedDocs: StudentDocItem[] = (createdDocs || []).map((d: DatabaseDocumentRow) => ({
      id: d.id,
      docType: d.doc_type,
      label: getLabelForDocType(d.doc_type),
      documentNumber: "",
      status: d.verification_status,
      rejectionReason: "",
      expiryDate: "",
      verifiedBy: "",
      updatedAt: d.updated_at ? d.updated_at.slice(0, 10) : "",
    }));

    const newStudentRecord: StudentRecord = {
      id: stuData.id,
      tenantId: stuData.tenant_id,
      nis: "",
      nik: stuData.nik,
      fullName: stuData.full_name,
      gender: stuData.gender,
      birthPlace: stuData.birth_place,
      birthDate: stuData.birth_date,
      phoneStudent: stuData.phone_student,
      parentName: stuData.parent_name,
      phoneParent: stuData.phone_parent,
      address: stuData.address,
      educationLevel: stuData.education_level,
      targetProgram: stuData.target_program,
      batchName: stuData.batch_name,
      ppdbStatus: stuData.ppdb_status,
      heightCm: Number(stuData.height_cm),
      weightKg: Number(stuData.weight_kg),
      bmiScore: Number(stuData.bmi_score),
      colorBlindStatus: stuData.color_blind_status,
      hasTattooOrPiercing: stuData.has_tattoo_or_piercing,
      mathScore: stuData.math_score,
      dormitoryRoomId: "",
      dormitoryRoomCode: "-",
      violationPoints: 0,
      studentStatus: "CALON_SISWA",
      lockedFromMensetsu: true,
      portalAccountActive: false,
      initialInvoiceTriggered: false,
      totalPaidIdr: 1500000,
      documents: formattedDocs,
      createdAt: stuData.created_at ? stuData.created_at.slice(0, 10) : "",
    };

    return { student: newStudentRecord, error: null };
  }

  /**
   * Menilai seleksi fisik dan menerbitkan NIS (Cross-Role Lock #1A)
   */
  async evaluateAndActivate(
    studentId: string,
    input: PhysicalSelectionFormInput,
    newNis: string
  ): Promise<{ success: boolean; error: string | null }> {
    const bmi = calculateBMI(input.heightCm, input.weightKg);
    const updatePayload: Record<string, unknown> = {
      height_cm: input.heightCm,
      weight_kg: input.weightKg,
      bmi_score: bmi,
      color_blind_status: input.colorBlindStatus,
      has_tattoo_or_piercing: input.hasTattooOrPiercing,
      math_score: input.mathScore,
      updated_at: new Date().toISOString(),
    };

    if (input.approveGraduation) {
      updatePayload.ppdb_status = "LULUS_SELEKSI";
      updatePayload.nis = newNis;
      updatePayload.student_status = "AKTIF";
      updatePayload.locked_from_mensetsu = false;
      updatePayload.portal_account_active = true;
      updatePayload.initial_invoice_triggered = true;
    }

    const { error } = await this.client
      .from("students")
      .update(updatePayload)
      .eq("id", studentId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  }

  /**
   * Plotting kamar asrama siswa ke Supabase
   */
  async assignRoom(
    studentId: string,
    roomId: string
  ): Promise<{ success: boolean; error: string | null }> {
    const { error: stuErr } = await this.client
      .from("students")
      .update({
        dormitory_room_id: roomId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", studentId);

    if (stuErr) {
      return { success: false, error: stuErr.message };
    }

    // Ambil kuota dan perbarui occupancy
    const { data: roomData } = await this.client
      .from("dormitory_rooms")
      .select("occupied_count, capacity")
      .eq("id", roomId)
      .single();

    if (roomData && roomData.occupied_count < roomData.capacity) {
      await this.client
        .from("dormitory_rooms")
        .update({
          occupied_count: roomData.occupied_count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", roomId);
    }

    return { success: true, error: null };
  }

  /**
   * Merekam poin pelanggaran asrama (Cross-Role Lock #1B: >= 100 pts -> SUSPENDED)
   */
  async recordViolation(
    tenantId: string = DEFAULT_TENANT,
    student: StudentRecord,
    input: {
      title: string;
      category: "RINGAN" | "SEDANG" | "BERAT";
      points: number;
      recordedBy: string;
    }
  ): Promise<{ violation: ViolationLogItem | null; error: string | null }> {
    const nextPoints = student.violationPoints + input.points;
    const lockEval = evaluateDisciplineLock(nextPoints);

    // 1. Simpan Log Pelanggaran
    const { data: vioData, error: vioErr } = await this.client
      .from("dormitory_violations")
      .insert({
        tenant_id: tenantId,
        student_id: student.id,
        violation_title: input.title,
        category: input.category,
        points_added: input.points,
        recorded_by: input.recordedBy,
        occurred_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (vioErr || !vioData) {
      return { violation: null, error: vioErr?.message || "Gagal mencatat pelanggaran." };
    }

    // 2. Perbarui Poin & Status Disiplin Siswa
    await this.client
      .from("students")
      .update({
        violation_points: nextPoints,
        student_status: lockEval.studentStatus,
        locked_from_mensetsu: lockEval.lockedFromMensetsu,
        updated_at: new Date().toISOString(),
      })
      .eq("id", student.id);

    const logItem: ViolationLogItem = {
      id: vioData.id,
      studentId: student.id,
      studentName: student.fullName,
      studentNis: student.nis,
      violationTitle: input.title,
      category: input.category,
      pointsAdded: input.points,
      recordedBy: input.recordedBy,
      occurredAt: new Date().toISOString().replace("T", " ").slice(0, 16) + " WIB",
    };

    return { violation: logItem, error: null };
  }

  /**
   * Reset poin disiplin / pemutihan siswa
   */
  async resetRehabilitation(
    studentId: string,
    isGraduated: boolean
  ): Promise<{ success: boolean; error: string | null }> {
    const { error } = await this.client
      .from("students")
      .update({
        violation_points: 0,
        student_status: isGraduated ? "AKTIF" : "CALON_SISWA",
        locked_from_mensetsu: !isGraduated,
        updated_at: new Date().toISOString(),
      })
      .eq("id", studentId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  }

  /**
   * Update status verifikasi 7 Berkas Dokumen Legalitas
   */
  async updateDocument(params: {
    studentId: string;
    docType: MandatoryDocType;
    documentNumber: string;
    status: DocVerificationStatus;
    rejectionReason: string;
    expiryDate: string;
    verifiedBy: string;
  }): Promise<{ success: boolean; error: string | null }> {
    const { error } = await this.client
      .from("student_documents")
      .update({
        document_number: params.documentNumber,
        verification_status: params.status,
        rejection_reason: params.rejectionReason,
        expiry_date: params.expiryDate ? params.expiryDate : null,
        verified_by: params.verifiedBy,
        verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .match({ student_id: params.studentId, doc_type: params.docType });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  }

  /**
   * Generator Surat Resmi Berkop LPK
   */
  async createOfficialLetter(
    tenantId: string = DEFAULT_TENANT,
    student: StudentRecord,
    params: {
      letterNumber: string;
      letterType: OfficialLetterType;
      destinationAgency: string;
      signerName: string;
      signerRole: string;
    }
  ): Promise<{ letter: OfficialLetterRecord | null; error: string | null }> {
    const { data, error } = await this.client
      .from("official_letters")
      .insert({
        tenant_id: tenantId,
        student_id: student.id,
        letter_number: params.letterNumber,
        letter_type: params.letterType,
        destination_agency: params.destinationAgency,
        signer_name: params.signerName,
        signer_role: params.signerRole,
        issued_date: new Date().toISOString().slice(0, 10),
      })
      .select()
      .single();

    if (error || !data) {
      return { letter: null, error: error?.message || "Gagal membuat surat resmi." };
    }

    const record: OfficialLetterRecord = {
      id: data.id,
      studentId: student.id,
      studentName: student.fullName,
      studentNis: student.nis,
      studentNik: student.nik,
      letterNumber: params.letterNumber,
      letterType: params.letterType,
      destinationAgency: params.destinationAgency,
      signerName: params.signerName,
      signerRole: params.signerRole,
      issuedDate: data.issued_date,
    };

    return { letter: record, error: null };
  }

  /**
   * Pengajuan Offboarding Siswa & Refund
   */
  async submitOffboarding(
    tenantId: string = DEFAULT_TENANT,
    student: StudentRecord,
    params: {
      reason: string;
      totalPaidIdr: number;
      deductionMcuIdr: number;
      deductionPassportIdr: number;
      deductionUniformIdr: number;
      deductionDormIdr: number;
    }
  ): Promise<{ offboarding: OffboardingRecord | null; error: string | null }> {
    const calc = calculateNetRefund(params);

    const { data, error } = await this.client
      .from("offboarding_requests")
      .insert({
        tenant_id: tenantId,
        student_id: student.id,
        reason: params.reason,
        total_paid_idr: params.totalPaidIdr,
        deduction_mcu_idr: params.deductionMcuIdr,
        deduction_passport_idr: params.deductionPassportIdr,
        deduction_uniform_idr: params.deductionUniformIdr,
        deduction_dorm_idr: params.deductionDormIdr,
        net_refund_idr: calc.netRefundIdr,
        approval_status: "MENUNGGU_DIREKTUR",
      })
      .select()
      .single();

    if (error || !data) {
      return { offboarding: null, error: error?.message || "Gagal mengajukan offboarding." };
    }

    // Update status siswa menjadi OFFBOARDED & kunci mensetsu
    await this.client
      .from("students")
      .update({
        student_status: "OFFBOARDED",
        locked_from_mensetsu: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", student.id);

    const record: OffboardingRecord = {
      id: data.id,
      studentId: student.id,
      studentName: student.fullName,
      studentNis: student.nis,
      reason: params.reason,
      totalPaidIdr: params.totalPaidIdr,
      deductionMcuIdr: params.deductionMcuIdr,
      deductionPassportIdr: params.deductionPassportIdr,
      deductionUniformIdr: params.deductionUniformIdr,
      deductionDormIdr: params.deductionDormIdr,
      netRefundIdr: calc.netRefundIdr,
      approvalStatus: data.approval_status,
      createdAt: data.created_at ? data.created_at.slice(0, 10) : "",
    };

    return { offboarding: record, error: null };
  }
}

export const tuSupabaseRepo = new TuSupabaseRepository();
