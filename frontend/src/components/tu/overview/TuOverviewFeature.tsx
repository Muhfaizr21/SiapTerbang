"use client";

import { useState } from "react";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type {
  MonthlyIntakeStat,
  ScheduleTaskItem,
  StudentRecord,
  TuMenuTab,
} from "@/types/tu";
import { computeDashboardMetrics } from "@/services/tu-domain-engine";

interface TuOverviewFeatureProps {
  readonly students: readonly StudentRecord[];
  readonly monthlyStats: readonly MonthlyIntakeStat[];
  readonly scheduleTasks: readonly ScheduleTaskItem[];
  readonly onToggleTask: (taskId: string) => void;
  readonly onNavigateTab: (tab: TuMenuTab) => void;
}

const WEEK_DAYS = [
  { dayLabel: "Mon", dateNum: 14 },
  { dayLabel: "Tue", dateNum: 15 },
  { dayLabel: "Wed", dateNum: 16 },
  { dayLabel: "Thu", dateNum: 17 },
  { dayLabel: "Fri", dateNum: 18 },
  { dayLabel: "Sat", dateNum: 19 },
  { dayLabel: "Sun", dateNum: 20 },
] as const;

export function TuOverviewFeature({
  students,
  monthlyStats,
  scheduleTasks,
  onToggleTask,
  onNavigateTab,
}: TuOverviewFeatureProps) {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(6); // July active by default like Axiom ref
  const [selectedDateNum, setSelectedDateNum] = useState<number>(18);
  const [chartPeriod, setChartPeriod] = useState<"Month" | "Batch">("Month");

  const metrics = computeDashboardMetrics(students);
  const maxBarValue = Math.max(
    ...monthlyStats.map((m) => m.ppdbGraduated),
    50
  );

  return (
    <div>
      {/* Row 1: 4 Metric Summary Cards matching Axiom Reference */}
      <div className={styles.kpiGrid}>
        {/* Card 1 */}
        <div
          className={styles.kpiCard}
          onClick={() => onNavigateTab("ppdb")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("ppdb")}
        >
          <div className={styles.kpiCardTop}>
            <span className={styles.kpiCardLabel}>Total Siswa & PPDB</span>
            <div className={styles.kpiCardIconCircle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className={styles.kpiCardValue}>
            {students.length} Kandidat
          </div>
          <div className={styles.kpiTrendRow}>
            <span className="inline-flex items-center gap-1 rounded bg-[#e8f8ec] px-1.5 py-0.5 font-semibold text-[#188633]">
              +{metrics.totalApplicantsWaiting} PPDB Baru
            </span>
            <span className="text-[#8a8f99]">menunggu seleksi fisik</span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className={styles.kpiCard}
          onClick={() => onNavigateTab("asrama")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("asrama")}
        >
          <div className={styles.kpiCardTop}>
            <span className={styles.kpiCardLabel}>Siswa Aktif (Ber-NIS)</span>
            <div className={styles.kpiCardIconCircle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className={styles.kpiCardValue}>
            {metrics.activeStudentsCount} Siswa
          </div>
          <div className={styles.kpiTrendRow}>
            <span className="inline-flex items-center gap-1 rounded bg-[#e8f8ec] px-1.5 py-0.5 font-semibold text-[#188633]">
              100% Terbit NIS
            </span>
            <span className="text-[#8a8f99]">sinkron modul Sensei</span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className={styles.kpiCard}
          onClick={() => onNavigateTab("pemberkasan")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("pemberkasan")}
        >
          <div className={styles.kpiCardTop}>
            <span className={styles.kpiCardLabel}>Berkas Menunggu Cek</span>
            <div className={styles.kpiCardIconCircle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
          </div>
          <div className={styles.kpiCardValue}>
            {metrics.pendingDocsVerificationCount} Berkas
          </div>
          <div className={styles.kpiTrendRow}>
            <span className="inline-flex items-center gap-1 rounded bg-[#e8f8ec] px-1.5 py-0.5 font-semibold text-[#188633]">
              {metrics.docCompletionPercentage}% Valid
            </span>
            <span className="text-[#8a8f99]">dari 7 berkas wajib</span>
          </div>
        </div>

        {/* Card 4 */}
        <div
          className={styles.kpiCard}
          onClick={() => onNavigateTab("pemberkasan")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNavigateTab("pemberkasan")}
        >
          <div className={styles.kpiCardTop}>
            <span className={styles.kpiCardLabel}>Peringatan H-30 & Disiplin</span>
            <div className={styles.kpiCardIconCircle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <div className={styles.kpiCardValue}>
            {metrics.expiringH30Count} Alert
          </div>
          <div className={styles.kpiTrendRow}>
            <span className="inline-flex items-center gap-1 rounded bg-[#fdeceb] px-1.5 py-0.5 font-semibold text-[#c93b2b]">
              {metrics.suspendedStudentsCount} Suspended
            </span>
            <span className="text-[#8a8f99]">Paspor/MCU H-30 & Asrama</span>
          </div>
        </div>
      </div>

      {/* Row 2 & 3: Main 12-Col Bento Grid matching Axiom Reference */}
      <div className={styles.bentoGrid}>
        {/* Left 7 Columns */}
        <div className={styles.bentoLeftCol}>
          {/* Bar Chart Card ("Sales Overview" equivalent -> "Statistik Kelulusan PPDB & Pemberkasan") */}
          <div className={styles.surfaceCard}>
            <div className={styles.surfaceCardHeader}>
              <div>
                <h2 className={styles.surfaceCardTitle}>
                  Statistik PPDB & Pemberkasan Siswa
                </h2>
                <p className="mt-0.5 text-[12px] text-[#666C78]">
                  Klik batang bulan untuk melihat detail kelulusan NIS dan berkas legalitas
                </p>
              </div>
              <div className={styles.segmentedTrack}>
                <button
                  type="button"
                  onClick={() => setChartPeriod("Month")}
                  className={
                    chartPeriod === "Month"
                      ? styles.segmentedTabActive
                      : styles.segmentedTab
                  }
                >
                  Bulanan (2026)
                </button>
                <button
                  type="button"
                  onClick={() => setChartPeriod("Batch")}
                  className={
                    chartPeriod === "Batch"
                      ? styles.segmentedTabActive
                      : styles.segmentedTab
                  }
                >
                  Per Angkatan
                </button>
              </div>
            </div>

            {/* Y-Axis Hint + 12 Yellow Bars */}
            <div className="flex gap-3">
              <div className="flex flex-col justify-between pb-6 pt-9 text-[11px] font-medium text-[#9ca1ab]">
                <span>50</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>

              <div className={`flex-1 ${styles.chartBarsContainer}`}>
                {monthlyStats.map((item, idx) => {
                  const isSelected = idx === selectedMonthIdx;
                  const heightPercent = Math.max(
                    16,
                    Math.min(100, Math.round((item.ppdbGraduated / maxBarValue) * 100))
                  );
                  return (
                    <div
                      key={item.monthLabel}
                      className={styles.chartBarColumn}
                      onClick={() => setSelectedMonthIdx(idx)}
                      onMouseEnter={() => setSelectedMonthIdx(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Statistik bulan ${item.monthLabel}`}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setSelectedMonthIdx(idx)
                      }
                    >
                      {isSelected && (
                        <div className={styles.chartFloatingTooltip}>
                          <div>
                            <div className="text-[10px] text-[#9ca1ab]">
                              Lulus PPDB
                            </div>
                            <div className="text-[13px] font-bold text-[#ffffff]">
                              {item.ppdbGraduated} Siswa
                            </div>
                          </div>
                          <div className="border-l border-[#2e3138] pl-3">
                            <div className="text-[10px] text-[#9ca1ab]">
                              7 Berkas Valid
                            </div>
                            <div className="text-[13px] font-bold text-[#ffe11d]">
                              {item.docsVerified} Siswa
                            </div>
                          </div>
                        </div>
                      )}

                      <div className={styles.chartBarTrack}>
                        <div
                          className={styles.chartBarFill}
                          style={{
                            height: `${heightPercent}%`,
                            opacity: isSelected ? 1 : 0.82,
                          }}
                        />
                      </div>
                      <span
                        className={`text-[11.5px] ${
                          isSelected
                            ? "font-bold text-[#141518]"
                            : "font-medium text-[#8c919c]"
                        }`}
                      >
                        {item.monthLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom-Left Card ("Platform Performance" equivalent -> Dual Thick Yellow Progress Bars) */}
          <div className={styles.surfaceCard}>
            <div className={styles.surfaceCardHeader}>
              <h2 className={styles.surfaceCardTitle}>
                Kepatuhan Berkas Legalitas & Disiplin Asrama
              </h2>
              <button
                type="button"
                onClick={() => onNavigateTab("pemberkasan")}
                className={styles.btnGhostSubtle}
              >
                <span>Lihat Detail</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Metric 1: Kelengkapan 7 Berkas */}
              <div>
                <p className="text-[13px] font-medium text-[#72767f]">
                  Kelengkapan 7 Berkas Wajib
                </p>
                <div className="mt-1.5 text-[32px] font-extrabold tracking-tight text-[#141518]">
                  {metrics.docCompletionPercentage.toFixed(2)}%
                </div>
                <div className={styles.thickYellowBarTrack}>
                  <div
                    className={styles.thickYellowBarFill}
                    style={{
                      width: `${Math.min(100, Math.max(12, metrics.docCompletionPercentage))}%`,
                    }}
                  />
                </div>
                <p className="text-[12px] text-[#72767f]">
                  <span className="font-bold text-[#188633]">+8.4%</span> dari
                  bulan lalu (KTP, Paspor, MCU, ID CPMI)
                </p>
              </div>

              {/* Metric 2: Kepatuhan Disiplin Asrama */}
              <div>
                <p className="text-[13px] font-medium text-[#72767f]">
                  Kepatuhan Disiplin Asrama (&lt;100 Poin)
                </p>
                <div className="mt-1.5 text-[32px] font-extrabold tracking-tight text-[#141518]">
                  {metrics.dormDisciplineComplianceRate.toFixed(2)}%
                </div>
                <div className={styles.thickYellowBarTrack}>
                  <div
                    className={styles.thickYellowBarFill}
                    style={{
                      width: `${Math.min(100, Math.max(12, metrics.dormDisciplineComplianceRate))}%`,
                    }}
                  />
                </div>
                <p className="text-[12px] text-[#72767f]">
                  <span className="font-bold text-[#188633]">
                    {metrics.suspendedStudentsCount === 0
                      ? "0 Terkunci"
                      : `${metrics.suspendedStudentsCount} Suspended`}
                  </span>{" "}
                  dari daftar kandidat Mensetsu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns */}
        <div className={styles.bentoRightCol}>
          {/* Calendar Card matching Axiom "January 2022" */}
          <div className={styles.surfaceCard}>
            <div className={styles.surfaceCardHeader}>
              <h2 className={styles.surfaceCardTitle}>November 2026</h2>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Minggu sebelumnya"
                  onClick={() =>
                    setSelectedDateNum((prev) => (prev > 14 ? prev - 1 : 20))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#eceef2] text-[13px] text-[#555962] hover:bg-[#f4f5f8]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Minggu berikutnya"
                  onClick={() =>
                    setSelectedDateNum((prev) => (prev < 20 ? prev + 1 : 14))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#eceef2] text-[13px] text-[#555962] hover:bg-[#f4f5f8]"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEK_DAYS.map((d) => {
                const isActive = d.dateNum === selectedDateNum;
                return (
                  <div
                    key={d.dayLabel}
                    className="flex flex-col items-center gap-2.5"
                  >
                    <span className="text-[11.5px] font-medium text-[#8a8f99]">
                      {d.dayLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedDateNum(d.dateNum)}
                      className={
                        isActive
                          ? styles.calendarDayCircleActive
                          : styles.calendarDayCircle
                      }
                    >
                      {d.dateNum}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Schedule / Antrean Tugas Harian Admin TU */}
          <div className={styles.surfaceCard}>
            <div className={styles.surfaceCardHeader}>
              <h2 className={styles.surfaceCardTitle}>
                Antrean Prioritas Admin TU
              </h2>
              <span className="rounded-full bg-[#f4f5f8] px-2.5 py-1 text-[11px] font-bold text-[#363942]">
                {scheduleTasks.filter((t) => !t.completed).length} Aktif
              </span>
            </div>

            <div className="divide-y divide-[#f1f2f5]">
              {scheduleTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start justify-between gap-3 py-3 transition-colors ${
                    task.completed ? "bg-[#fafbfc]/70" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(task.id)}
                      aria-label={`Tandai tugas ${task.title}`}
                      className="mt-1 h-4 w-4 rounded border-[#cfd3dc] accent-[#141518]"
                    />
                    <div className="w-[82px] shrink-0">
                      <div className="text-[11px] font-medium text-[#8a8f99]">
                        {task.dateLabel}
                      </div>
                      <div className="text-[12.5px] font-bold text-[#141518]">
                        {task.timeLabel}
                      </div>
                    </div>
                    <div>
                      <div
                        className={`text-[13.5px] font-bold ${
                          task.completed
                            ? "line-through text-[#8a8f99]"
                            : "text-[#141518]"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[12px] text-[#7c8089]">
                        {task.subtitle}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigateTab(task.targetTab)}
                    className={styles.btnSecondaryOutline}
                  >
                    <span>Buka</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
