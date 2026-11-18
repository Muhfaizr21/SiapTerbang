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
    readonly studentName: string;
    readonly studentNis: string;
    readonly doc: StudentDocItem;
    readonly badgeText: string;
  }[] = [];

  for (const st of students) {
    for (const d of st.documents) {
      const exp = evaluateExpiryStatus(d.expiryDate);
      if (exp.isExpiringH30) {
        expiringAlerts.push({
          studentName: st.fullName,
          studentNis: st.nis,
          doc: d,
          badgeText: exp.badgeText,
        });
      }
    }
  }

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
        <div className="rounded-[22px] border border-[#c93b2b]/25 bg-[#fdeceb] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c93b2b] text-[13px] font-extrabold text-[#ffffff]">
                !
              </span>
              <div>
                <h3 className="text-[14px] font-extrabold text-[#9e2316]">
                  Peringatan Dini Expiry Tracker (Kurang dari 30 Hari)
                </h3>
                <p className="text-[12px] text-[#b43224]">
                  Terdapat {expiringAlerts.length} dokumen Paspor/MCU yang akan
                  habis masa berlakunya. Segera jadwalkan perpanjangan sebelum
                  CoE/Visa diajukan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {expiringAlerts.map((item) => (
              <div
                key={item.doc.id}
                className="flex items-center justify-between rounded-xl bg-[#ffffff] px-3.5 py-2.5 shadow-2xs"
              >
                <div>
                  <div className="text-[12.5px] font-bold text-[#141518]">
                    {item.studentName}
                  </div>
                  <div className="text-[11px] text-[#72767f]">
                    {item.doc.label} • Exp: {item.doc.expiryDate}
                  </div>
                </div>
                <span className="rounded-full bg-[#c93b2b] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#ffffff]">
                  {item.badgeText}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter & Header Card */}
      <div className={styles.surfaceCard}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[19px] font-bold text-[#141518]">
              Manajemen Pemberkasan (7 Dokumen Legalitas) & Expiry Tracker
            </h2>
            <p className="mt-0.5 text-[13px] text-[#72767f]">
              Klik pada badge dokumen siswa untuk memvalidasi, menolak beserta catatan revisi, atau mengatur masa berlaku Paspor/MCU.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-full bg-[#f4f5f8] p-1">
            {(
              [
                { id: "ALL", label: "Semua Siswa" },
                { id: "PENDING", label: "Menunggu Verifikasi" },
                { id: "EXPIRING_H30", label: "Peringatan H-30" },
                { id: "REJECTED", label: "Ditolak / Revisi" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterMode(f.id)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${
                  filterMode === f.id
                    ? "bg-[#141518] text-[#ffffff]"
                    : "text-[#686c75] hover:text-[#141518]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {toastMsg && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#23a041]/30 bg-[#eaf9ee] px-4 py-2.5 text-[12.5px] font-semibold text-[#156829]">
            <span>{toastMsg}</span>
            <button
              type="button"
              onClick={() => setToastMsg(null)}
              className="font-bold underline"
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

          return (
            <div key={st.id} className={styles.surfaceCard}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f2f5] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-extrabold text-[#141518]">
                      {st.fullName}
                    </span>
                    <span className="rounded bg-[#f4f5f8] px-2 py-0.5 font-mono text-[11.5px] font-bold text-[#363942]">
                      {st.nis || "PPDB"}
                    </span>
                    <span className="rounded bg-[#ffe11d]/40 px-2 py-0.5 text-[11px] font-bold text-[#141518]">
                      {st.targetProgram.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-[#72767f]">
                    NIK: {st.nik} • Angkatan: {st.batchName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-extrabold ${
                      validCount === 7
                        ? "bg-[#e8f8ec] text-[#188633]"
                        : "bg-[#fff4e5] text-[#b85d00]"
                    }`}
                  >
                    {validCount}/7 Berkas Valid
                  </span>
                </div>
              </div>

              {/* 7 Document Cards Grid */}
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-7">
                {st.documents.map((doc) => {
                  const exp = evaluateExpiryStatus(doc.expiryDate);
                  let badgeStyle =
                    "border-[#eceef2] bg-[#fafbfc] text-[#6b707b]";
                  if (doc.status === "VALID") {
                    badgeStyle =
                      "border-[#23a041]/30 bg-[#eaf9ee] text-[#156829]";
                  } else if (doc.status === "MENUNGGU") {
                    badgeStyle =
                      "border-[#f59e0b]/40 bg-[#fffbeb] text-[#92400e]";
                  } else if (doc.status === "DITOLAK") {
                    badgeStyle =
                      "border-[#c93b2b]/40 bg-[#fdeceb] text-[#9e2316]";
                  }

                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => openVerifyModal(st, doc)}
                      className={`flex flex-col justify-between rounded-2xl border p-3 text-left transition-transform hover:scale-[1.02] ${badgeStyle}`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[11px] font-extrabold uppercase">
                            {doc.docType}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase">
                            {doc.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="mt-1 text-[12px] font-bold text-[#141518]">
                          {doc.label}
                        </div>
                        <div className="mt-0.5 truncate font-mono text-[10.5px] opacity-80">
                          {doc.documentNumber || "Belum ada nomor"}
                        </div>
                      </div>

                      <div className="mt-2.5 border-t border-current/10 pt-1.5">
                        {exp.hasExpiry ? (
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-extrabold ${
                              exp.isExpiringH30
                                ? "bg-[#c93b2b] text-[#ffffff]"
                                : "bg-[#141518]/10 text-[#141518]"
                            }`}
                          >
                            {exp.badgeText}
                          </span>
                        ) : doc.status === "DITOLAK" ? (
                          <span className="line-clamp-1 text-[10px] font-bold text-[#c93b2b]">
                            Revisi: {doc.rejectionReason}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold opacity-75">
                            Klik untuk verifikasi →
                          </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111215]/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-[24px] bg-[#ffffff] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eceef2] pb-3">
              <div>
                <h3 className="text-[17px] font-bold text-[#141518]">
                  Verifikasi Berkas: {editingContext.doc.label}
                </h3>
                <p className="text-[12px] text-[#72767f]">
                  Siswa: <strong>{editingContext.student.fullName}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingContext(null)}
                className="rounded-lg px-2 py-1 text-[13px] font-bold text-[#72767f]"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSaveDocVerification}
              className="mt-4 space-y-3.5"
            >
              {modalError && (
                <div className="rounded-xl bg-[#fdeceb] p-3 text-[12px] font-semibold text-[#c93b2b]">
                  {modalError}
                </div>
              )}

              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Nomor Dokumen Resmi
                </label>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="Contoh: C8941205 / 320401..."
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Status Keputusan Verifikasi TU
                </label>
                <select
                  value={docStatus}
                  onChange={(e) =>
                    setDocStatus(e.target.value as DocVerificationStatus)
                  }
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px] font-semibold"
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
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Tanggal Habis Masa Berlaku (Expiry Tracker H-30)
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                  <p className="mt-1 text-[11px] text-[#72767f]">
                    Jika sisa waktu ≤ 30 hari dari tanggal berjalan (2026-11-18),
                    sistem otomatis memunculkan peringatan merah H-30.
                  </p>
                </div>
              )}

              {docStatus === "DITOLAK" && (
                <div>
                  <label className="block text-[12px] font-bold text-[#c93b2b]">
                    Catatan Alasan Penolakan (Wajib Diisi)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Jelaskan alasan penolakan agar siswa dapat memperbaiki unggahan..."
                    className="mt-1 w-full rounded-xl border border-[#c93b2b] px-3 py-2 text-[13px]"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingContext(null)}
                  className="rounded-xl border border-[#eceef2] px-4 py-2 text-[13px] font-semibold text-[#5a5e67]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#ffe11d] px-5 py-2 text-[13px] font-bold text-[#111215] hover:bg-[#f5d200]"
                >
                  Simpan Verifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
