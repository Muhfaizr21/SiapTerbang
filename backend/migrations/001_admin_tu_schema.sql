-- ============================================================================
-- SIAPTERBANG MULTI-TENANT SCHEMA: ROLE 3 - ADMIN TATA USAHA (TU)
-- Enforces 100% Tenant Isolation (tenant_id) & Cross-Role Locks
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Dormitory Rooms (Manajemen Kamar Asrama)
CREATE TABLE IF NOT EXISTS public.dormitory_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    room_code VARCHAR(32) NOT NULL,
    building_name VARCHAR(64) NOT NULL,
    gender_zone VARCHAR(16) NOT NULL CHECK (gender_zone IN ('PUTRA', 'PUTRI')),
    capacity INT NOT NULL DEFAULT 8 CHECK (capacity > 0),
    occupied_count INT NOT NULL DEFAULT 0 CHECK (occupied_count >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, room_code)
);

-- 2. Students (Data Induk Siswa, PPDB & Cross-Role Locks)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    nis VARCHAR(32) UNIQUE,
    nik VARCHAR(16) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    gender VARCHAR(16) NOT NULL CHECK (gender IN ('LAKI_LAKI', 'PEREMPUAN')),
    birth_place VARCHAR(64) NOT NULL,
    birth_date DATE NOT NULL,
    phone_student VARCHAR(24) NOT NULL,
    parent_name VARCHAR(120) NOT NULL,
    phone_parent VARCHAR(24) NOT NULL,
    address TEXT NOT NULL,
    education_level VARCHAR(32) NOT NULL,
    target_program VARCHAR(32) NOT NULL CHECK (target_program IN ('MAGANG_JEPANG', 'TOKUTEI_GINOU', 'KOREA_G2G')),
    batch_name VARCHAR(64) NOT NULL,

    -- PPDB & Physical Selection
    ppdb_status VARCHAR(24) NOT NULL DEFAULT 'MENUNGGU_SELEKSI'
        CHECK (ppdb_status IN ('MENUNGGU_SELEKSI', 'LULUS_SELEKSI', 'DITOLAK')),
    height_cm NUMERIC(5,2) NOT NULL DEFAULT 0,
    weight_kg NUMERIC(5,2) NOT NULL DEFAULT 0,
    bmi_score NUMERIC(5,2) NOT NULL DEFAULT 0,
    color_blind_status VARCHAR(24) NOT NULL DEFAULT 'NORMAL'
        CHECK (color_blind_status IN ('NORMAL', 'PARSIAL', 'TOTAL')),
    has_tattoo_or_piercing BOOLEAN NOT NULL DEFAULT FALSE,
    math_score INT NOT NULL DEFAULT 0 CHECK (math_score >= 0 AND math_score <= 100),

    -- Dormitory & Discipline Lock (Cross-Role Lock #1B: >= 100 pts -> SUSPENDED)
    dormitory_room_id UUID REFERENCES public.dormitory_rooms(id) ON DELETE SET NULL,
    violation_points INT NOT NULL DEFAULT 0 CHECK (violation_points >= 0),
    student_status VARCHAR(24) NOT NULL DEFAULT 'CALON_SISWA'
        CHECK (student_status IN ('CALON_SISWA', 'AKTIF', 'SUSPENDED', 'OFFBOARDED', 'ALUMNI')),
    locked_from_mensetsu BOOLEAN NOT NULL DEFAULT TRUE,
    portal_account_active BOOLEAN NOT NULL DEFAULT FALSE,
    initial_invoice_triggered BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, nik)
);

-- 3. Student Documents (7 Berkas Legalitas & H-30 Expiry Tracker)
CREATE TABLE IF NOT EXISTS public.student_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    doc_type VARCHAR(24) NOT NULL
        CHECK (doc_type IN ('KTP', 'KK', 'AKTA', 'IJAZAH', 'PASPOR', 'MCU', 'ID_CPMI')),
    document_number VARCHAR(64) DEFAULT '',
    file_url TEXT DEFAULT '',
    verification_status VARCHAR(24) NOT NULL DEFAULT 'BELUM_UNGGAH'
        CHECK (verification_status IN ('BELUM_UNGGAH', 'MENUNGGU', 'VALID', 'DITOLAK')),
    rejection_reason TEXT DEFAULT '',
    issued_date DATE,
    expiry_date DATE,
    verified_by VARCHAR(120) DEFAULT '',
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tenant_id, student_id, doc_type)
);

-- 4. Dormitory Violation Logs (Buku Poin Disiplin Asrama)
CREATE TABLE IF NOT EXISTS public.dormitory_violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    violation_title VARCHAR(160) NOT NULL,
    category VARCHAR(32) NOT NULL CHECK (category IN ('RINGAN', 'SEDANG', 'BERAT')),
    points_added INT NOT NULL CHECK (points_added > 0),
    recorded_by VARCHAR(120) NOT NULL,
    notes TEXT DEFAULT '',
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Official Letters (Generator Surat Resmi Berkop LPK)
CREATE TABLE IF NOT EXISTS public.official_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    letter_number VARCHAR(64) NOT NULL,
    letter_type VARCHAR(32) NOT NULL
        CHECK (letter_type IN ('PENGANTAR_PASPOR', 'REKOMENDASI_DISNAKER', 'IZIN_ORANG_TUA_KONTRAK')),
    destination_agency VARCHAR(160) NOT NULL,
    signer_name VARCHAR(120) NOT NULL,
    signer_role VARCHAR(64) NOT NULL,
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Offboarding & Refund Calculator Requests
CREATE TABLE IF NOT EXISTS public.offboarding_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    total_paid_idr BIGINT NOT NULL DEFAULT 0 CHECK (total_paid_idr >= 0),
    deduction_mcu_idr BIGINT NOT NULL DEFAULT 0 CHECK (deduction_mcu_idr >= 0),
    deduction_passport_idr BIGINT NOT NULL DEFAULT 0 CHECK (deduction_passport_idr >= 0),
    deduction_uniform_idr BIGINT NOT NULL DEFAULT 0 CHECK (deduction_uniform_idr >= 0),
    deduction_dorm_idr BIGINT NOT NULL DEFAULT 0 CHECK (deduction_dorm_idr >= 0),
    net_refund_idr BIGINT NOT NULL DEFAULT 0 CHECK (net_refund_idr >= 0),
    approval_status VARCHAR(32) NOT NULL DEFAULT 'MENUNGGU_DIREKTUR'
        CHECK (approval_status IN ('MENUNGGU_DIREKTUR', 'DISETUJUI_DIREKTUR', 'DICAIRKAN_KEUANGAN', 'DITOLAK')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Multi-Tenant Performance
CREATE INDEX IF NOT EXISTS idx_students_tenant_status ON public.students(tenant_id, student_status);
CREATE INDEX IF NOT EXISTS idx_student_docs_tenant_expiry ON public.student_documents(tenant_id, expiry_date);
CREATE INDEX IF NOT EXISTS idx_violations_tenant_student ON public.dormitory_violations(tenant_id, student_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.dormitory_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dormitory_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offboarding_requests ENABLE ROW LEVEL SECURITY;
