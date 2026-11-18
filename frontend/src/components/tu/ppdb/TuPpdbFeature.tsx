"use client";

import { useState } from "react";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type {
  ColorBlindType,
  NewApplicantFormInput,
  PhysicalSelectionFormInput,
  StudentRecord,
  TargetProgramType,
} from "@/types/tu";
import {
  calculateBMI,
  getBMICategoryLabel,
} from "@/services/tu-domain-engine";

interface TuPpdbFeatureProps {
  readonly students: readonly StudentRecord[];
  readonly onAddApplicant: (input: NewApplicantFormInput) => string | null;
  readonly onEvaluateAndActivate: (
    studentId: string,
    input: PhysicalSelectionFormInput
  ) => void;
}

export function TuPpdbFeature({
  students,
  onAddApplicant,
  onEvaluateAndActivate,
}: TuPpdbFeatureProps) {
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "MENUNGGU_SELEKSI" | "LULUS_SELEKSI"
  >("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [activationBanner, setActivationBanner] = useState<string | null>(null);

  const [newApplicant, setNewApplicant] = useState<NewApplicantFormInput>({
    nik: "",
    fullName: "",
    gender: "LAKI_LAKI",
    birthPlace: "",
    birthDate: "2004-05-10",
    phoneStudent: "",
    parentName: "",
    phoneParent: "",
    address: "",
    educationLevel: "SMK Teknik",
    targetProgram: "MAGANG_JEPANG",
    batchName: "Angkatan 19 - Gelombang 1",
    heightCm: 168,
    weightKg: 60,
  });

  // Physical Test Modal State
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(
    null
  );
  const [physForm, setPhysForm] = useState<PhysicalSelectionFormInput>({
    heightCm: 168,
    weightKg: 60,
    colorBlindStatus: "NORMAL",
    hasTattooOrPiercing: false,
    mathScore: 85,
    approveGraduation: true,
  });

  const filteredStudents = students.filter((st) => {
    if (filterStatus === "ALL") return true;
    return st.ppdbStatus === filterStatus;
  });

  const handleOpenPhysicalModal = (st: StudentRecord) => {
    setSelectedStudent(st);
    setPhysForm({
      heightCm: st.heightCm,
      weightKg: st.weightKg,
      colorBlindStatus: st.colorBlindStatus,
      hasTattooOrPiercing: st.hasTattooOrPiercing,
      mathScore: st.mathScore,
      approveGraduation: true,
    });
  };

  const handleSubmitNewApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!/^\d{16}$/.test(newApplicant.nik.trim())) {
      setFormError("NIK wajib terdiri dari tepat 16 digit angka.");
      return;
    }
    if (!newApplicant.fullName.trim()) {
      setFormError("Nama lengkap calon siswa wajib diisi.");
      return;
    }

    const err = onAddApplicant(newApplicant);
    if (err) {
      setFormError(err);
      return;
    }

    setShowAddModal(false);
    setActivationBanner(
      `Pendaftar PPDB "${newApplicant.fullName}" berhasil ditambahkan beserta 7 checklist dokumen awal.`
    );
    setNewApplicant({
      nik: "",
      fullName: "",
      gender: "LAKI_LAKI",
      birthPlace: "",
      birthDate: "2004-05-10",
      phoneStudent: "",
      parentName: "",
      phoneParent: "",
      address: "",
      educationLevel: "SMK Teknik",
      targetProgram: "MAGANG_JEPANG",
      batchName: "Angkatan 19 - Gelombang 1",
      heightCm: 168,
      weightKg: 60,
    });
  };

  const handleSavePhysicalTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    onEvaluateAndActivate(selectedStudent.id, physForm);
    setActivationBanner(
      physForm.approveGraduation
        ? `Cross-Role Lock #1 Aktif: "${selectedStudent.fullName}" dinyatakan LULUS SELEKSI. NIS resmi diterbitkan, Akun Portal Siswa aktif, dan Tagihan Pendaftaran otomatis dikirim ke modul Keuangan.`
        : `Hasil tes fisik "${selectedStudent.fullName}" berhasil diperbarui.`
    );
    setSelectedStudent(null);
  };

  const liveModalBmi = calculateBMI(physForm.heightCm, physForm.weightKg);
  const liveBmiMeta = getBMICategoryLabel(liveModalBmi);

  return (
    <div className="space-y-5">
      {/* Top Action & Filter Bar */}
      <div className={styles.surfaceCard}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[19px] font-bold text-[#141518]">
              PPDB, Seleksi Fisik & Aktivasi Kelulusan Siswa
            </h2>
            <p className="mt-1 text-[13px] text-[#72767f]">
              Verifikasi formulir pendaftaran online, kalkulasi BMI fisik, dan aktivasi otomatis Nomor Induk Siswa (NIS).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex rounded-full bg-[#f4f5f8] p-1">
              {(
                [
                  { id: "ALL", label: "Semua" },
                  { id: "MENUNGGU_SELEKSI", label: "Antrean PPDB" },
                  { id: "LULUS_SELEKSI", label: "Lulus & Ber-NIS" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterStatus(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                    filterStatus === tab.id
                      ? "bg-[#141518] text-[#ffffff]"
                      : "text-[#686c75] hover:text-[#141518]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setFormError(null);
                setShowAddModal(true);
              }}
              className="rounded-full bg-[#ffe11d] px-4 py-2 text-[13px] font-bold text-[#111215] shadow-sm transition-transform hover:scale-[1.02]"
            >
              + Tambah Pendaftar PPDB
            </button>
          </div>
        </div>

        {activationBanner && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#23a041]/30 bg-[#eaf9ee] px-4 py-3 text-[13px] font-medium text-[#156829]">
            <span>{activationBanner}</span>
            <button
              type="button"
              onClick={() => setActivationBanner(null)}
              className="text-[12px] font-bold underline"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      {/* Table / List of PPDB & Active Students */}
      <div className={styles.surfaceCard}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eceef2] text-[11.5px] font-bold uppercase tracking-wider text-[#7c8089]">
                <th className="pb-3 pr-4">Kandidat & NIK</th>
                <th className="pb-3 pr-4">Program & Angkatan</th>
                <th className="pb-3 pr-4">Tes Fisik & BMI</th>
                <th className="pb-3 pr-4">Buta Warna / Tato / Mat</th>
                <th className="pb-3 pr-4">Status & Cross-Role Lock</th>
                <th className="pb-3 text-right">Aksi Seleksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f2f5] text-[13px]">
              {filteredStudents.map((st) => {
                const bmiInfo = getBMICategoryLabel(st.bmiScore);
                return (
                  <tr key={st.id} className="hover:bg-[#fafbfc]">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-[#141518]">
                        {st.fullName}
                      </div>
                      <div className="font-mono text-[11.5px] text-[#7c8089]">
                        NIK: {st.nik}
                      </div>
                      <div className="mt-0.5 text-[11.5px] font-semibold text-[#141518]">
                        {st.nis ? (
                          <span className="rounded bg-[#ffe11d]/40 px-1.5 py-0.5 font-mono">
                            NIS: {st.nis}
                          </span>
                        ) : (
                          <span className="text-[#b85d00]">
                            Belum Terbit NIS
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 pr-4">
                      <span className="inline-block rounded-md bg-[#f4f5f8] px-2 py-0.5 text-[11.5px] font-bold text-[#23252b]">
                        {st.targetProgram.replace("_", " ")}
                      </span>
                      <div className="mt-1 text-[12px] text-[#72767f]">
                        {st.batchName}
                      </div>
                      <div className="text-[11.5px] text-[#8a8f99]">
                        {st.educationLevel}
                      </div>
                    </td>

                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-[#141518]">
                        {st.heightCm} cm / {st.weightKg} kg
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="font-mono text-[12px] font-bold text-[#141518]">
                          BMI {st.bmiScore}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10.5px] font-bold ${
                            bmiInfo.tone === "ideal"
                              ? "bg-[#e8f8ec] text-[#188633]"
                              : "bg-[#fff4e5] text-[#b85d00]"
                          }`}
                        >
                          {bmiInfo.label}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 pr-4">
                      <div className="flex flex-wrap gap-1.5 text-[11.5px]">
                        <span
                          className={`rounded px-2 py-0.5 font-semibold ${
                            st.colorBlindStatus === "NORMAL"
                              ? "bg-[#e8f8ec] text-[#188633]"
                              : "bg-[#fdeceb] text-[#c93b2b]"
                          }`}
                        >
                          Mata: {st.colorBlindStatus}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 font-semibold ${
                            !st.hasTattooOrPiercing
                              ? "bg-[#e8f8ec] text-[#188633]"
                              : "bg-[#fdeceb] text-[#c93b2b]"
                          }`}
                        >
                          {st.hasTattooOrPiercing
                            ? "Ada Tato/Tindik"
                            : "Bebas Tato"}
                        </span>
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-[#363942]">
                        Skor Matematika: <strong>{st.mathScore}/100</strong>
                      </div>
                    </td>

                    <td className="py-3.5 pr-4">
                      {st.ppdbStatus === "LULUS_SELEKSI" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8ec] px-2.5 py-0.5 text-[11.5px] font-bold text-[#188633]">
                            ✓ Lulus Seleksi
                          </span>
                          <div className="text-[11px] text-[#72767f]">
                            Portal Siswa: Aktif | Invoice: Terbit
                          </div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4e5] px-2.5 py-0.5 text-[11.5px] font-bold text-[#b85d00]">
                          ● Menunggu Seleksi TU
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenPhysicalModal(st)}
                        className={`rounded-xl px-3.5 py-2 text-[12px] font-bold transition-colors ${
                          st.ppdbStatus === "MENUNGGU_SELEKSI"
                            ? "bg-[#ffe11d] text-[#111215] hover:bg-[#f5d200]"
                            : "border border-[#eceef2] bg-[#ffffff] text-[#141518] hover:bg-[#f4f5f8]"
                        }`}
                      >
                        {st.ppdbStatus === "MENUNGGU_SELEKSI"
                          ? "Input Fisik & Luluskan"
                          : "Edit Nilai Fisik"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Add New PPDB Applicant */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111215]/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[24px] bg-[#ffffff] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eceef2] pb-3">
              <h3 className="text-[18px] font-bold text-[#141518]">
                Formulir Pendaftaran Siswa Baru (PPDB)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg px-2 py-1 text-[13px] font-bold text-[#72767f] hover:bg-[#f4f5f8]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewApplicant} className="mt-4 space-y-3.5">
              {formError && (
                <div className="rounded-xl bg-[#fdeceb] px-3.5 py-2.5 text-[12.5px] font-semibold text-[#c93b2b]">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    NIK KTP (Wajib 16 Digit)
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    required
                    value={newApplicant.nik}
                    onChange={(e) =>
                      setNewApplicant((p) => ({ ...p, nik: e.target.value }))
                    }
                    placeholder="3204011805040001"
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Nama Lengkap Sesuai KTP
                  </label>
                  <input
                    type="text"
                    required
                    value={newApplicant.fullName}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        fullName: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Dimas Anggara"
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Jenis Kelamin
                  </label>
                  <select
                    value={newApplicant.gender}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        gender: e.target.value as "LAKI_LAKI" | "PEREMPUAN",
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  >
                    <option value="LAKI_LAKI">Laki-Laki</option>
                    <option value="PEREMPUAN">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    required
                    value={newApplicant.birthPlace}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        birthPlace: e.target.value,
                      }))
                    }
                    placeholder="Bandung"
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    required
                    value={newApplicant.birthDate}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        birthDate: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Program Negara Tujuan
                  </label>
                  <select
                    value={newApplicant.targetProgram}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        targetProgram: e.target.value as TargetProgramType,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  >
                    <option value="MAGANG_JEPANG">Magang Jepang (Ginou Jisshusei)</option>
                    <option value="TOKUTEI_GINOU">Tokutei Ginou (SSW Jepang)</option>
                    <option value="KOREA_G2G">Korea Selatan (G-to-G EPS)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Pendidikan Terakhir
                  </label>
                  <input
                    type="text"
                    required
                    value={newApplicant.educationLevel}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        educationLevel: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Nama Orang Tua / Wali
                  </label>
                  <input
                    type="text"
                    required
                    value={newApplicant.parentName}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        parentName: e.target.value,
                      }))
                    }
                    placeholder="Nama Ayah/Ibu"
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    No. WhatsApp Siswa
                  </label>
                  <input
                    type="text"
                    required
                    value={newApplicant.phoneStudent}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        phoneStudent: e.target.value,
                      }))
                    }
                    placeholder="0812xxxxxxxx"
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    No. WhatsApp Wali
                  </label>
                  <input
                    type="text"
                    required
                    value={newApplicant.phoneParent}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        phoneParent: e.target.value,
                      }))
                    }
                    placeholder="0813xxxxxxxx"
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Tinggi Badan Awal (cm)
                  </label>
                  <input
                    type="number"
                    min={130}
                    max={210}
                    value={newApplicant.heightCm}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        heightCm: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Berat Badan Awal (kg)
                  </label>
                  <input
                    type="number"
                    min={35}
                    max={140}
                    value={newApplicant.weightKg}
                    onChange={(e) =>
                      setNewApplicant((p) => ({
                        ...p,
                        weightKg: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Alamat Domisili Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={newApplicant.address}
                  onChange={(e) =>
                    setNewApplicant((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="Jalan, Kecamatan, Kabupaten/Kota, Provinsi"
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-[#eceef2] px-4 py-2 text-[13px] font-semibold text-[#5a5e67]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#141518] px-5 py-2 text-[13px] font-bold text-[#ffffff] hover:bg-[#000000]"
                >
                  Simpan Pendaftar PPDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Physical Selection & Graduation Activation */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111215]/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-[24px] bg-[#ffffff] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eceef2] pb-3">
              <div>
                <h3 className="text-[18px] font-bold text-[#141518]">
                  Seleksi Fisik & Aktivasi Kelulusan
                </h3>
                <p className="text-[12px] text-[#72767f]">
                  Kandidat: <strong>{selectedStudent.fullName}</strong> (NIK:{" "}
                  {selectedStudent.nik})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg px-2 py-1 text-[13px] font-bold text-[#72767f]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePhysicalTest} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Tinggi Badan (cm)
                  </label>
                  <input
                    type="number"
                    value={physForm.heightCm}
                    onChange={(e) =>
                      setPhysForm((p) => ({
                        ...p,
                        heightCm: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Berat Badan (kg)
                  </label>
                  <input
                    type="number"
                    value={physForm.weightKg}
                    onChange={(e) =>
                      setPhysForm((p) => ({
                        ...p,
                        weightKg: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              {/* Real-time BMI Preview Box */}
              <div className="flex items-center justify-between rounded-xl bg-[#f4f5f8] px-4 py-3">
                <div>
                  <div className="text-[11.5px] font-semibold text-[#72767f]">
                    Indeks Massa Tubuh (BMI Otomatis)
                  </div>
                  <div className="text-[18px] font-extrabold text-[#141518]">
                    {liveModalBmi} kg/m²
                  </div>
                </div>
                <span
                  className={`rounded-lg px-3 py-1 text-[12px] font-bold ${
                    liveBmiMeta.tone === "ideal"
                      ? "bg-[#e8f8ec] text-[#188633]"
                      : "bg-[#fff4e5] text-[#b85d00]"
                  }`}
                >
                  {liveBmiMeta.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Tes Buta Warna (Ishihara)
                  </label>
                  <select
                    value={physForm.colorBlindStatus}
                    onChange={(e) =>
                      setPhysForm((p) => ({
                        ...p,
                        colorBlindStatus: e.target.value as ColorBlindType,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  >
                    <option value="NORMAL">Normal (Lolos)</option>
                    <option value="PARSIAL">Buta Warna Parsial</option>
                    <option value="TOTAL">Buta Warna Total</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Nilai Tes Matematika (0-100)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={physForm.mathScore}
                    onChange={(e) =>
                      setPhysForm((p) => ({
                        ...p,
                        mathScore: Number(e.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 rounded-xl border border-[#eceef2] p-3 text-[13px] font-medium text-[#23252b]">
                <input
                  type="checkbox"
                  checked={physForm.hasTattooOrPiercing}
                  onChange={(e) =>
                    setPhysForm((p) => ({
                      ...p,
                      hasTattooOrPiercing: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#141518]"
                />
                <span>Terdapat bekas Tato atau Tindik pada tubuh kandidat</span>
              </label>

              <label className="flex items-start gap-2.5 rounded-xl border border-[#ffe11d] bg-[#fffbeb] p-3.5 text-[13px]">
                <input
                  type="checkbox"
                  checked={physForm.approveGraduation}
                  onChange={(e) =>
                    setPhysForm((p) => ({
                      ...p,
                      approveGraduation: e.target.checked,
                    }))
                  }
                  className="mt-0.5 h-4 w-4 accent-[#141518]"
                />
                <div>
                  <div className="font-bold text-[#141518]">
                    Nyatakan LULUS SELEKSI & Aktifkan Siswa Resmi
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-[#6b707b]">
                    Otomatis menerbitkan Nomor Induk Siswa (NIS), mengaktifkan
                    akun Portal Siswa, dan memicu tagihan awal di Keuangan.
                  </div>
                </div>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-xl border border-[#eceef2] px-4 py-2 text-[13px] font-semibold text-[#5a5e67]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#ffe11d] px-5 py-2 text-[13px] font-bold text-[#111215] hover:bg-[#f5d200]"
                >
                  Simpan & Eksekusi Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
