"use client";

import { useState } from "react";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type {
  DocVerificationStatus,
  MandatoryDocType,
  StudentDocItem,
  StudentRecord,
} from "@/types/tu";
import { evaluateExpiryStatus } from "@/services/tu-domain-engine";

interface TuPemberkasanFeatureProps {
  readonly students: readonly StudentRecord[];
  readonly onUpdateDocument: (params: {
    readonly studentId: string;
    readonly docType: MandatoryDocType;
    readonly documentNumber: string;
    readonly status: DocVerificationStatus;
    readonly rejectionReason: string;
    readonly expiryDate: string;
  }) => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "ST";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function TuPemberkasanFeature({
  students,
  onUpdateDocument,
}: TuPemberkasanFeatureProps) {
  const [filterMode, setFilterMode] = useState<
    "ALL" | "PENDING" | "EXPIRING_H30" | "REJECTED"
  >("ALL");

  const [editingContext, setEditingContext] = useState<{
    readonly student: StudentRecord;
    readonly doc: StudentDocItem;
  } | null>(null);

  const [docNumber, setDocNumber] = useState("");
  const [docStatus, setDocStatus] = useState<DocVerificationStatus>("VALID");
  const [rejectionReason, setRejectionReason] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Collect all H-30 expiring documents across all students
  const expiringAlerts: {
    readonly student: StudentRecord;
    readonly doc: StudentDocItem;
    readonly badgeText: string;
  }[] = [];

  for (const st of students) {
    for (const d of st.documents) {
      const exp = evaluateExpiryStatus(d.expiryDate);
      if (exp.isExpiringH30) {
        expiringAlerts.push({
          student: st,
          doc: d,
          badgeText: exp.badgeText,
        });
      }
    }
  }

  const pendingCount = students.filter((st) =>
    st.documents.some((d) => d.status === "MENUNGGU")
  ).length;

  const expiringStudentCount = students.filter((st) =>
    st.documents.some((d) => evaluateExpiryStatus(d.expiryDate).isExpiringH30)
  ).length;

  const rejectedCount = students.filter((st) =>
    st.documents.some((d) => d.status === "DITOLAK")
  ).length;

  const filteredStudents = students.filter((st) => {
    if (filterMode === "PENDING") {
      return st.documents.some((d) => d.status === "MENUNGGU");
    }
    if (filterMode === "EXPIRING_H30") {
      return st.documents.some(
        (d) => evaluateExpiryStatus(d.expiryDate).isExpiringH30
      );
    }
    if (filterMode === "REJECTED") {
      return st.documents.some((d) => d.status === "DITOLAK");
    }
    return true;
  });

  const openVerifyModal = (student: StudentRecord, doc: StudentDocItem) => {
    setEditingContext({ student, doc });
    setDocNumber(doc.documentNumber);
    setDocStatus(doc.status === "BELUM_UNGGAH" ? "VALID" : doc.status);
    setRejectionReason(doc.rejectionReason);
    setExpiryDate(doc.expiryDate);
    setModalError(null);
  };

  const handleSaveDocVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContext) return;

    if (docStatus === "DITOLAK" && !rejectionReason.trim()) {
      setModalError(
        "Catatan alasan penolakan wajib diisi agar siswa mengetahui bagian yang harus direvisi di Portal Siswa."
      );
      return;
    }

    onUpdateDocument({
      studentId: editingContext.student.id,
      docType: editingContext.doc.docType,
      documentNumber: docNumber.trim(),
      status: docStatus,
      rejectionReason: docStatus === "DITOLAK" ? rejectionReason.trim() : "",
      expiryDate: expiryDate.trim(),
    });

