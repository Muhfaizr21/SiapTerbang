"use client";

import { useState } from "react";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type {
  DormitoryRoomRecord,
  StudentRecord,
  ViolationLogItem,
} from "@/types/tu";
import { MAX_VIOLATION_POINTS_THRESHOLD } from "@/services/tu-domain-engine";

interface TuAsramaFeatureProps {
  readonly students: readonly StudentRecord[];
  readonly rooms: readonly DormitoryRoomRecord[];
  readonly violations: readonly ViolationLogItem[];
  readonly onAssignRoom: (studentId: string, roomId: string) => void;
  readonly onRecordViolation: (
    studentId: string,
    title: string,
    category: "RINGAN" | "SEDANG" | "BERAT",
    points: number
  ) => void;
  readonly onResetRehabilitation: (studentId: string) => void;
}

const VIOLATION_PRESETS: readonly {
  readonly label: string;
  readonly category: "RINGAN" | "SEDANG" | "BERAT";
  readonly points: number;
}[] = [
  {
    label: "Terlambat Apel Fisik Pagi (05:30 WIB)",
    category: "RINGAN",
    points: 15,
  },
  {
    label: "Kamar Asrama Tidak Rapi / Lalai Piket",
    category: "RINGAN",
    points: 20,
  },
  {
    label: "Merokok di Area Terlarang Asrama",
    category: "SEDANG",
    points: 30,
  },
  {
    label: "Keluar Asrama Malam Tanpa Izin Resmi",
    category: "BERAT",
    points: 50,
  },
] as const;

