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
  }) => OfficialLetterRecord | null;
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

  const handleGenerateAndPrint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const created = onCreateLetter({
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

  return (
    <div className="space-y-5">
      <div className={styles.surfaceCard}>
        <h2 className="text-[19px] font-bold text-[#141518]">
          Generator Surat Resmi Berkop LPK (Auto-Fill Data Induk)
        </h2>
        <p className="mt-0.5 text-[13px] text-[#72767f]">
          Tarik otomatis biodata siswa ke dalam template surat pengantar Paspor Imigrasi, Rekomendasi Disnaker ID CPMI, atau Izin Orang Tua tanpa ketik ulang.
        </p>

        {bannerText && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#23a041]/30 bg-[#eaf9ee] px-4 py-2.5 text-[12.5px] font-semibold text-[#156829]">
            <span>{bannerText}</span>
            <button
              type="button"
              onClick={() => setBannerText(null)}
              className="font-bold underline"
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
            <h3 className={styles.surfaceCardTitle}>
              Konfigurasi Penerbitan Surat
            </h3>

            <form
              onSubmit={handleGenerateAndPrint}
              className="mt-4 space-y-3.5"
            >
              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Pilih Siswa / Kandidat
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px] font-semibold"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.fullName} ({st.nis || "PPDB"} - NIK: {st.nik})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#363942]">
                  Jenis Template Surat Resmi
                </label>
                <select
                  value={letterType}
                  onChange={(e) =>
                    handleLetterTypeChange(e.target.value as OfficialLetterType)
                  }
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px] font-semibold"
                >
                  <option value="PENGANTAR_PASPOR">
                    1. Surat Pengantar Paspor (Imigrasi)
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
                <label className="block text-[12px] font-bold text-[#363942]">
                  Instansi Tujuan Surat
                </label>
                <input
                  type="text"
                  required
                  value={destinationAgency}
                  onChange={(e) => setDestinationAgency(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Pejabat Penandatangan
                  </label>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#363942]">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    required
                    value={signerRole}
                    onChange={(e) => setSignerRole(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#ffe11d] py-2.5 text-[13px] font-extrabold text-[#111215] hover:bg-[#f5d200]"
                >
                  Terbitkan & Simpan Arsip
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xl bg-[#141518] px-4 py-2.5 text-[13px] font-bold text-[#ffffff] hover:bg-[#000000]"
                >
                  Cetak PDF A4
                </button>
              </div>
            </form>
          </div>

          {/* Archive History */}
          <div className={styles.surfaceCard}>
            <h3 className={styles.surfaceCardTitle}>
              Arsip Surat Keluar Admin TU ({letters.length})
            </h3>
            <div className="mt-3 divide-y divide-[#f1f2f5] text-[12.5px]">
              {letters.map((ltr) => (
                <div
                  key={ltr.id}
                  className="flex items-center justify-between gap-2 py-2.5"
                >
                  <div>
                    <div className="font-mono text-[11.5px] font-extrabold text-[#141518]">
                      {ltr.letterNumber}
                    </div>
                    <div className="font-bold text-[#23252b]">
                      {ltr.studentName} ({ltr.studentNis || "PPDB"})
                    </div>
                    <div className="text-[11px] text-[#72767f]">
                      {LETTER_TYPE_LABELS[ltr.letterType]} • {ltr.issuedDate}
                    </div>
                  </div>
                  <span className="rounded-full bg-[#e8f8ec] px-2.5 py-0.5 text-[10.5px] font-bold text-[#188633]">
                    Terbit
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Live Official Letterhead A4 Preview */}
        <div className={styles.bentoLeftCol}>
          {selectedStudent && (
            <div className="rounded-[24px] border border-[#dcdfe6] bg-[#ffffff] p-8 shadow-md">
              {/* Official LPK Letterhead */}
              <div className="flex items-center justify-between border-b-2 border-[#141518] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141518] text-[18px] font-extrabold text-[#ffe11d]">
                    ST
                  </div>
                  <div>
                    <h4 className="text-[16px] font-extrabold uppercase tracking-tight text-[#141518]">
                      LPK NUSANTARA JAYA INTERNASIONAL
                    </h4>
                    <p className="text-[11.5px] text-[#5a5e67]">
                      Izin SO Kemnaker RI No. KEP.218/LATTAS/XI/2025 •
                      lpknusantara.siapterbang.id
                    </p>
                    <p className="text-[11px] text-[#72767f]">
                      Jl. Soekarno Hatta No. 412, Kota Bandung, Jawa Barat •
                      Telp: (022) 7318890
                    </p>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-[#6b707b]">
                  <div>DOKUMEN RESMI LPK</div>
                  <div className="font-bold text-[#141518]">
                    { String(letters.length + 42).padStart(3, "0") }/TU-LPKN/XI/2026
                  </div>
                </div>
              </div>

              {/* Letter Body */}
              <div className="mt-6 space-y-4 text-[13px] leading-relaxed text-[#1f2025]">
                <div className="text-center">
                  <h5 className="text-[15px] font-extrabold uppercase underline">
                    {LETTER_TYPE_LABELS[letterType]}
                  </h5>
                  <p className="mt-0.5 font-mono text-[12px] text-[#5a5e67]">
                    Nomor:{" "}
                    {String(letters.length + 42).padStart(3, "0")}
                    /TU-LPKN/XI/2026
                  </p>
                </div>

                <div>
                  <p>Kepada Yth.</p>
                  <p className="font-bold text-[#141518]">
                    {destinationAgency}
                  </p>
                  <p>Di Tempat</p>
                </div>

                <p>
                  Dengan hormat, yang bertanda tangan di bawah ini manajemen{" "}
                  <strong>LPK Nusantara Jaya Internasional</strong> menerangkan
                  bahwa peserta pelatihan Calon Pekerja Migran Indonesia (CPMI)
                  berikut:
                </p>

                <div className="rounded-xl border border-[#eceef2] bg-[#fafbfc] p-4">
                  <div className="grid grid-cols-3 gap-y-1.5 text-[12.5px]">
                    <span className="text-[#6b707b]">Nama Lengkap</span>
                    <span className="col-span-2 font-bold text-[#141518]">
                      : {selectedStudent.fullName}
                    </span>

                    <span className="text-[#6b707b]">Nomor Induk Siswa</span>
                    <span className="col-span-2 font-mono font-bold text-[#141518]">
                      : {selectedStudent.nis || "CALON-SISWA-PPDB"}
                    </span>

                    <span className="text-[#6b707b]">NIK KTP</span>
                    <span className="col-span-2 font-mono font-semibold text-[#141518]">
                      : {selectedStudent.nik}
                    </span>

                    <span className="text-[#6b707b]">Tempat, Tgl Lahir</span>
                    <span className="col-span-2 font-semibold text-[#141518]">
                      : {selectedStudent.birthPlace},{" "}
                      {selectedStudent.birthDate}
                    </span>

                    <span className="text-[#6b707b]">Program Negara</span>
                    <span className="col-span-2 font-bold text-[#141518]">
                      : {selectedStudent.targetProgram.replace("_", " ")} (
                      {selectedStudent.batchName})
                    </span>

                    <span className="text-[#6b707b]">Nama Orang Tua/Wali</span>
                    <span className="col-span-2 font-semibold text-[#141518]">
                      : {selectedStudent.parentName} (WA:{" "}
                      {selectedStudent.phoneParent})
                    </span>

                    <span className="text-[#6b707b]">Alamat Domisili</span>
                    <span className="col-span-2 font-medium text-[#141518]">
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

                <div className="flex items-end justify-between pt-6">
                  <div className="rounded-xl border border-[#eceef2] bg-[#fafbfc] p-3 text-[10.5px] text-[#6b707b]">
                    <div className="font-mono font-bold text-[#141518]">
                      QR VERIFIED • SIAPTERBANG
                    </div>
                    <div>Hash: ST-2026-{selectedStudent.id.toUpperCase()}</div>
                  </div>

                  <div className="text-right">
                    <p className="text-[12px] text-[#5a5e67]">
                      Bandung, 18 November 2026
                    </p>
                    <p className="text-[12px] font-semibold text-[#141518]">
                      {signerRole}
                    </p>
                    <div className="my-5 font-mono text-[11px] text-[#188633]">
                      [Tanda Tangan Digital & Stempel LPK]
                    </div>
                    <p className="text-[13px] font-extrabold underline text-[#141518]">
                      {signerName}
                    </p>
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