    setToastMsg(
      `Berkas ${editingContext.doc.label} milik "${editingContext.student.fullName}" berhasil diperbarui menjadi ${docStatus}.`
    );
    setEditingContext(null);
  };

  return (
    <div className="space-y-5">
      {/* H-30 Expiry Tracker Banner */}
      {expiringAlerts.length > 0 && (
        <div className="rounded-2xl border border-[#FECDCA] bg-gradient-to-r from-[#FEF3F2] via-[#FFF6F5] to-[#FFFFFF] p-5 shadow-[0_4px_20px_rgba(217,45,32,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D92D20] text-[#FFFFFF] shadow-[0_4px_12px_rgba(217,45,32,0.3)]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[14.5px] font-extrabold text-[#912018]">
                    Peringatan Dini Expiry Tracker (Kurang dari 30 Hari)
                  </h3>
                  <span className="rounded-full bg-[#D92D20] px-2 py-0.5 font-mono text-[10.5px] font-extrabold text-white">
                    {expiringAlerts.length} Alert Aktif
                  </span>
                </div>
                <p className="mt-0.5 text-[12.5px] font-medium text-[#B42318]">
                  Terdapat {expiringAlerts.length} dokumen Paspor/MCU yang segera habis masa berlakunya. Klik kartu di bawah untuk memperbarui tanggal masa berlaku sebelum pengajuan CoE/Visa.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expiringAlerts.map((item) => (
              <button
                key={item.doc.id}
                type="button"
                onClick={() => openVerifyModal(item.student, item.doc)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#FDA29B] bg-[#FFFFFF] px-4 py-3 text-left shadow-[0_2px_6px_rgba(16,24,40,0.04)] transition-all hover:border-[#D92D20] hover:shadow-[0_6px_16px_rgba(217,45,32,0.1)] cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-extrabold text-[#111317] group-hover:text-[#D92D20]">
                    {item.student.fullName}
                  </div>
                  <div className="mt-0.5 truncate text-[11.5px] font-medium text-[#666C78]">
                    {item.doc.label} • <span className="font-mono">Exp: {item.doc.expiryDate}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-lg bg-[#D92D20] px-2.5 py-1 font-mono text-[10.5px] font-extrabold text-[#FFFFFF] shadow-2xs">
                  {item.badgeText}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter & Header Card */}
      <div className={styles.surfaceCard}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-extrabold tracking-tight text-[#111317]">
              Manajemen Pemberkasan (7 Dokumen Legalitas) & Expiry Tracker
            </h2>
            <p className="mt-0.5 text-[13px] text-[#666C78]">
              Klik pada kartu dokumen siswa untuk memvalidasi, menolak beserta catatan revisi, atau mengatur masa berlaku Paspor/MCU.
            </p>
          </div>

          <div className={styles.segmentedTrack}>
            {(
              [
                { id: "ALL", label: "Semua Siswa", count: students.length },
                { id: "PENDING", label: "Menunggu Cek", count: pendingCount },
                { id: "EXPIRING_H30", label: "Peringatan H-30", count: expiringStudentCount },
                { id: "REJECTED", label: "Ditolak / Revisi", count: rejectedCount },
              ] as const
            ).map((f) => {
              const isActive = filterMode === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterMode(f.id)}
                  className={isActive ? styles.segmentedTabActive : styles.segmentedTab}
                >
                  <span>{f.label}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.2 font-mono text-[10.5px] font-extrabold ${
                      isActive
                        ? "bg-[#FFE11D] text-[#111215]"
                        : "bg-[#E2E5ED] text-[#475467]"
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {toastMsg && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#ABEFC6] bg-[#ECFDF3] px-4 py-2.5 text-[12.5px] font-bold text-[#067647]">
            <span>{toastMsg}</span>
            <button
              type="button"
              onClick={() => setToastMsg(null)}
              className="rounded-md px-2 py-0.5 text-[11.5px] font-extrabold hover:bg-[#D1FADF] cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      {/* 7-Document Verification Matrix per Student */}
      <div className="space-y-4">
        {filteredStudents.map((st) => {
          const validCount = st.documents.filter(
            (d) => d.status === "VALID"
          ).length;
          const hasStudentH30 = st.documents.some(
            (d) => evaluateExpiryStatus(d.expiryDate).isExpiringH30
          );

          return (
            <div key={st.id} className={styles.surfaceCard}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEEF2] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#141518] font-mono text-[13px] font-extrabold text-[#FFE11D]">
                    {getInitials(st.fullName)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15.5px] font-extrabold text-[#111317]">
                        {st.fullName}
                      </span>
                      <span className="rounded-md bg-[#F2F4F7] border border-[#E4E7EC] px-2 py-0.5 font-mono text-[11px] font-bold text-[#344054]">
                        {st.nis || "CALON SISWA"}
                      </span>
                      <span className="rounded-md bg-[#FFE11D]/35 border border-[#E5C700]/40 px-2 py-0.5 text-[10.5px] font-extrabold text-[#111215]">
                        {st.targetProgram.replace("_", " ")}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] font-medium text-[#666C78]">
                      NIK: <span className="font-mono">{st.nik}</span> • Angkatan: {st.batchName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {hasStudentH30 && (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-[#FDA29B] bg-[#FEF3F2] px-2.5 py-1 text-[11.5px] font-extrabold text-[#B42318]">
                      ● Alert Expiry H-30
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[12px] font-extrabold ${
                      validCount === 7
                        ? "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
                        : "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]"
                    }`}
                  >
                    <span>{validCount}/7 Berkas Valid</span>
                  </span>
                </div>
              </div>

              {/* 7 Document Cards Grid */}
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
                {st.documents.map((doc) => {
                  const exp = evaluateExpiryStatus(doc.expiryDate);

                  // Card visual state prioritizing H-30 Expiry Alert even if status is VALID
                  let cardTheme =
                    "border-[#E4E7EC] bg-[#F9FAFB] hover:border-[#98A2B3]";
                  let statusBadgeTheme =
                    "bg-[#E4E7EC] text-[#475467]";

                  if (exp.isExpiringH30) {
                    cardTheme =
                      "border-[#FDA29B] bg-[#FEF3F2]/75 hover:border-[#D92D20] hover:bg-[#FEF3F2] shadow-[0_2px_8px_rgba(217,45,32,0.06)]";
                    statusBadgeTheme =
                      "bg-[#FEE4E2] text-[#B42318] border border-[#FDA29B]";
                  } else if (doc.status === "VALID") {
                    cardTheme =
                      "border-[#ABEFC6] bg-[#ECFDF3]/55 hover:border-[#17B26A] hover:bg-[#ECFDF3]";
                    statusBadgeTheme =
                      "bg-[#D1FADF] text-[#067647]";
                  } else if (doc.status === "MENUNGGU") {
                    cardTheme =
                      "border-[#FEDF89] bg-[#FFFAEB]/80 hover:border-[#F79009] hover:bg-[#FFFAEB]";
                    statusBadgeTheme =
                      "bg-[#FEF0C7] text-[#B54708]";
                  } else if (doc.status === "DITOLAK") {
                    cardTheme =
                      "border-[#FDA29B] bg-[#FEF3F2] hover:border-[#D92D20]";
                    statusBadgeTheme =
                      "bg-[#D92D20] text-[#FFFFFF]";
                  }

                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => openVerifyModal(st, doc)}
                      className={`group flex flex-col justify-between rounded-xl border p-3 text-left transition-all duration-150 hover:-translate-y-0.5 cursor-pointer ${cardTheme}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-[#344054]">
                            {doc.docType}
                          </span>
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase ${statusBadgeTheme}`}
                          >
                            {doc.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="mt-1.5 text-[12.5px] font-extrabold leading-snug text-[#111317]">
                          {doc.label}
                        </div>
                        <div className="mt-1 truncate rounded bg-black/[0.04] px-1.5 py-0.5 font-mono text-[10.5px] font-semibold text-[#475467]">
                          {doc.documentNumber || "Belum ada nomor"}
                        </div>
                      </div>

                      <div className="mt-3 border-t border-black/[0.07] pt-2">
                        {exp.hasExpiry ? (
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] font-extrabold ${
                                exp.isExpiringH30
                                  ? "bg-[#D92D20] text-[#FFFFFF] shadow-2xs"
                                  : "bg-[#141518]/10 text-[#141518]"
                              }`}
                            >
                              {exp.badgeText}
                            </span>
                            <span className="text-[11px] font-bold text-[#344054] opacity-0 transition-opacity group-hover:opacity-100">
                              Edit →
                            </span>
                          </div>
                        ) : doc.status === "DITOLAK" ? (
                          <span className="line-clamp-1 text-[10.5px] font-bold text-[#B42318]">
                            Revisi: {doc.rejectionReason}
                          </span>
                        ) : (
                          <div className="flex items-center justify-between text-[11px] font-bold text-[#344054] group-hover:text-[#111317]">
                            <span>Verifikasi Berkas</span>
                            <span className="transition-transform group-hover:translate-x-0.5">
                              →
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Verification Modal */}
      {editingContext && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0F12]/65 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E4E7EC] bg-[#FFFFFF] p-6 shadow-[0_24px_48px_rgba(16,24,40,0.24)]">
            <div className="flex items-center justify-between border-b border-[#ECEEF2] pb-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#141518] px-2 py-0.5 font-mono text-[10px] font-bold text-[#FFE11D]">
                    {editingContext.doc.docType}
                  </span>
                  <h3 className="text-[16.5px] font-extrabold text-[#111317]">
                    {editingContext.doc.label}
                  </h3>
                </div>
                <p className="mt-0.5 text-[12px] text-[#666C78]">
                  Kandidat: <strong className="text-[#111317]">{editingContext.student.fullName}</strong> ({editingContext.student.nis || "PPDB"})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingContext(null)}
                className={styles.btnGhostSubtle}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSaveDocVerification}
              className="mt-4 space-y-4"
            >
              {modalError && (
                <div className="rounded-xl border border-[#FDA29B] bg-[#FEF3F2] p-3 text-[12px] font-bold text-[#B42318]">
                  {modalError}
                </div>
              )}

              <div>
                <label className={styles.formLabel}>
                  Nomor Dokumen Resmi
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="Contoh: C8941205 / 320401..."
                  className={`${styles.formInput} font-mono`}
                />
              </div>

              <div>
                <label className={styles.formLabel}>
                  Status Keputusan Verifikasi TU
                </label>
                <select
                  value={docStatus}
                  onChange={(e) =>
                    setDocStatus(e.target.value as DocVerificationStatus)
                  }
                  className={styles.formSelect}
                >
                  <option value="VALID">VALID (Dokumen Sah & Sesuai)</option>
                  <option value="MENUNGGU">MENUNGGU (Antrean Cek)</option>
                  <option value="DITOLAK">
                    DITOLAK (Minta Siswa Unggah Ulang)
                  </option>
                  <option value="BELUM_UNGGAH">BELUM UNGGAH</option>
                </select>
              </div>

              {(editingContext.doc.docType === "PASPOR" ||
                editingContext.doc.docType === "MCU") && (
                <div>
                  <label className={styles.formLabel}>
                    Tanggal Habis Masa Berlaku (Expiry Tracker H-30)
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className={styles.formInput}
                  />
                  <p className="mt-1.5 text-[11px] font-medium text-[#666C78]">
                    Jika sisa waktu ≤ 30 hari dari tanggal berjalan, sistem otomatis mengaktifkan peringatan H-30.
                  </p>
                </div>
              )}

              {docStatus === "DITOLAK" && (
                <div>
                  <label className="block text-[12px] font-bold text-[#B42318] mb-1.5">
                    Catatan Alasan Penolakan (Wajib Diisi)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Jelaskan alasan penolakan agar siswa dapat memperbaiki unggahan..."
                    className="w-full rounded-xl border border-[#FDA29B] bg-[#FEF3F2]/40 px-3.5 py-2.5 text-[13px] focus:border-[#D92D20] focus:outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#ECEEF2]">
                <button
                  type="button"
                  onClick={() => setEditingContext(null)}
                  className={styles.btnSecondaryOutline}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={styles.btnPrimaryYellow}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Simpan Verifikasi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
