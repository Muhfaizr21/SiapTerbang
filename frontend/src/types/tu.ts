export type TuMenuTab =
  | "overview"
  | "ppdb"
  | "asrama"
  | "pemberkasan"
  | "surat"
  | "offboarding";

export type PPDBStatus = "MENUNGGU_SELEKSI" | "LULUS_SELEKSI" | "DITOLAK";

export type StudentLifecycleStatus =
  | "CALON_SISWA"
  | "AKTIF"
  | "SUSPENDED"
  | "OFFBOARDED"
  | "ALUMNI";

export type TargetProgramType =
  | "MAGANG_JEPANG"
  | "TOKUTEI_GINOU"
  | "KOREA_G2G";

export type ColorBlindType = "NORMAL" | "PARSIAL" | "TOTAL";

export type MandatoryDocType =
  | "KTP"
  | "KK"
  | "AKTA"
  | "IJAZAH"
  | "PASPOR"
  | "MCU"
  | "ID_CPMI";

export type DocVerificationStatus =
  | "BELUM_UNGGAH"
  | "MENUNGGU"
  | "VALID"
  | "DITOLAK";

export interface StudentDocItem {
  readonly id: string;
  readonly docType: MandatoryDocType;
  readonly label: string;
  readonly documentNumber: string;
  readonly status: DocVerificationStatus;
  readonly rejectionReason: string;
  readonly expiryDate: string; // YYYY-MM-DD or ""
  readonly verifiedBy: string;
  readonly updatedAt: string;
}

export interface StudentRecord {
  readonly id: string;
  readonly tenantId: string;
  readonly nis: string;
  readonly nik: string;
  readonly fullName: string;
  readonly gender: "LAKI_LAKI" | "PEREMPUAN";
  readonly birthPlace: string;
  readonly birthDate: string;
  readonly phoneStudent: string;
  readonly parentName: string;
  readonly phoneParent: string;
  readonly address: string;
  readonly educationLevel: string;
  readonly targetProgram: TargetProgramType;
  readonly batchName: string;
  readonly ppdbStatus: PPDBStatus;
  readonly heightCm: number;
  readonly weightKg: number;
  readonly bmiScore: number;
  readonly colorBlindStatus: ColorBlindType;
  readonly hasTattooOrPiercing: boolean;
  readonly mathScore: number;
  readonly dormitoryRoomId: string;
  readonly dormitoryRoomCode: string;
  readonly violationPoints: number;
  readonly studentStatus: StudentLifecycleStatus;
  readonly lockedFromMensetsu: boolean;
  readonly portalAccountActive: boolean;
  readonly initialInvoiceTriggered: boolean;
  readonly totalPaidIdr: number;
  readonly documents: readonly StudentDocItem[];
  readonly createdAt: string;
}

export interface DormitoryRoomRecord {
  readonly id: string;
  readonly roomCode: string;
  readonly buildingName: string;
  readonly genderZone: "PUTRA" | "PUTRI";
  readonly capacity: number;
  readonly occupiedCount: number;
}

export interface ViolationLogItem {
  readonly id: string;
  readonly studentId: string;
  readonly studentName: string;
  readonly studentNis: string;
  readonly violationTitle: string;
  readonly category: "RINGAN" | "SEDANG" | "BERAT";
  readonly pointsAdded: number;
  readonly recordedBy: string;
  readonly occurredAt: string;
}

export type OfficialLetterType =
  | "PENGANTAR_PASPOR"
  | "REKOMENDASI_DISNAKER"
  | "IZIN_ORANG_TUA_KONTRAK";

export interface OfficialLetterRecord {
  readonly id: string;
  readonly studentId: string;
  readonly studentName: string;
  readonly studentNis: string;
  readonly studentNik: string;
  readonly letterNumber: string;
  readonly letterType: OfficialLetterType;
  readonly destinationAgency: string;
  readonly signerName: string;
  readonly signerRole: string;
  readonly issuedDate: string;
}

export interface OffboardingRecord {
  readonly id: string;
  readonly studentId: string;
  readonly studentName: string;
  readonly studentNis: string;
  readonly reason: string;
  readonly totalPaidIdr: number;
  readonly deductionMcuIdr: number;
  readonly deductionPassportIdr: number;
  readonly deductionUniformIdr: number;
  readonly deductionDormIdr: number;
  readonly netRefundIdr: number;
  readonly approvalStatus:
    | "MENUNGGU_DIREKTUR"
    | "DISETUJUI_DIREKTUR"
    | "DICAIRKAN_KEUANGAN";
  readonly createdAt: string;
}

export interface MonthlyIntakeStat {
  readonly monthLabel: string;
  readonly ppdbGraduated: number;
  readonly docsVerified: number;
}

export interface ScheduleTaskItem {
  readonly id: string;
  readonly dateLabel: string;
  readonly timeLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly completed: boolean;
  readonly targetTab: TuMenuTab;
}

export interface NewApplicantFormInput {
  readonly nik: string;
  readonly fullName: string;
  readonly gender: "LAKI_LAKI" | "PEREMPUAN";
  readonly birthPlace: string;
  readonly birthDate: string;
  readonly phoneStudent: string;
  readonly parentName: string;
  readonly phoneParent: string;
  readonly address: string;
  readonly educationLevel: string;
  readonly targetProgram: TargetProgramType;
  readonly batchName: string;
  readonly heightCm: number;
  readonly weightKg: number;
}

export interface PhysicalSelectionFormInput {
  readonly heightCm: number;
  readonly weightKg: number;
  readonly colorBlindStatus: ColorBlindType;
  readonly hasTattooOrPiercing: boolean;
  readonly mathScore: number;
  readonly approveGraduation: boolean;
}
