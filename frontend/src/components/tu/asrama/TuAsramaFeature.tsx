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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "ST";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

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

  const projectedNextPoints =
    (activeSelectedStudent?.violationPoints ?? 0) + violationPoints;
  const willTriggerLock = projectedNextPoints >= MAX_VIOLATION_POINTS_THRESHOLD;

  return (
    <div className="space-y-5">
      {/* Dormitory Room Capacity Cards */}
      <div className={styles.surfaceCard}>
        <div className={styles.surfaceCardHeader}>
          <div>
            <h2 className="text-[18px] font-extrabold tracking-tight text-[#111317]">
              Data Induk Siswa, Kamar Asrama & Kunci Disiplin (100 Poin)
            </h2>
            <p className="mt-0.5 text-[13px] text-[#666C78]">
              Jika akumulasi poin pelanggaran siswa mencapai 100 poin, sistem otomatis membekukan siswa dari kandidat wawancara Mensetsu.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5C700] bg-[#FFE11D] px-3.5 py-1.5 text-[12px] font-extrabold text-[#111215] shadow-2xs">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Batas Lock: {MAX_VIOLATION_POINTS_THRESHOLD} Poin</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((rm) => {
            const pct = Math.min(
              100,
              Math.round((rm.occupiedCount / rm.capacity) * 100)
            );
            const isFull = rm.occupiedCount >= rm.capacity;
            const remainingBeds = Math.max(0, rm.capacity - rm.occupiedCount);
            return (
              <div
                key={rm.id}
                className="group rounded-2xl border border-[#E4E7EC] bg-[#F9FAFB] p-4 transition-all hover:border-[#CFD4E0] hover:bg-[#FFFFFF] hover:shadow-[0_6px_20px_rgba(16,24,40,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#141518] font-mono text-[11px] font-extrabold text-[#FFE11D]">
                      {rm.roomCode}
                    </span>
                    <div>
                      <div className="text-[14px] font-extrabold text-[#111317]">
                        Kamar {rm.roomCode}
                      </div>
                      <div className="text-[11px] font-medium text-[#666C78]">
                        {rm.buildingName}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold tracking-wider ${
                      rm.genderZone === "PUTRA"
                        ? "border-[#B2DDFF] bg-[#EFF8FF] text-[#175CD3]"
                        : "border-[#FCCEEE] bg-[#FDF2FA] text-[#C11574]"
                    }`}
                  >
                    {rm.genderZone}
                  </span>
                </div>

                <div className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E4E7EC] p-[1px]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFull ? "bg-[#D92D20]" : "bg-[#FFE11D]"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11.5px] font-bold">
                  <span className="font-mono text-[#344054]">
                    Terisi: {rm.occupiedCount}/{rm.capacity} Siswa
                  </span>
                  <span
                    className={
                      isFull ? "text-[#D92D20]" : "text-[#067647]"
                    }
                  >
                    {isFull ? "Penuh" : `Sisa ${remainingBeds} Bed`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {feedbackMsg && (
          <div
            className={`mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[12.5px] font-bold ${
              feedbackMsg.includes("PERINGATAN CROSS-ROLE LOCK")
                ? "border border-[#FDA29B] bg-[#FEF3F2] text-[#B42318]"
                : "border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
            }`}
          >
            <span>{feedbackMsg}</span>
            <button
              type="button"
              onClick={() => setFeedbackMsg(null)}
              className="rounded-md px-2 py-0.5 text-[11.5px] font-extrabold hover:bg-black/5 cursor-pointer"
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
              <div>
                <h3 className={styles.surfaceCardTitle}>
                  Daftar Data Induk Siswa & Akumulasi Poin Asrama
                </h3>
                <p className="mt-0.5 text-[12px] text-[#666C78]">
                  Klik baris siswa untuk memilih target pencatatan disiplin atau melihat kartu data induk.
                </p>
              </div>
              <span className="rounded-lg bg-[#F2F4F7] border border-[#E4E7EC] px-2.5 py-1 font-mono text-[11px] font-bold text-[#344054]">
                {students.length} Siswa Terdaftar
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E4E7EC] text-[10.5px] font-extrabold uppercase tracking-wider text-[#667085]">
                    <th className="pb-3 pr-3">Siswa & NIS</th>
                    <th className="pb-3 pr-3">Plotting Kamar</th>
                    <th className="pb-3 pr-3">Poin Pelanggaran</th>
                    <th className="pb-3 pr-3">Status Mensetsu</th>
                    <th className="pb-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F4F7] text-[12.5px]">
                  {students.map((st) => {
                    const isSuspended = st.studentStatus === "SUSPENDED";
                    const isSelected = st.id === activeSelectedStudent?.id;
                    const pct = Math.min(100, st.violationPoints);
                    return (
                      <tr
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#FFFAEB]/90"
                            : "hover:bg-[#F9FAFB]"
                        }`}
                      >
                        <td className="py-3.5 pr-3 pl-1">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg font-mono text-[11.5px] font-extrabold ${
                                isSelected
                                  ? "bg-[#141518] text-[#FFE11D] shadow-2xs"
                                  : "bg-[#F2F4F7] text-[#344054]"
                              }`}
                            >
                              {getInitials(st.fullName)}
                            </div>
                            <div>
                              <div className="font-extrabold text-[#111317]">
                                {st.fullName}
                              </div>
                              <div className="font-mono text-[11px] font-medium text-[#666C78]">
                                {st.nis || "Calon Siswa"} • {st.phoneParent} (Wali)
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 pr-3">
                          <select
                            aria-label={`Kamar asrama ${st.fullName}`}
                            value={st.dormitoryRoomId}
                            onChange={(e) =>
                              onAssignRoom(st.id, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                            className={styles.tableSelect}
                          >
                            <option value="">Belum Plotting</option>
                            {rooms.map((r) => (
                              <option key={r.id} value={r.id}>
                                Kamar {r.roomCode} ({r.genderZone})
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono text-[13px] font-extrabold ${
                                isSuspended
                                  ? "text-[#D92D20]"
                                  : st.violationPoints >= 60
                                  ? "text-[#D97706]"
                                  : "text-[#111317]"
                              }`}
                            >
                              {st.violationPoints}/100
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 w-24 overflow-hidden rounded-full bg-[#E4E7EC]">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                isSuspended
                                  ? "bg-[#D92D20]"
                                  : st.violationPoints >= 60
                                  ? "bg-[#F59E0B]"
                                  : "bg-[#17B26A]"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>

                        <td className="py-3.5 pr-3">
                          {isSuspended ? (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-[#FDA29B] bg-[#FEF3F2] px-2.5 py-1 text-[11px] font-extrabold text-[#B42318]">
                              🔒 SUSPENDED
                            </span>
                          ) : st.ppdbStatus === "MENUNGGU_SELEKSI" ? (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-[#E4E7EC] bg-[#F2F4F7] px-2.5 py-1 text-[11px] font-bold text-[#475467]">
                              Menunggu PPDB
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-[#ABEFC6] bg-[#ECFDF3] px-2.5 py-1 text-[11px] font-extrabold text-[#067647]">
                              ✓ Disiplin Aman
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 text-right">
                          {st.violationPoints > 0 ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onResetRehabilitation(st.id);
                                setFeedbackMsg(
                                  `Siswa "${st.fullName}" telah menyelesaikan pembinaan. Poin di-reset ke 0 dan kunci Mensetsu dibuka kembali.`
                                );
                              }}
                              className={styles.btnSuccessSoft}
                              title="Putihkan poin pelanggaran ke 0"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                aria-hidden="true"
                              >
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                              </svg>
                              <span>Pemutihan</span>
                            </button>
                          ) : (
                            <span className="text-[11px] font-medium text-[#98A2B3]">
                              0 Poin
                            </span>
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
            <div className="flex items-center justify-between">
              <h3 className={styles.surfaceCardTitle}>
                Buku Log Pelanggaran Asrama Terbaru
              </h3>
              <span className="rounded-lg bg-[#FEF3F2] border border-[#FDA29B] px-2.5 py-0.5 font-mono text-[11px] font-extrabold text-[#B42318]">
                {violations.length} Catatan
              </span>
            </div>
            <div className="mt-3 divide-y divide-[#F2F4F7]">
              {violations.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between gap-3 py-3 text-[12.5px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FEF3F2] border border-[#FDA29B] font-mono text-[11px] font-extrabold text-[#D92D20]">
                      !
                    </div>
                    <div>
                      <div className="font-extrabold text-[#111317]">
                        {v.studentName}{" "}
                        <span className="rounded bg-[#F2F4F7] px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-[#475467]">
                          {v.studentNis || "PPDB"}
                        </span>
                      </div>
                      <div className="mt-0.5 font-medium text-[#344054]">
                        {v.violationTitle}
                      </div>
                      <div className="mt-0.5 text-[11px] font-medium text-[#667085]">
                        Dicatat oleh {v.recordedBy} • {v.occurredAt}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg border border-[#FDA29B] bg-[#FEF3F2] px-2.5 py-1 font-mono text-[12px] font-extrabold text-[#B42318]">
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
                <div className="flex items-center justify-between border-b border-[#ECEEF2] pb-3">
                  <div>
                    <h3 className={styles.surfaceCardTitle}>
                      Catat Poin Pelanggaran Disiplin
                    </h3>
                    <p className="mt-0.5 text-[12px] text-[#666C78]">
                      Target siswa:{" "}
                      <strong className="text-[#111317]">
                        {activeSelectedStudent.fullName}
                      </strong>
                    </p>
                  </div>
                  <span className="rounded-lg bg-[#141518] px-2.5 py-1 font-mono text-[11.5px] font-extrabold text-[#FFE11D]">
                    {activeSelectedStudent.violationPoints}/100 Poin
                  </span>
                </div>

                {/* Preset Quick-Select Chips */}
                <div className="mt-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-2">
                    Template Pelanggaran Cepat
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {VIOLATION_PRESETS.map((preset) => {
                      const isPresetActive =
                        violationTitle === preset.label &&
                        violationPoints === preset.points;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleApplyPreset(preset)}
                          className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                            isPresetActive
                              ? "border-[#141518] bg-[#FFFAEB] shadow-[0_2px_8px_rgba(20,21,24,0.08)]"
                              : "border-[#E4E7EC] bg-[#F9FAFB] hover:border-[#CFD4E0] hover:bg-[#FFFFFF]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-extrabold ${
                                preset.category === "BERAT"
                                  ? "bg-[#FEE4E2] text-[#B42318]"
                                  : preset.category === "SEDANG"
                                  ? "bg-[#FEF0C7] text-[#B54708]"
                                  : "bg-[#E4E7EC] text-[#344054]"
                              }`}
                            >
                              +{preset.points} PT
                            </span>
                            <span className="text-[9.5px] font-bold text-[#667085]">
                              {preset.category}
                            </span>
                          </div>
                          <div className="text-[11.5px] font-bold leading-snug text-[#111317]">
                            {preset.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmitViolation}
                  className="mt-4 space-y-3.5"
                >
                  <div>
                    <label className={styles.formLabel}>
                      Deskripsi Pelanggaran Asrama
                    </label>
                    <input
                      type="text"
                      required
                      value={violationTitle}
                      onChange={(e) => setViolationTitle(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={styles.formLabel}>
                        Kategori Sanksi
                      </label>
                      <select
                        value={violationCategory}
                        onChange={(e) =>
                          setViolationCategory(
                            e.target.value as "RINGAN" | "SEDANG" | "BERAT"
                          )
                        }
                        className={styles.formSelect}
                      >
                        <option value="RINGAN">Ringan (10-20 Poin)</option>
                        <option value="SEDANG">Sedang (25-40 Poin)</option>
                        <option value="BERAT">Berat (50-100 Poin)</option>
                      </select>
                    </div>
                    <div>
                      <label className={styles.formLabel}>
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
                        className={`${styles.formInput} font-mono font-bold`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${
                      willTriggerLock
                        ? "inline-flex items-center justify-center gap-2 rounded-xl bg-[#D92D20] px-4 py-2.5 text-[13px] font-extrabold text-[#FFFFFF] border border-[#B42318] shadow-[0_4px_14px_rgba(217,45,32,0.3)] transition-all hover:bg-[#B42318] active:scale-[0.98] cursor-pointer"
                        : styles.btnPrimaryDark
                    }`}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>
                      {willTriggerLock
                        ? `Rekam & Bekukan Siswa (+${violationPoints} Poin -> ${projectedNextPoints}/100)`
                        : `Rekam Poin Pelanggaran (+${violationPoints} Poin)`}
                    </span>
                  </button>
                </form>
              </div>

              {/* Detail Biodata Induk Card */}
              <div className={styles.surfaceCard}>
                <div className="flex items-center justify-between border-b border-[#ECEEF2] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#141518] font-mono text-[12px] font-extrabold text-[#FFE11D]">
                      {getInitials(activeSelectedStudent.fullName)}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-[#111317]">
                        Kartu Data Induk Siswa
                      </h3>
                      <p className="text-[11px] font-medium text-[#666C78]">
                        {activeSelectedStudent.batchName}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-md bg-[#FFE11D]/40 border border-[#E5C700]/50 px-2 py-0.5 text-[10.5px] font-extrabold text-[#111215]">
                    {activeSelectedStudent.targetProgram.replace("_", " ")}
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5 text-[12.5px]">
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-2">
                    <span className="font-medium text-[#667085]">Nama Lengkap</span>
                    <span className="font-extrabold text-[#111317]">
                      {activeSelectedStudent.fullName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-2">
                    <span className="font-medium text-[#667085]">NIS / NIK</span>
                    <span className="rounded bg-[#F2F4F7] px-2 py-0.5 font-mono text-[11.5px] font-bold text-[#111317]">
                      {activeSelectedStudent.nis || "PPDB"} / {activeSelectedStudent.nik}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-2">
                    <span className="font-medium text-[#667085]">Tempat, Tgl Lahir</span>
                    <span className="font-bold text-[#111317]">
                      {activeSelectedStudent.birthPlace}, {activeSelectedStudent.birthDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-2">
                    <span className="font-medium text-[#667085]">Pendidikan</span>
                    <span className="font-bold text-[#111317]">
                      {activeSelectedStudent.educationLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F2F4F7] pb-2">
                    <span className="font-medium text-[#667085]">Wali & WA Ortu</span>
                    <span className="font-bold text-[#111317]">
                      {activeSelectedStudent.parentName} ({activeSelectedStudent.phoneParent})
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#F9FAFB] border border-[#E4E7EC] p-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                      Alamat Domisili KTP
                    </span>
                    <p className="mt-0.5 font-semibold text-[#1E2028]">
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
