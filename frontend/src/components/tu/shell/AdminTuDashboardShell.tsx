"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tuStyles as styles } from "@/components/tu/styles/tu-theme";
import type {
  DocVerificationStatus,
  DormitoryRoomRecord,
  MandatoryDocType,
  NewApplicantFormInput,
  OffboardingRecord,
  OfficialLetterRecord,
  OfficialLetterType,
  PhysicalSelectionFormInput,
  ScheduleTaskItem,
  StudentRecord,
  TuMenuTab,
  ViolationLogItem,
} from "@/types/tu";
import {
  INITIAL_SCHEDULE_TASKS,
  INITIAL_TU_LETTERS,
  INITIAL_TU_OFFBOARDINGS,
  INITIAL_TU_ROOMS,
  INITIAL_TU_STUDENTS,
  INITIAL_TU_VIOLATIONS,
  MONTHLY_INTAKE_STATS,
} from "@/domain/tu-initial-data";
import {
  calculateBMI,
  calculateNetRefund,
  computeDashboardMetrics,
  createInitialSevenDocuments,
  evaluateDisciplineLock,
} from "@/services/tu-domain-engine";
import { TuOverviewFeature } from "@/components/tu/overview/TuOverviewFeature";
import { TuPpdbFeature } from "@/components/tu/ppdb/TuPpdbFeature";
import { TuAsramaFeature } from "@/components/tu/asrama/TuAsramaFeature";
import { TuPemberkasanFeature } from "@/components/tu/pemberkasan/TuPemberkasanFeature";
import { TuSuratFeature } from "@/components/tu/surat/TuSuratFeature";
import { TuOffboardingFeature } from "@/components/tu/offboarding/TuOffboardingFeature";

