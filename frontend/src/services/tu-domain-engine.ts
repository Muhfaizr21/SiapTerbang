import type {
  MandatoryDocType,
  StudentDocItem,
  StudentLifecycleStatus,
  StudentRecord,
} from "@/types/tu";

export const MAX_VIOLATION_POINTS_THRESHOLD = 100;
export const EXPIRY_WARNING_THRESHOLD_DAYS = 30;

export const MANDATORY_DOCUMENT_META: readonly {
  readonly docType: MandatoryDocType;
  readonly label: string;
  readonly requiresExpiry: boolean;
}[] = [
  { docType: "KTP", label: "KTP Elektronik", requiresExpiry: false },
  { docType: "KK", label: "Kartu Keluarga (KK)", requiresExpiry: false },
  { docType: "AKTA", label: "Akta Kelahiran", requiresExpiry: false },
  { docType: "IJAZAH", label: "Ijazah Terakhir", requiresExpiry: false },
  { docType: "PASPOR", label: "Paspor RI (48 Hal)", requiresExpiry: true },
  { docType: "MCU", label: "Sertifikat MCU Klinik", requiresExpiry: true },
  { docType: "ID_CPMI", label: "ID CPMI Disnaker/BP2MI", requiresExpiry: false },
] as const;

export function calculateBMI(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) {
    return 0;
  }
  const heightMeters = heightCm / 100;
  const raw = weightKg / (heightMeters * heightMeters);
  return Math.round(raw * 10) / 10;
}

export function getBMICategoryLabel(bmi: number): {
  readonly label: string;
  readonly tone: "ideal" | "warn" | "danger";
} {
  if (bmi <= 0) {
    return { label: "Belum Diukur", tone: "warn" };
  }
  if (bmi >= 18.5 && bmi <= 25.0) {
    return { label: "Ideal Standar Jepang", tone: "ideal" };
  }
  if (bmi > 25.0 && bmi <= 27.5) {
    return { label: "Overweight Ringan", tone: "warn" };
  }
  return { label: "Perlu Pembinaan Fisik", tone: "danger" };
}

export function evaluateDisciplineLock(violationPoints: number): {
  readonly studentStatus: StudentLifecycleStatus;
  readonly lockedFromMensetsu: boolean;
} {
  if (violationPoints >= MAX_VIOLATION_POINTS_THRESHOLD) {
    return {
      studentStatus: "SUSPENDED",
      lockedFromMensetsu: true,
    };
  }
  return {
    studentStatus: "AKTIF",
    lockedFromMensetsu: false,
  };
}

export interface ExpiryEvaluation {
  readonly hasExpiry: boolean;
  readonly daysRemaining: number | null;
  readonly isExpiringH30: boolean;
  readonly isExpired: boolean;
  readonly badgeText: string;
}

export function evaluateExpiryStatus(
  expiryDateISO: string,
  referenceDate: Date = new Date("2026-11-18T00:00:00Z")
): ExpiryEvaluation {
  const trimmed = expiryDateISO.trim();
  if (!trimmed) {
    return {
      hasExpiry: false,
      daysRemaining: null,
      isExpiringH30: false,
      isExpired: false,
      badgeText: "Permanen",
    };
  }

  const expTime = new Date(`${trimmed}T00:00:00Z`).getTime();
  if (Number.isNaN(expTime)) {
    return {
      hasExpiry: false,
      daysRemaining: null,
      isExpiringH30: false,
      isExpired: false,
      badgeText: "-",
    };
  }

  const refDayStart = Date.UTC(
    referenceDate.getUTCFullYear(),
    referenceDate.getUTCMonth(),
    referenceDate.getUTCDate()
  );
  const diffDays = Math.round((expTime - refDayStart) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      hasExpiry: true,
      daysRemaining: diffDays,
      isExpiringH30: true,
      isExpired: true,
      badgeText: `Kedaluwarsa (${Math.abs(diffDays)} hr lalu)`,
    };
  }

  if (diffDays <= EXPIRY_WARNING_THRESHOLD_DAYS) {
    return {
      hasExpiry: true,
      daysRemaining: diffDays,
      isExpiringH30: true,
      isExpired: false,
      badgeText: `H-${diffDays} Kedaluwarsa`,
    };
  }

  return {
    hasExpiry: true,
    daysRemaining: diffDays,
    isExpiringH30: false,
    isExpired: false,
    badgeText: `Aman (${diffDays} hari)`,
  };
}

