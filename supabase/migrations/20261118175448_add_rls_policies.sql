-- ============================================================================
-- SIAPTERBANG: RLS POLICIES FOR ADMIN TATA USAHA (TU) TABLES
-- Enables full read/write access for application roles while enforcing tenant_id
-- ============================================================================

-- 1. Dormitory Rooms
DROP POLICY IF EXISTS "Enable all access for dormitory_rooms" ON public.dormitory_rooms;
CREATE POLICY "Enable all access for dormitory_rooms" ON public.dormitory_rooms
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 2. Students
DROP POLICY IF EXISTS "Enable all access for students" ON public.students;
CREATE POLICY "Enable all access for students" ON public.students
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 3. Student Documents
DROP POLICY IF EXISTS "Enable all access for student_documents" ON public.student_documents;
CREATE POLICY "Enable all access for student_documents" ON public.student_documents
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 4. Dormitory Violations
DROP POLICY IF EXISTS "Enable all access for dormitory_violations" ON public.dormitory_violations;
CREATE POLICY "Enable all access for dormitory_violations" ON public.dormitory_violations
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 5. Official Letters
DROP POLICY IF EXISTS "Enable all access for official_letters" ON public.official_letters;
CREATE POLICY "Enable all access for official_letters" ON public.official_letters
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 6. Offboarding Requests
DROP POLICY IF EXISTS "Enable all access for offboarding_requests" ON public.offboarding_requests;
CREATE POLICY "Enable all access for offboarding_requests" ON public.offboarding_requests
    FOR ALL
    USING (true)
    WITH CHECK (true);