export function AdminTuDashboardShell() {
  const [activeTab, setActiveTab] = useState<TuMenuTab>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [students, setStudents] =
    useState<readonly StudentRecord[]>(INITIAL_TU_STUDENTS);
  const [rooms, setRooms] =
    useState<readonly DormitoryRoomRecord[]>(INITIAL_TU_ROOMS);
  const [violations, setViolations] =
    useState<readonly ViolationLogItem[]>(INITIAL_TU_VIOLATIONS);
  const [letters, setLetters] =
    useState<readonly OfficialLetterRecord[]>(INITIAL_TU_LETTERS);
  const [offboardings, setOffboardings] = useState<
    readonly OffboardingRecord[]
  >(INITIAL_TU_OFFBOARDINGS);
  const [scheduleTasks, setScheduleTasks] = useState<
    readonly ScheduleTaskItem[]
  >(INITIAL_SCHEDULE_TASKS);
  const [nisCounter, setNisCounter] = useState<number>(1004);
  const [showNotifDrawer, setShowNotifDrawer] = useState<boolean>(false);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (st) =>
        st.fullName.toLowerCase().includes(q) ||
        st.nik.toLowerCase().includes(q) ||
        st.nis.toLowerCase().includes(q) ||
        st.batchName.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  const metrics = useMemo(() => computeDashboardMetrics(students), [students]);

  // Handler 1: Toggle Daily Schedule Task
  const handleToggleTask = (taskId: string) => {
    setScheduleTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Handler 2: Add PPDB Applicant
  const handleAddApplicant = (input: NewApplicantFormInput): string | null => {
    const cleanNik = input.nik.trim();
    if (students.some((s) => s.nik === cleanNik)) {
      return "NIK 16 digit sudah terdaftar pada LPK ini.";
    }

    const newId = `stu-00${students.length + 1}`;
    const newStudent: StudentRecord = {
      id: newId,
      tenantId: "tenant-lpk-nusantara",
      nis: "",
      nik: cleanNik,
      fullName: input.fullName.trim(),
      gender: input.gender,
      birthPlace: input.birthPlace.trim(),
      birthDate: input.birthDate,
      phoneStudent: input.phoneStudent.trim(),
      parentName: input.parentName.trim(),
      phoneParent: input.phoneParent.trim(),
      address: input.address.trim(),
      educationLevel: input.educationLevel.trim(),
      targetProgram: input.targetProgram,
      batchName: input.batchName.trim(),
      ppdbStatus: "MENUNGGU_SELEKSI",
      heightCm: input.heightCm,
      weightKg: input.weightKg,
      bmiScore: calculateBMI(input.heightCm, input.weightKg),
      colorBlindStatus: "NORMAL",
      hasTattooOrPiercing: false,
      mathScore: 0,
      dormitoryRoomId: "",
      dormitoryRoomCode: "-",
      violationPoints: 0,
      studentStatus: "CALON_SISWA",
      lockedFromMensetsu: true,
      portalAccountActive: false,
      initialInvoiceTriggered: false,
      totalPaidIdr: 1500000,
      documents: createInitialSevenDocuments(newId, "MENUNGGU"),
      createdAt: "2026-11-18",
    };

    setStudents((prev) => [newStudent, ...prev]);
    return null;
  };

  // Handler 3: Evaluate Physical Test & Activate Graduation (Cross-Role Lock #1A)
  const handleEvaluateAndActivate = (
    studentId: string,
    input: PhysicalSelectionFormInput
  ) => {
    let nextSeq = nisCounter;
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== studentId) return st;
        const bmi = calculateBMI(input.heightCm, input.weightKg);
        const isNewGraduation =
          input.approveGraduation && st.ppdbStatus !== "LULUS_SELEKSI";
        if (isNewGraduation) {
          nextSeq += 1;
        }
        return {
          ...st,
          heightCm: input.heightCm,
          weightKg: input.weightKg,
          bmiScore: bmi,
          colorBlindStatus: input.colorBlindStatus,
          hasTattooOrPiercing: input.hasTattooOrPiercing,
          mathScore: input.mathScore,
          ppdbStatus: input.approveGraduation ? "LULUS_SELEKSI" : st.ppdbStatus,
          nis: isNewGraduation ? `LPK-2026-${nextSeq}` : st.nis,
          studentStatus: input.approveGraduation ? "AKTIF" : st.studentStatus,
          lockedFromMensetsu: input.approveGraduation
            ? st.violationPoints >= 100
            : true,
          portalAccountActive: input.approveGraduation
            ? true
            : st.portalAccountActive,
          initialInvoiceTriggered: input.approveGraduation
            ? true
            : st.initialInvoiceTriggered,
        };
      })
    );
    setNisCounter(nextSeq);
  };

  // Handler 4: Assign Dormitory Room
  const handleAssignRoom = (studentId: string, roomId: string) => {
    const targetRoom = rooms.find((r) => r.id === roomId);
    setStudents((prev) =>
      prev.map((st) =>
        st.id === studentId
          ? {
              ...st,
              dormitoryRoomId: roomId,
              dormitoryRoomCode: targetRoom ? targetRoom.roomCode : "-",
            }
          : st
      )
    );
    if (targetRoom) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === roomId && r.occupiedCount < r.capacity
            ? { ...r, occupiedCount: r.occupiedCount + 1 }
            : r
        )
      );
    }
  };

  // Handler 5: Record Dormitory Violation (Cross-Role Lock #1B: >= 100 pts -> SUSPENDED)
  const handleRecordViolation = (
    studentId: string,
    title: string,
    category: "RINGAN" | "SEDANG" | "BERAT",
    points: number
  ) => {
    const targetStudent = students.find((s) => s.id === studentId);
    if (!targetStudent) return;

    const nextPoints = targetStudent.violationPoints + points;
    const lockEval = evaluateDisciplineLock(nextPoints);

    setStudents((prev) =>
      prev.map((st) =>
        st.id === studentId
          ? {
              ...st,
              violationPoints: nextPoints,
              studentStatus: lockEval.studentStatus,
              lockedFromMensetsu: lockEval.lockedFromMensetsu,
            }
          : st
      )
    );

    const newViolation: ViolationLogItem = {
      id: `vio-${violations.length + 1}`,
      studentId: targetStudent.id,
      studentName: targetStudent.fullName,
      studentNis: targetStudent.nis,
      violationTitle: title,
      category,
      pointsAdded: points,
      recordedBy: "Nadia Putri (Admin TU)",
      occurredAt: "2026-11-18 16:30 WIB",
    };

    setViolations((prev) => [newViolation, ...prev]);
  };

  // Handler 6: Reset Rehabilitation Points
  const handleResetRehabilitation = (studentId: string) => {
    setStudents((prev) =>
      prev.map((st) =>
        st.id === studentId
          ? {
              ...st,
              violationPoints: 0,
              studentStatus:
                st.ppdbStatus === "LULUS_SELEKSI" ? "AKTIF" : "CALON_SISWA",
              lockedFromMensetsu: st.ppdbStatus !== "LULUS_SELEKSI",
            }
          : st
      )
    );
  };

  // Handler 7: Update / Verify 7 Legal Documents
  const handleUpdateDocument = (params: {
    readonly studentId: string;
    readonly docType: MandatoryDocType;
    readonly documentNumber: string;
    readonly status: DocVerificationStatus;
    readonly rejectionReason: string;
    readonly expiryDate: string;
  }) => {
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== params.studentId) return st;
        return {
          ...st,
          documents: st.documents.map((d) =>
            d.docType === params.docType
              ? {
                  ...d,
                  documentNumber: params.documentNumber,
                  status: params.status,
                  rejectionReason: params.rejectionReason,
                  expiryDate: params.expiryDate,
                  verifiedBy: "Nadia Putri (TU)",
                  updatedAt: "2026-11-18",
                }
              : d
          ),
        };
      })
    );
  };

  // Handler 8: Create Official Letter
  const handleCreateLetter = (params: {
    readonly studentId: string;
    readonly letterType: OfficialLetterType;
    readonly destinationAgency: string;
    readonly signerName: string;
    readonly signerRole: string;
  }): OfficialLetterRecord | null => {
    const st = students.find((s) => s.id === params.studentId);
    if (!st) return null;

    const nextNum = String(letters.length + 42).padStart(3, "0");
    const created: OfficialLetterRecord = {
      id: `ltr-${letters.length + 1}`,
      studentId: st.id,
      studentName: st.fullName,
      studentNis: st.nis,
      studentNik: st.nik,
      letterNumber: `${nextNum}/TU-LPKN/XI/2026`,
      letterType: params.letterType,
      destinationAgency: params.destinationAgency,
      signerName: params.signerName,
      signerRole: params.signerRole,
      issuedDate: "2026-11-18",
    };

    setLetters((prev) => [created, ...prev]);
    return created;
  };

  // Handler 9: Submit Offboarding & Refund Request
  const handleSubmitOffboarding = (params: {
    readonly studentId: string;
    readonly reason: string;
    readonly totalPaidIdr: number;
    readonly deductionMcuIdr: number;
    readonly deductionPassportIdr: number;
    readonly deductionUniformIdr: number;
    readonly deductionDormIdr: number;
  }) => {
    const st = students.find((s) => s.id === params.studentId);
    if (!st) return;

    const calc = calculateNetRefund(params);
    const created: OffboardingRecord = {
      id: `off-${offboardings.length + 1}`,
      studentId: st.id,
      studentName: st.fullName,
      studentNis: st.nis,
      reason: params.reason,
      totalPaidIdr: params.totalPaidIdr,
      deductionMcuIdr: params.deductionMcuIdr,
      deductionPassportIdr: params.deductionPassportIdr,
      deductionUniformIdr: params.deductionUniformIdr,
      deductionDormIdr: params.deductionDormIdr,
      netRefundIdr: calc.netRefundIdr,
      approvalStatus: "MENUNGGU_DIREKTUR",
      createdAt: "2026-11-18",
    };

    setOffboardings((prev) => [created, ...prev]);
    setStudents((prev) =>
      prev.map((item) =>
        item.id === st.id
          ? {
              ...item,
              studentStatus: "OFFBOARDED",
              lockedFromMensetsu: true,
            }
          : item
      )
    );
  };

  return (
    <div className={styles.axiomWorkspaceRoot}>
      {/* Left Sidebar matching Axiom Reference */}
      <aside className={styles.axiomSidebar}>
        <div>
          {/* Top Brand Row */}
          <div className={styles.axiomBrandHeader}>
            <Link href="/" className={styles.axiomBrandIdentity}>
              <div className={styles.axiomLogoCircle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111215"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3 6 3.5-2.5 2.5-3-.5-1.5 1.5 4.2 1.8 1.8 4.2 1.5-1.5-.5-3 2.5-2.5 3.5 6 3-1.2c.5-.2.8-.6.7-1.1Z" />
                </svg>
              </div>
              <div>
                <div className={styles.axiomBrandTitle}>SiapTerbang</div>
                <div className="text-[10.5px] font-semibold text-[#8a8f99]">
                  Role 03 • Admin Tata Usaha
                </div>
              </div>
            </Link>

            <button
              type="button"
              aria-label="Ringkas menu sidebar"
              onClick={() => setActiveTab("overview")}
              className={styles.sidebarCollapseBtn}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
          </div>

          {/* Dark Search Input with ⌘K */}
          <div className={styles.sidebarSearchBox}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#777c87"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              aria-label="Cari siswa, NIS, atau NIK"
              className={styles.sidebarSearchInput}
            />
            <span className={styles.sidebarKbdBadge}>⌘K</span>
          </div>

          {/* MAIN MENU */}
          <div className={styles.sidebarSectionLabel}>MAIN MENU</div>
          <nav className={styles.sidebarNavList} aria-label="Menu Utama Admin TU">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={
                activeTab === "overview"
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
              }
            >
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span>Dashboard Overview</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ppdb")}
              className={
                activeTab === "ppdb"
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
              }
            >
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                <span>PPDB & Seleksi Awal</span>
              </span>
              <span
                className={
                  activeTab === "ppdb"
                    ? styles.sidebarMenuCountBadgeActive
                    : styles.sidebarMenuCountBadge
                }
              >
                {metrics.totalApplicantsWaiting}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("asrama")}
              className={
                activeTab === "asrama"
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
              }
            >
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Data Induk & Asrama</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pemberkasan")}
              className={
                activeTab === "pemberkasan"
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
              }
            >
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>7 Berkas & Expiry H-30</span>
              </span>
              <span
                className={
                  activeTab === "pemberkasan"
                    ? styles.sidebarMenuCountBadgeActive
                    : styles.sidebarMenuCountBadge
                }
              >
                {metrics.expiringH30Count}
              </span>
            </button>
          </nav>

          {/* SETTINGS & DOKUMEN DINAS */}
          <div className={styles.sidebarSectionLabel}>DOKUMEN & LAPORAN</div>
          <nav className={styles.sidebarNavList} aria-label="Menu Dokumen & Laporan">
            <button
              type="button"
              onClick={() => setActiveTab("surat")}
              className={
                activeTab === "surat"
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
              }
            >
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Generator Surat Resmi</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("offboarding")}
              className={
                activeTab === "offboarding"
                  ? styles.sidebarMenuItemActive
                  : styles.sidebarMenuItem
              }
            >
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Offboarding & Disnaker</span>
              </span>
            </button>

            <Link href="/login" className={styles.sidebarMenuItem}>
              <span className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Ganti Role / Portal</span>
              </span>
            </Link>
          </nav>
        </div>

        {/* Bottom Dark Card matching Axiom "UPCOMING EVENT" */}
        <div className={styles.sidebarUpcomingCard}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#777c87]">
            PERINGATAN H-30 TERDEKAT
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div>
              <div className="text-[13.5px] font-bold text-[#ffffff]">
                MCU & Paspor Siswa
              </div>
              <div className="text-[11px] text-[#9ca1ab]">
                10:00 WIB - 11:00 WIB
              </div>
            </div>
            <button
              type="button"
              aria-label="Buka peringatan dokumen H-30"
              onClick={() => setActiveTab("pemberkasan")}
              className={styles.sidebarYellowArrowBtn}
            >
              →
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className={styles.sidebarUpcomingTag}>Expiry H-30</span>
            <span className={styles.sidebarUpcomingTag}>
              {metrics.expiringH30Count} Dokumen
            </span>
          </div>
        </div>
      </aside>

      {/* Right Main White Rounded Canvas */}
      <main className={styles.axiomMainCanvas}>
        {/* Top Greeting Header Row */}
        <header className={styles.topHeaderRow}>
          <div>
            <h1 className={styles.greetingHeading}>
              Welcome back, Nadia Putri!
            </h1>
            <p className={styles.greetingSubtext}>
              Pantau metrik PPDB, 7 berkas legalitas, asrama, dan surat dinas LPK Nusantara Jaya secara real-time.
            </p>
          </div>

          <div className={styles.headerRightTools}>
            {/* Export Quick Action Button */}
            <button
              type="button"
              aria-label="Generator Surat Resmi"
              onClick={() => setActiveTab("surat")}
              className={styles.headerCircleBtn}
              title="Generator Surat Resmi"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifikasi peringatan H-30"
                onClick={() => setShowNotifDrawer((prev) => !prev)}
                className={styles.headerCircleBtn}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {metrics.expiringH30Count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c93b2b] text-[10px] font-bold text-[#ffffff]">
                    {metrics.expiringH30Count}
                  </span>
                )}
              </button>

              {showNotifDrawer && (
                <div className="absolute right-0 top-12 z-40 w-80 rounded-2xl border border-[#eceef2] bg-[#ffffff] p-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#f1f2f5] pb-2">
                    <span className="text-[13px] font-bold text-[#141518]">
                      Alert Center Admin TU
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowNotifDrawer(false)}
                      className="text-[11px] font-bold text-[#72767f]"
                    >
                      Tutup
                    </button>
                  </div>
                  <div className="mt-2.5 space-y-2 text-[12px]">
                    <div className="rounded-xl bg-[#fdeceb] p-2.5 text-[#9e2316]">
                      <strong>{metrics.expiringH30Count} Dokumen H-30:</strong>{" "}
                      Paspor Rizky Pratama (H-18) & MCU Aulia Rahmawati (H-11)
                      mendekati kedaluwarsa.
                    </div>
                    <div className="rounded-xl bg-[#fffbeb] p-2.5 text-[#92400e]">
                      <strong>{metrics.totalApplicantsWaiting} PPDB Baru:</strong>{" "}
                      Menunggu verifikasi fisik & penerbitan NIS.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className={styles.profilePill}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#141518] text-[13px] font-extrabold text-[#ffe11d]">
                NP
              </div>
              <div className="pr-1">
                <div className="text-[13px] font-bold leading-tight text-[#141518]">
                  Nadia Putri
                </div>
                <div className="text-[11px] text-[#777b84]">
                  tu@lpknusantara.siapterbang.id
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Active Feature Content */}
        {activeTab === "overview" && (
          <TuOverviewFeature
            students={filteredStudents}
            monthlyStats={MONTHLY_INTAKE_STATS}
            scheduleTasks={scheduleTasks}
            onToggleTask={handleToggleTask}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === "ppdb" && (
          <TuPpdbFeature
            students={filteredStudents}
            onAddApplicant={handleAddApplicant}
            onEvaluateAndActivate={handleEvaluateAndActivate}
          />
        )}

        {activeTab === "asrama" && (
          <TuAsramaFeature
            students={filteredStudents}
            rooms={rooms}
            violations={violations}
            onAssignRoom={handleAssignRoom}
            onRecordViolation={handleRecordViolation}
            onResetRehabilitation={handleResetRehabilitation}
          />
        )}

        {activeTab === "pemberkasan" && (
          <TuPemberkasanFeature
            students={filteredStudents}
            onUpdateDocument={handleUpdateDocument}
          />
        )}

        {activeTab === "surat" && (
          <TuSuratFeature
            students={filteredStudents}
            letters={letters}
            onCreateLetter={handleCreateLetter}
          />
        )}

        {activeTab === "offboarding" && (
          <TuOffboardingFeature
            students={filteredStudents}
            offboardings={offboardings}
            onSubmitOffboarding={handleSubmitOffboarding}
          />
        )}
      </main>
    </div>
  );
}