export function TuAsramaFeature({
  students,
  rooms,
  violations,
  onAssignRoom,
  onRecordViolation,
  onResetRehabilitation,
}: TuAsramaFeatureProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id ?? ""
  );
  const [violationTitle, setViolationTitle] = useState<string>(
    VIOLATION_PRESETS[0].label
  );
  const [violationCategory, setViolationCategory] = useState<
    "RINGAN" | "SEDANG" | "BERAT"
  >("RINGAN");
  const [violationPoints, setViolationPoints] = useState<number>(15);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const activeSelectedStudent =
    students.find((s) => s.id === selectedStudentId) ?? students[0];

  const handleApplyPreset = (preset: (typeof VIOLATION_PRESETS)[number]) => {
    setViolationTitle(preset.label);
    setViolationCategory(preset.category);
    setViolationPoints(preset.points);
  };

  const handleSubmitViolation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSelectedStudent || !violationTitle.trim() || violationPoints <= 0)
      return;

    const projectedPoints =
      activeSelectedStudent.violationPoints + violationPoints;
    onRecordViolation(
      activeSelectedStudent.id,
      violationTitle.trim(),
      violationCategory,
      violationPoints
    );

    if (projectedPoints >= MAX_VIOLATION_POINTS_THRESHOLD) {
      setFeedbackMsg(
        `PERINGATAN CROSS-ROLE LOCK: Akumulasi poin "${activeSelectedStudent.fullName}" mencapai ${projectedPoints}/100 poin! Status otomatis berubah menjadi SUSPENDED dan terkunci dari modul Smart Matching Mensetsu.`
      );
    } else {
      setFeedbackMsg(
        `Catatan pelanggaran "${activeSelectedStudent.fullName}" (+${violationPoints} poin) berhasil direkam ke Buku Disiplin Asrama.`
      );
    }
  };

  return (
    <div className="space-y-5">
      {/* Dormitory Room Capacity Cards */}
      <div className={styles.surfaceCard}>
        <div className={styles.surfaceCardHeader}>
          <div>
            <h2 className="text-[19px] font-bold text-[#141518]">
              Data Induk Siswa, Kamar Asrama & Kunci Disiplin (100 Poin)
            </h2>
            <p className="mt-0.5 text-[13px] text-[#72767f]">
              Jika akumulasi poin pelanggaran siswa mencapai 100 poin, sistem otomatis membekukan siswa dari kandidat wawancara.
            </p>
          </div>
          <span className="rounded-full bg-[#ffe11d] px-3.5 py-1 text-[12px] font-extrabold text-[#111215]">
            Batas Lock: {MAX_VIOLATION_POINTS_THRESHOLD} Poin
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((rm) => {
            const pct = Math.min(
              100,
              Math.round((rm.occupiedCount / rm.capacity) * 100)
            );
            const isFull = rm.occupiedCount >= rm.capacity;
            return (
              <div
                key={rm.id}
                className="rounded-2xl border border-[#eceef2] bg-[#fafbfc] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-extrabold text-[#141518]">
                    Kamar {rm.roomCode}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${
                      rm.genderZone === "PUTRA"
                        ? "bg-[#e8f0fe] text-[#1d4ed8]"
                        : "bg-[#fce8f3] text-[#be185d]"
                    }`}
                  >
                    {rm.genderZone}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] text-[#72767f]">
                  {rm.buildingName}
                </p>

                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#eceef2]">
                  <div
                    className={`h-full rounded-full ${
                      isFull ? "bg-[#c93b2b]" : "bg-[#ffe11d]"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11.5px] font-semibold text-[#5a5e67]">
                  <span>
                    Terisi: {rm.occupiedCount}/{rm.capacity} Siswa
                  </span>
                  <span>{isFull ? "Penuh" : "Tersedia"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {feedbackMsg && (
          <div
            className={`mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[13px] font-semibold ${
              feedbackMsg.includes("PERINGATAN CROSS-ROLE LOCK")
                ? "border border-[#c93b2b]/30 bg-[#fdeceb] text-[#a62618]"
                : "border border-[#23a041]/30 bg-[#eaf9ee] text-[#156829]"
            }`}
          >
            <span>{feedbackMsg}</span>
            <button
              type="button"
              onClick={() => setFeedbackMsg(null)}
              className="text-[12px] font-bold underline"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      {/* Main Split: Left Student Discipline Table (7 Cols) + Right Violation Logger & Biodata (5 Cols) */}
      <div className={styles.bentoGrid}>
        {/* Left 7 Cols: Master Induk & Poin Asrama Table */}
        <div className={styles.bentoLeftCol}>
          <div className={styles.surfaceCard}>
            <div className={styles.surfaceCardHeader}>
              <h3 className={styles.surfaceCardTitle}>
                Daftar Data Induk Siswa & Akumulasi Poin Asrama
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#eceef2] text-[11px] font-bold uppercase tracking-wider text-[#7c8089]">
                    <th className="pb-2.5 pr-3">Siswa & NIS</th>
                    <th className="pb-2.5 pr-3">Plotting Kamar</th>
                    <th className="pb-2.5 pr-3">Poin Pelanggaran</th>
                    <th className="pb-2.5 pr-3">Status Mensetsu</th>
                    <th className="pb-2.5 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f2f5] text-[12.5px]">
                  {students.map((st) => {
                    const isSuspended = st.studentStatus === "SUSPENDED";
                    const isSelected = st.id === activeSelectedStudent?.id;
                    const pct = Math.min(100, st.violationPoints);
                    return (
                      <tr
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`transition-colors ${
                          isSelected ? "bg-[#fffbeb]" : "hover:bg-[#fafbfc]"
                        }`}
                      >
                        <td className="py-3 pr-3">
                          <div className="font-bold text-[#141518]">
                            {st.fullName}
                          </div>
                          <div className="font-mono text-[11px] text-[#72767f]">
                            {st.nis || "Calon Siswa"} • {st.phoneParent} (Wali)
                          </div>
                        </td>

                        <td className="py-3 pr-3">
                          <select
                            aria-label={`Kamar asrama ${st.fullName}`}
                            value={st.dormitoryRoomId}
                            onChange={(e) =>
                              onAssignRoom(st.id, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-lg border border-[#dcdfe6] bg-[#ffffff] px-2 py-1 text-[12px] font-semibold text-[#141518]"
                          >
                            <option value="">Belum Plotting</option>
                            {rooms.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.roomCode} ({r.genderZone})
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono text-[13px] font-extrabold ${
                                isSuspended
                                  ? "text-[#c93b2b]"
                                  : st.violationPoints >= 60
                                  ? "text-[#b85d00]"
                                  : "text-[#141518]"
                              }`}
                            >
                              {st.violationPoints}/100
                            </span>
                          </div>
                          <div className="mt-1 h-2 w-24 overflow-hidden rounded-full bg-[#eceef2]">
                            <div
                              className={`h-full rounded-full ${
                                isSuspended
                                  ? "bg-[#c93b2b]"
                                  : st.violationPoints >= 60
                                  ? "bg-[#f59e0b]"
                                  : "bg-[#23a041]"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>

                        <td className="py-3 pr-3">
                          {isSuspended ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#fdeceb] px-2.5 py-0.5 text-[11px] font-extrabold text-[#c93b2b]">
                              🔒 SUSPENDED (Terkunci)
                            </span>
                          ) : st.ppdbStatus === "MENUNGGU_SELEKSI" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f5f8] px-2.5 py-0.5 text-[11px] font-semibold text-[#6b707b]">
                              Menunggu PPDB
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8ec] px-2.5 py-0.5 text-[11px] font-bold text-[#188633]">
                              ✓ Disiplin Aman
                            </span>
                          )}
                        </td>

                        <td className="py-3 text-right">
                          {st.violationPoints > 0 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onResetRehabilitation(st.id);
                                setFeedbackMsg(
                                  `Siswa "${st.fullName}" telah menyelesaikan pembinaan. Poin di-reset ke 0 dan kunci Mensetsu dibuka kembali.`
                                );
                              }}
                              className="rounded-lg border border-[#dcdfe6] bg-[#ffffff] px-2.5 py-1 text-[11px] font-bold text-[#141518] hover:bg-[#e8f8ec]"
                            >
                              Pemutihan
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Violation Log History */}
          <div className={styles.surfaceCard}>
            <h3 className={styles.surfaceCardTitle}>
              Buku Log Pelanggaran Asrama Terbaru
            </h3>
            <div className="mt-3 divide-y divide-[#f1f2f5]">
              {violations.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between gap-3 py-2.5 text-[12.5px]"
                >
                  <div>
                    <div className="font-bold text-[#141518]">
                      {v.studentName}{" "}
                      <span className="font-mono text-[11px] font-normal text-[#72767f]">
                        ({v.studentNis || "PPDB"})
                      </span>
                    </div>
                    <div className="text-[#5a5e67]">{v.violationTitle}</div>
                    <div className="text-[11px] text-[#8a8f99]">
                      Dicatat oleh {v.recordedBy} • {v.occurredAt}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#fdeceb] px-2.5 py-1 font-mono text-[12px] font-extrabold text-[#c93b2b]">
                    +{v.pointsAdded} Poin
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Input Pelanggaran + Detail Biodata Induk */}
        <div className={styles.bentoRightCol}>
          {activeSelectedStudent && (
            <>
              <div className={styles.surfaceCard}>
                <h3 className={styles.surfaceCardTitle}>
                  Catat Poin Pelanggaran Disiplin
                </h3>
                <p className="mt-1 text-[12px] text-[#72767f]">
                  Siswa terpilih:{" "}
                  <strong className="text-[#141518]">
                    {activeSelectedStudent.fullName}
                  </strong>{" "}
                  (Poin saat ini: {activeSelectedStudent.violationPoints}/100)
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {VIOLATION_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="rounded-lg border border-[#eceef2] bg-[#fafbfc] px-2.5 py-1 text-left text-[11px] font-semibold text-[#363942] hover:border-[#141518] hover:bg-[#ffe11d]/30"
                    >
                      +{preset.points}pt • {preset.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmitViolation}
                  className="mt-3.5 space-y-3"
                >
                  <div>
                    <label className="block text-[12px] font-bold text-[#363942]">
                      Deskripsi Pelanggaran Asrama
                    </label>
                    <input
                      type="text"
                      required
                      value={violationTitle}
                      onChange={(e) => setViolationTitle(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-[#363942]">
                        Kategori
                      </label>
                      <select
                        value={violationCategory}
                        onChange={(e) =>
                          setViolationCategory(
                            e.target.value as "RINGAN" | "SEDANG" | "BERAT"
                          )
                        }
                        className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 text-[13px]"
                      >
                        <option value="RINGAN">Ringan (10-20 Poin)</option>
                        <option value="SEDANG">Sedang (25-40 Poin)</option>
                        <option value="BERAT">Berat (50-100 Poin)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-[#363942]">
                        Penambahan Poin
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={100}
                        value={violationPoints}
                        onChange={(e) =>
                          setViolationPoints(Number(e.target.value))
                        }
                        className="mt-1 w-full rounded-xl border border-[#dcdfe6] px-3 py-2 font-mono text-[13px] font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#141518] py-2.5 text-[13px] font-bold text-[#ffffff] hover:bg-[#000000]"
                  >
                    Rekam Poin Pelanggaran (+{violationPoints} Poin)
                  </button>
                </form>
              </div>

              {/* Detail Biodata Induk Card */}
              <div className={styles.surfaceCard}>
                <h3 className={styles.surfaceCardTitle}>
                  Kartu Data Induk Siswa
                </h3>
                <div className="mt-3 space-y-2 text-[12.5px]">
                  <div className="flex justify-between border-b border-[#f1f2f5] pb-1.5">
                    <span className="text-[#72767f]">Nama Lengkap</span>
                    <span className="font-bold text-[#141518]">
                      {activeSelectedStudent.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f1f2f5] pb-1.5">
                    <span className="text-[#72767f]">NIS / NIK</span>
                    <span className="font-mono font-semibold text-[#141518]">
                      {activeSelectedStudent.nis || "-"} /{" "}
                      {activeSelectedStudent.nik}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f1f2f5] pb-1.5">
                    <span className="text-[#72767f]">Tempat, Tgl Lahir</span>
                    <span className="font-semibold text-[#141518]">
                      {activeSelectedStudent.birthPlace},{" "}
                      {activeSelectedStudent.birthDate}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f1f2f5] pb-1.5">
                    <span className="text-[#72767f]">Pendidikan</span>
                    <span className="font-semibold text-[#141518]">
                      {activeSelectedStudent.educationLevel}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f1f2f5] pb-1.5">
                    <span className="text-[#72767f]">Wali & WA Ortu</span>
                    <span className="font-semibold text-[#141518]">
                      {activeSelectedStudent.parentName} (
                      {activeSelectedStudent.phoneParent})
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="text-[#72767f]">Alamat Domisili:</span>
                    <p className="mt-0.5 font-medium text-[#23252b]">
                      {activeSelectedStudent.address}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