export function calculateNetRefund(params: {
  readonly totalPaidIdr: number;
  readonly deductionMcuIdr: number;
  readonly deductionPassportIdr: number;
  readonly deductionUniformIdr: number;
  readonly deductionDormIdr: number;
}): {
  readonly totalDeductionsIdr: number;
  readonly netRefundIdr: number;
} {
  const totalDeductionsIdr =
    Math.max(0, params.deductionMcuIdr) +
    Math.max(0, params.deductionPassportIdr) +
    Math.max(0, params.deductionUniformIdr) +
    Math.max(0, params.deductionDormIdr);

  const netRefundIdr = Math.max(0, params.totalPaidIdr - totalDeductionsIdr);
  return { totalDeductionsIdr, netRefundIdr };
}

export function createInitialSevenDocuments(
  studentId: string,
  defaultStatus: "BELUM_UNGGAH" | "MENUNGGU" = "MENUNGGU"
): readonly StudentDocItem[] {
  return MANDATORY_DOCUMENT_META.map((meta, idx) => ({
    id: `doc-${studentId}-${idx + 1}`,
    docType: meta.docType,
    label: meta.label,
    documentNumber: "",
    status: defaultStatus,
    rejectionReason: "",
    expiryDate: "",
    verifiedBy: "",
    updatedAt: "2026-11-18",
  }));
}

export interface ComputedTuDashboardStats {
  readonly totalApplicantsWaiting: number;
  readonly activeStudentsCount: number;
  readonly suspendedStudentsCount: number;
  readonly pendingDocsVerificationCount: number;
  readonly expiringH30Count: number;
  readonly docCompletionPercentage: number;
  readonly dormDisciplineComplianceRate: number;
}

export function computeDashboardMetrics(
  students: readonly StudentRecord[]
): ComputedTuDashboardStats {
  let totalApplicantsWaiting = 0;
  let activeStudentsCount = 0;
  let suspendedStudentsCount = 0;
  let pendingDocsVerificationCount = 0;
  let expiringH30Count = 0;
  let totalDocs = 0;
  let validDocs = 0;
  let graduatedStudents = 0;
  let compliantStudents = 0;

  for (const st of students) {
    if (st.ppdbStatus === "MENUNGGU_SELEKSI") {
      totalApplicantsWaiting += 1;
    }
    if (st.studentStatus === "AKTIF") {
      activeStudentsCount += 1;
    }
    if (st.studentStatus === "SUSPENDED") {
      suspendedStudentsCount += 1;
    }
    if (st.ppdbStatus === "LULUS_SELEKSI" && st.studentStatus !== "OFFBOARDED") {
      graduatedStudents += 1;
      if (st.violationPoints < MAX_VIOLATION_POINTS_THRESHOLD) {
        compliantStudents += 1;
      }
    }

    for (const doc of st.documents) {
      totalDocs += 1;
      if (doc.status === "VALID") {
        validDocs += 1;
      }
      if (doc.status === "MENUNGGU") {
        pendingDocsVerificationCount += 1;
      }
      const exp = evaluateExpiryStatus(doc.expiryDate);
      if (exp.isExpiringH30) {
        expiringH30Count += 1;
      }
    }
  }

  const docCompletionPercentage =
    totalDocs > 0 ? Math.round((validDocs / totalDocs) * 10000) / 100 : 0;

  const dormDisciplineComplianceRate =
    graduatedStudents > 0
      ? Math.round((compliantStudents / graduatedStudents) * 10000) / 100
      : 100;

  return {
    totalApplicantsWaiting,
    activeStudentsCount,
    suspendedStudentsCount,
    pendingDocsVerificationCount,
    expiringH30Count,
    docCompletionPercentage,
    dormDisciplineComplianceRate,
  };
}

export function formatIdrCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildDisnakerCsv(students: readonly StudentRecord[]): string {
  const headers = [
    "NIS",
    "NIK",
    "Nama Lengkap",
    "Gender",
    "Tempat Tanggal Lahir",
    "Program Negara Tujuan",
    "Angkatan",
    "Kamar Asrama",
    "Poin Pelanggaran",
    "Kelengkapan 7 Berkas",
    "Status Siswa",
    "Kunci Mensetsu",
  ];

  const escapeCsvCell = (val: string): string => {
    const clean = val.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = students.map((st) => {
    const validCount = st.documents.filter((d) => d.status === "VALID").length;
    return [
      st.nis || "BELUM_TERBIT",
      st.nik,
      st.fullName,
      st.gender,
      `${st.birthPlace}, ${st.birthDate}`,
      st.targetProgram,
      st.batchName,
      st.dormitoryRoomCode,
      String(st.violationPoints),
      `${validCount}/7 Berkas Valid`,
      st.studentStatus,
      st.lockedFromMensetsu ? "TERKUNCI" : "TERBUKA",
    ]
      .map(escapeCsvCell)
      .join(",");
  });

  return [headers.map(escapeCsvCell).join(","), ...rows].join("\n");
}
