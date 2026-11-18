"use client";

import { useState } from "react";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type { OffboardingRecord, StudentRecord } from "@/types/tu";
import {
  buildDisnakerCsv,
  calculateNetRefund,
  formatIdrCurrency,
} from "@/services/tu-domain-engine";

interface TuOffboardingFeatureProps {
  readonly students: readonly StudentRecord[];
  readonly offboardings: readonly OffboardingRecord[];
  readonly onSubmitOffboarding: (params: {
    readonly studentId: string;
    readonly reason: string;
    readonly totalPaidIdr: number;
    readonly deductionMcuIdr: number;
    readonly deductionPassportIdr: number;
    readonly deductionUniformIdr: number;
    readonly deductionDormIdr: number;
  }) => void;
}

export function TuOffboardingFeature({
  students,
  offboardings,
  onSubmitOffboarding,
}: TuOffboardingFeatureProps) {
  const activeStudents = students.filter(
    (s) => s.studentStatus !== "OFFBOARDED"
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    activeStudents[0]?.id ?? students[0]?.id ?? ""
  );
  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) ?? students[0];

  const [reason, setReason] = useState<string>(
    "Mengundurkan diri atas permintaan keluarga"
  );
  const [totalPaidIdr, setTotalPaidIdr] = useState<number>(
    selectedStudent?.totalPaidIdr ?? 12500000
  );
  const [deductionMcuIdr, setDeductionMcuIdr] = useState<number>(950000);
  const [deductionPassportIdr, setDeductionPassportIdr] =
    useState<number>(650000);
  const [deductionUniformIdr, setDeductionUniformIdr] =
    useState<number>(450000);
  const [deductionDormIdr, setDeductionDormIdr] = useState<number>(800000);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  const handleSelectStudentChange = (nextId: string) => {
    setSelectedStudentId(nextId);
    const st = students.find((s) => s.id === nextId);
    if (st) {
      setTotalPaidIdr(st.totalPaidIdr);
    }
  };

  const refundCalc = calculateNetRefund({
    totalPaidIdr,
    deductionMcuIdr,
    deductionPassportIdr,
    deductionUniformIdr,
    deductionDormIdr,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !reason.trim()) return;

    onSubmitOffboarding({
      studentId: selectedStudent.id,
      reason: reason.trim(),
      totalPaidIdr,
      deductionMcuIdr,
      deductionPassportIdr,
      deductionUniformIdr,
      deductionDormIdr,
    });

    setNoticeMsg(
      `Berita Acara Offboarding "${selectedStudent.fullName}" dengan estimasi pengembalian dana ${formatIdrCurrency(
        refundCalc.netRefundIdr
      )} berhasil diajukan ke Pusat Persetujuan Direktur LPK & Keuangan.`
    );
  };

  const handleDownloadDisnakerCsv = () => {
    const csvContent = buildDisnakerCsv(students);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "laporan-disnaker-bp2mi-lpknusantara.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setNoticeMsg(
      "File Laporan Rekapitulasi Siswa Disnaker/BP2MI (.csv Excel Compatible) berhasil diunduh."
    );
  };

  return (
    <div className="space-y-5">
      {/* Header & 1-Click Export Disnaker Banner */}
      <div className={styles.surfaceCard}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[19px] font-bold text-[#141518]">
              Offboarding (Cancel), Kalkulator Refund & Laporan Dinas
            </h2>
            <p className="mt-0.5 text-[13px] text-[#72767f]">
              Hitung otomatis pengembalian dana siswa mengundurkan diri dan ekspor rekap pelaporan resmi Disnaker/BP2MI.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadDisnakerCsv}
            className="flex items-center gap-2 rounded-full bg-[#ffe11d] px-4 py-2.5 text-[13px] font-extrabold text-[#111215] shadow-xs transition-transform hover:scale-[1.02]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Ekspor Laporan Disnaker / BP2MI (CSV Excel)</span>
          </button>
        </div>

        {noticeMsg && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#23a041]/30 bg-[#eaf9ee] px-4 py-2.5 text-[12.5px] font-semibold text-[#156829]">
            <span>{noticeMsg}</span>
            <button
              type="button"
              onClick={() => setNoticeMsg(null)}
              className="font-bold underline"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Refund Calculator (5 Cols) + Offboarding History & Disnaker Preview (7 Cols) */}
      <div className={styles.bentoGrid}>
        {/* Left: Offboarding & Refund Calculator Form */}
        <div className={styles.bentoRightCol}>
          <div className={styles.surfaceCard}>
            <h3 className={styles.surfaceCardTitle}>
              Simulasi Kalkulator Refund & Berita Acara Cancel
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Pilih Siswa Mengundurkan Diri
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleSelectStudentChange(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px] font-semibold"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.fullName} ({st.nis || "PPDB"} - Status:{" "}
                      {st.studentStatus})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Total Biaya yang Sudah Disetor Siswa (IDR)
                </label>
                <input
                  type="number"
                  min={0}
                  step={50000}
                  value={totalPaidIdr}
                  onChange={(e) => setTotalPaidIdr(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[13.5px] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#6b707b]">
                    Potongan Biaya MCU Terpakai
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={deductionMcuIdr}
                    onChange={(e) => setDeductionMcuIdr(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[12.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#6b707b]">
                    Potongan Pengurusan Paspor
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={deductionPassportIdr}
                    onChange={(e) =>
                      setDeductionPassportIdr(Number(e.target.value))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[12.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#6b707b]">
                    Potongan Seragam & Modul
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={deductionUniformIdr}
                    onChange={(e) =>
                      setDeductionUniformIdr(Number(e.target.value))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[12.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#6b707b]">
                    Potongan Makan & Asrama
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={deductionDormIdr}
                    onChange={(e) =>
                      setDeductionDormIdr(Number(e.target.value))
                    }
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[12.5px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Alasan Pengunduran Diri / Pembatalan
                </label>
                <textarea
                  rows={2}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                />
              </div>

              {/* Net Refund Summary Box */}
              <div className="rounded-2xl border border-[#141518]/15 bg-[#fffbeb] p-4">
                <div className="flex justify-between text-[12px] text-[#5a5e67]">
                  <span>Total Setor Siswa:</span>
                  <span className="font-mono font-bold text-[#141518]">
                    {formatIdrCurrency(totalPaidIdr)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[12px] text-[#c93b2b]">
                  <span>Total Komponen Biaya Terpakai:</span>
                  <span className="font-mono font-bold">
                    - {formatIdrCurrency(refundCalc.totalDeductionsIdr)}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-[#e5e0c8] pt-2.5">
                  <span className="text-[13px] font-extrabold text-[#141518]">
                    Sisa Dana Pengembalian (Net Refund):
                  </span>
                  <span className="font-mono text-[18px] font-extrabold text-[#188633]">
                    {formatIdrCurrency(refundCalc.netRefundIdr)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#141518] py-2.5 text-[13px] font-bold text-[#ffffff] hover:bg-[#000000]"
              >
                Ajukan Berita Acara Offboarding ke Direktur & Keuangan
              </button>
            </form>
          </div>
        </div>

        {/* Right: Offboarding Approval List & Disnaker Report Table */}
        <div className={styles.bentoLeftCol}>
          <div className={styles.surfaceCard}>
            <h3 className={styles.surfaceCardTitle}>
              Daftar Pengajuan Offboarding & Status Persetujuan Refund
            </h3>
            <div className="mt-3 divide-y divide-[#f1f2f5] text-[12.5px]">
              {offboardings.map((ob) => (
                <div
                  key={ob.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <div className="font-bold text-[#141518]">
                      {ob.studentName}{" "}
                      <span className="font-mono text-[11px] font-normal text-[#72767f]">
                        ({ob.studentNis || "PPDB"})
                      </span>
                    </div>
                    <div className="text-[#5a5e67]">{ob.reason}</div>
                    <div className="mt-1 font-mono text-[11.5px] text-[#72767f]">
                      Setor: {formatIdrCurrency(ob.totalPaidIdr)} • Refund
                      Bersih:{" "}
                      <strong className="text-[#188633]">
                        {formatIdrCurrency(ob.netRefundIdr)}
                      </strong>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      ob.approvalStatus === "DISETUJUI_DIREKTUR"
                        ? "bg-[#e8f8ec] text-[#188633]"
                        : "bg-[#fff4e5] text-[#b85d00]"
                    }`}
                  >
                    {ob.approvalStatus.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.surfaceCard}>
            <div className="flex items-center justify-between">
              <h3 className={styles.surfaceCardTitle}>
                Pratinjau Tabel Laporan Dinas (Standar Disnaker / BP2MI)
              </h3>
              <span className="font-mono text-[11.5px] font-bold text-[#72767f]">
                {students.length} Baris Data
              </span>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[12px]">
                <thead>
                  <tr className="border-b border-[#eceef2] text-[10.5px] font-bold uppercase text-[#7c8089]">
                    <th className="pb-2 pr-3">NIS / NIK</th>
                    <th className="pb-2 pr-3">Nama Kandidat</th>
                    <th className="pb-2 pr-3">Program</th>
                    <th className="pb-2 pr-3">Berkas</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f2f5]">
                  {students.map((st) => {
                    const validDocs = st.documents.filter(
                      (d) => d.status === "VALID"
                    ).length;
                    return (
                      <tr key={st.id}>
                        <td className="py-2.5 pr-3 font-mono text-[11px]">
                          <div className="font-bold text-[#141518]">
                            {st.nis || "BELUM_TERBIT"}
                          </div>
                          <div className="text-[#72767f]">{st.nik}</div>
                        </td>
                        <td className="py-2.5 pr-3 font-bold text-[#141518]">
                          {st.fullName}
                        </td>
                        <td className="py-2.5 pr-3 text-[#363942]">
                          {st.targetProgram.replace("_", " ")}
                        </td>
                        <td className="py-2.5 pr-3 font-mono font-bold">
                          {validDocs}/7 Valid
                        </td>
                        <td className="py-2.5">
                          <span className="rounded bg-[#f4f5f8] px-2 py-0.5 text-[10.5px] font-bold text-[#141518]">
                            {st.studentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
