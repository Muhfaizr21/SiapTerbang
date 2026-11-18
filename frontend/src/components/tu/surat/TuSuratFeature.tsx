"use client";

import { useState } from "react";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type {
  OfficialLetterRecord,
  OfficialLetterType,
  StudentRecord,
} from "@/types/tu";

interface TuSuratFeatureProps {
  readonly students: readonly StudentRecord[];
  readonly letters: readonly OfficialLetterRecord[];
  readonly onCreateLetter: (params: {
    readonly studentId: string;
    readonly letterType: OfficialLetterType;
    readonly destinationAgency: string;
    readonly signerName: string;
    readonly signerRole: string;
  }) => OfficialLetterRecord | null | Promise<OfficialLetterRecord | null>;
}

const LETTER_TYPE_LABELS: Record<OfficialLetterType, string> = {
  PENGANTAR_PASPOR: "Surat Pengantar Pembuatan Paspor (Kantor Imigrasi)",
  REKOMENDASI_DISNAKER: "Surat Rekomendasi Disnaker / Pengantar ID CPMI",
  IZIN_ORANG_TUA_KONTRAK: "Surat Izin Orang Tua / Wali & Kontrak Pelatihan",
};

export function TuSuratFeature({
  students,
  letters,
  onCreateLetter,
}: TuSuratFeatureProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id ?? ""
  );
  const [letterType, setLetterType] =
    useState<OfficialLetterType>("PENGANTAR_PASPOR");
  const [destinationAgency, setDestinationAgency] = useState<string>(
    "Kantor Imigrasi Kelas I TPI Bandung"
  );
  const [signerName, setSignerName] = useState<string>("H. Ahmad Fauzi, S.E.");
  const [signerRole, setSignerRole] = useState<string>(
    "Direktur Utama LPK Nusantara Jaya"
  );
  const [bannerText, setBannerText] = useState<string | null>(null);

  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) ?? students[0];

  const handleLetterTypeChange = (nextType: OfficialLetterType) => {
    setLetterType(nextType);
    if (nextType === "PENGANTAR_PASPOR") {
      setDestinationAgency("Kantor Imigrasi Kelas I TPI Bandung");
    } else if (nextType === "REKOMENDASI_DISNAKER") {
      setDestinationAgency(
        "Dinas Tenaga Kerja dan Transmigrasi (Pengantar ID CPMI)"
      );
    } else {
      setDestinationAgency("Orang Tua / Wali Siswa & Arsip Legal LPK");
    }
  };

  const handleGenerateAndPrint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const created = await onCreateLetter({
      studentId: selectedStudent.id,
      letterType,
      destinationAgency,
      signerName,
      signerRole,
    });

    if (created) {
      setBannerText(
        `Surat resmi nomor "${created.letterNumber}" untuk ${selectedStudent.fullName} berhasil diterbitkan ke arsip TU.`
      );
    }
  };

  const nextLetterNumber = `${String(letters.length + 42).padStart(3, "0")}/TU-LPKN/XI/2026`;

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className={styles.surfaceCard}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-extrabold tracking-tight text-[#111317]">
              Generator Surat Resmi Berkop LPK (Auto-Fill Data Induk)
            </h2>
            <p className="mt-0.5 text-[13px] text-[#666C78]">
              Tarik otomatis biodata siswa ke dalam template surat pengantar Paspor Imigrasi, Rekomendasi Disnaker ID CPMI, atau Izin Orang Tua tanpa ketik ulang.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#F2F4F7] border border-[#E4E7EC] px-3 py-1.5 font-mono text-[11.5px] font-bold text-[#344054]">
            <span>Nomor Urut Berikutnya:</span>
            <strong className="text-[#111317]">{nextLetterNumber}</strong>
          </span>
        </div>

        {bannerText && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#ABEFC6] bg-[#ECFDF3] px-4 py-2.5 text-[12.5px] font-bold text-[#067647]">
            <span>{bannerText}</span>
            <button
              type="button"
              onClick={() => setBannerText(null)}
              className="rounded-md px-2 py-0.5 text-[11.5px] font-extrabold hover:bg-[#D1FADF] cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      <div className={styles.bentoGrid}>
        {/* Left 5 Cols: Generator Configuration Form & History */}
        <div className={styles.bentoRightCol}>
          <div className={styles.surfaceCard}>
            <div className="flex items-center justify-between border-b border-[#ECEEF2] pb-3">
              <h3 className={styles.surfaceCardTitle}>
                Konfigurasi Penerbitan Surat
              </h3>
              <span className="rounded-md bg-[#FFE11D]/35 border border-[#E5C700]/50 px-2 py-0.5 text-[10.5px] font-extrabold text-[#111215]">
                Auto-Fill Aktif
              </span>
            </div>

            <form
              onSubmit={handleGenerateAndPrint}
              className="mt-4 space-y-3.5"
            >
              <div>
                <label className={styles.formLabel}>
                  Pilih Siswa / Kandidat CPMI
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className={styles.formSelect}
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.fullName} ({st.nis || "PPDB"} - NIK: {st.nik})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.formLabel}>
                  Jenis Template Surat Resmi
                </label>
                <select
                  value={letterType}
                  onChange={(e) =>
                    handleLetterTypeChange(e.target.value as OfficialLetterType)
                  }
                  className={styles.formSelect}
                >
                  <option value="PENGANTAR_PASPOR">
                    1. Surat Pengantar Paspor (Kantor Imigrasi)
                  </option>
                  <option value="REKOMENDASI_DISNAKER">
                    2. Surat Rekomendasi Disnaker / ID CPMI
                  </option>
                  <option value="IZIN_ORANG_TUA_KONTRAK">
                    3. Surat Izin Orang Tua & Kontrak Pelatihan
                  </option>
                </select>
              </div>

              <div>
                <label className={styles.formLabel}>
                  Instansi Tujuan Surat
                </label>
                <input
                  type="text"
                  required
                  value={destinationAgency}
                  onChange={(e) => setDestinationAgency(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={styles.formLabel}>
                    Pejabat Penandatangan
                  </label>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>
                    Jabatan Resmi
                  </label>
                  <input
                    type="text"
                    required
                    value={signerRole}
                    onChange={(e) => setSignerRole(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-2.5 pt-2">
                <button
                  type="submit"
                  className={`flex-1 ${styles.btnPrimaryYellow}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                  <span>Terbitkan & Simpan Arsip</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className={styles.btnPrimaryDark}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect width="12" height="8" x="6" y="14" />
                  </svg>
                  <span>Cetak PDF A4</span>
                </button>
              </div>
            </form>
          </div>

          {/* Archive History */}
          <div className={styles.surfaceCard}>
            <div className="flex items-center justify-between border-b border-[#ECEEF2] pb-3">
              <h3 className={styles.surfaceCardTitle}>
                Arsip Surat Keluar Admin TU
              </h3>
              <span className="rounded-lg bg-[#F2F4F7] border border-[#E4E7EC] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#344054]">
                {letters.length} Dokumen
              </span>
            </div>
            <div className="mt-3 divide-y divide-[#F2F4F7] text-[12.5px]">
              {letters.map((ltr) => (
                <div
                  key={ltr.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7] border border-[#E4E7EC] text-[#344054]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[11.5px] font-extrabold text-[#111317]">
                        {ltr.letterNumber}
                      </div>
                      <div className="truncate font-bold text-[#23252B]">
                        {ltr.studentName} ({ltr.studentNis || "PPDB"})
                      </div>
                      <div className="truncate text-[11px] font-medium text-[#667085]">
                        {LETTER_TYPE_LABELS[ltr.letterType]} • {ltr.issuedDate}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg border border-[#ABEFC6] bg-[#ECFDF3] px-2.5 py-1 text-[10.5px] font-extrabold text-[#067647]">
                    ✓ Terbit
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Live Official Letterhead A4 Preview Workstation */}
        <div className={styles.bentoLeftCol}>
          {selectedStudent && (
            <div className="rounded-2xl border border-[#E2E5ED] bg-[#EEF1F6] p-4 sm:p-6">
              {/* Document Preview Top Toolbar */}
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#17B26A]" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#475467]">
                    PRATINJAU DOKUMEN RESMI A4 • SIAP CETAK
                  </span>
                </div>
                <span className="rounded-md bg-[#FFFFFF] border border-[#D5DAE3] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#111317]">
                  No: {nextLetterNumber}
                </span>
              </div>

              {/* Elevated A4 Paper Sheet */}
              <div className="rounded-xl border border-[#D5DAE3] bg-[#FFFFFF] p-6 sm:p-9 shadow-[0_12px_32px_rgba(16,24,40,0.08)]">
                {/* Official LPK Letterhead */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-double border-[#141518] pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#141518] text-[17px] font-extrabold text-[#FFE11D] shadow-xs">
                      ST
                    </div>
                    <div>
                      <h4 className="text-[15.5px] font-extrabold uppercase tracking-tight text-[#111317]">
                        LPK NUSANTARA JAYA INTERNASIONAL
                      </h4>
                      <p className="text-[11px] font-semibold text-[#475467]">
                        Izin SO Kemnaker RI No. KEP.218/LATTAS/XI/2025 • lpknusantara.siapterbang.id
                      </p>
                      <p className="text-[10.5px] text-[#667085]">
                        Jl. Soekarno Hatta No. 412, Kota Bandung, Jawa Barat • Telp: (022) 7318890
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10.5px] text-[#667085]">
                    <div className="font-bold uppercase tracking-wider">DOKUMEN RESMI LPK</div>
                    <div className="mt-0.5 rounded bg-[#F2F4F7] px-2 py-0.5 font-extrabold text-[#111317]">
                      {nextLetterNumber}
                    </div>
                  </div>
                </div>

                {/* Letter Body */}
                <div className="mt-6 space-y-4 text-[13px] leading-relaxed text-[#1F2025]">
                  <div className="text-center">
                    <h5 className="text-[14.5px] font-extrabold uppercase underline decoration-2 underline-offset-4 text-[#111317]">
                      {LETTER_TYPE_LABELS[letterType]}
                    </h5>
                    <p className="mt-1 font-mono text-[11.5px] font-semibold text-[#475467]">
                      Nomor: {nextLetterNumber}
                    </p>
                  </div>

                  <div className="pt-1">
                    <p className="text-[#475467]">Kepada Yth.</p>
                    <p className="font-extrabold text-[#111317]">
                      {destinationAgency}
                    </p>
                    <p className="text-[#475467]">Di Tempat</p>
                  </div>

                  <p>
                    Dengan hormat, yang bertanda tangan di bawah ini manajemen{" "}
                    <strong>LPK Nusantara Jaya Internasional</strong> menerangkan
                    bahwa peserta pelatihan Calon Pekerja Migran Indonesia (CPMI)
                    berikut:
                  </p>

                  <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-[12.5px]">
                      <span className="font-medium text-[#667085]">Nama Lengkap</span>
                      <span className="sm:col-span-2 font-extrabold text-[#111317]">
                        : {selectedStudent.fullName}
                      </span>

                      <span className="font-medium text-[#667085]">Nomor Induk Siswa</span>
                      <span className="sm:col-span-2 font-mono font-bold text-[#111317]">
                        : {selectedStudent.nis || "CALON-SISWA-PPDB"}
                      </span>

                      <span className="font-medium text-[#667085]">NIK KTP</span>
                      <span className="sm:col-span-2 font-mono font-semibold text-[#111317]">
                        : {selectedStudent.nik}
                      </span>

                      <span className="font-medium text-[#667085]">Tempat, Tgl Lahir</span>
                      <span className="sm:col-span-2 font-semibold text-[#111317]">
                        : {selectedStudent.birthPlace}, {selectedStudent.birthDate}
                      </span>

                      <span className="font-medium text-[#667085]">Program Negara</span>
                      <span className="sm:col-span-2 font-bold text-[#111317]">
                        : {selectedStudent.targetProgram.replace("_", " ")} ({selectedStudent.batchName})
                      </span>

                      <span className="font-medium text-[#667085]">Nama Orang Tua/Wali</span>
                      <span className="sm:col-span-2 font-semibold text-[#111317]">
                        : {selectedStudent.parentName} (WA: {selectedStudent.phoneParent})
                      </span>

                      <span className="font-medium text-[#667085]">Alamat Domisili</span>
                      <span className="sm:col-span-2 font-medium text-[#111317]">
                        : {selectedStudent.address}
                      </span>
                    </div>
                  </div>

                  {letterType === "PENGANTAR_PASPOR" && (
                    <p>
                      Adalah benar siswa aktif pelatihan bahasa dan keterampilan
                      kerja di LPK Nusantara Jaya yang akan mengikuti penempatan
                      kerja luar negeri. Sehubungan dengan hal tersebut, kami
                      memohon bantuan pihak Kantor Imigrasi untuk dapat memproses{" "}
                      <strong>Penerbitan Paspor RI (48 Halaman)</strong> bagi
                      kandidat yang bersangkutan.
                    </p>
                  )}

                  {letterType === "REKOMENDASI_DISNAKER" && (
                    <p>
                      Adalah benar kandidat resmi LPK Nusantara Jaya yang telah
                      lulus seleksi fisik serta verifikasi berkas dasar. Kami
                      memohon penerbitan{" "}
                      <strong>Surat Rekomendasi ID CPMI SiapKerja Disnaker</strong>{" "}
                      sebagai syarat administrasi penempatan kerja ke luar negeri.
                    </p>
                  )}

                  {letterType === "IZIN_ORANG_TUA_KONTRAK" && (
                    <p>
                      Surat ini merupakan dokumen berita acara persetujuan izin
                      orang tua/wali ({selectedStudent.parentName}) serta ikatan
                      kontrak pelatihan dan disiplin asrama selama mengikuti
                      program persiapan penempatan di LPK Nusantara Jaya.
                    </p>
                  )}

                  <div className="flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-[#F2F4F7]">
                    <div className="flex items-center gap-3 rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-3 text-[10.5px] text-[#667085]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#141518] text-[#FFE11D]">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <rect width="5" height="5" x="3" y="3" rx="1" />
                          <rect width="5" height="5" x="16" y="3" rx="1" />
                          <rect width="5" height="5" x="3" y="16" rx="1" />
                          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                          <path d="M21 21v.01" />
                          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                          <path d="M3 12h.01" />
                          <path d="M12 3h.01" />
                          <path d="M12 16v.01" />
                          <path d="M16 12h1" />
                          <path d="M21 12v.01" />
                          <path d="M12 21v-1" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-mono font-extrabold text-[#111317]">
                          QR VERIFIED • SIAPTERBANG
                        </div>
                        <div className="font-mono text-[10px]">
                          Hash: ST-2026-{selectedStudent.id.slice(0, 8).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[12px] text-[#475467]">
                        Bandung, 18 November 2026
                      </p>
                      <p className="text-[12px] font-bold text-[#111317]">
                        {signerRole}
                      </p>
                      <div className="my-4 inline-flex items-center gap-1.5 rounded-lg border border-[#ABEFC6] bg-[#ECFDF3] px-3 py-1 font-mono text-[10.5px] font-bold text-[#067647]">
                        <span>✓ Tanda Tangan Digital & Stempel LPK</span>
                      </div>
                      <p className="text-[13.5px] font-extrabold underline text-[#111317]">
                        {signerName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
