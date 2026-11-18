package tu_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	offboardingModel "siapterbang-backend/internal/models/tu/offboarding"
	overviewModel "siapterbang-backend/internal/models/tu/overview"
	ppdbModel "siapterbang-backend/internal/models/tu/ppdb"
	"siapterbang-backend/internal/routes"
	"siapterbang-backend/internal/services/tu/store"
)

func setupTestMux() *http.ServeMux {
	ds := store.NewTuDataStore()
	tuCtrls := routes.NewTuControllers(ds)
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/tu/summary", tuCtrls.Overview.GetSummary)
	mux.HandleFunc("POST /api/v1/tu/ppdb", tuCtrls.PPDB.RegisterApplicant)
	mux.HandleFunc("POST /api/v1/tu/students/{id}/activate", tuCtrls.PPDB.ActivateStudent)
	mux.HandleFunc("POST /api/v1/tu/students/{id}/violations", tuCtrls.Asrama.RecordViolation)
	mux.HandleFunc("POST /api/v1/tu/students/{id}/dormitory", tuCtrls.Asrama.AssignDormitory)
	mux.HandleFunc("PATCH /api/v1/tu/students/{id}/documents", tuCtrls.Pemberkasan.VerifyDocument)
	mux.HandleFunc("POST /api/v1/tu/letters", tuCtrls.Surat.GenerateLetter)
	mux.HandleFunc("POST /api/v1/tu/offboardings", tuCtrls.Offboarding.CreateOffboarding)
	mux.HandleFunc("GET /api/v1/tu/reports/disnaker.csv", tuCtrls.Offboarding.ExportDisnakerCSV)
	return mux
}

func TestTenantIsolationAndSummary(t *testing.T) {
	mux := setupTestMux()

	req1 := httptest.NewRequest(http.MethodGet, "/api/v1/tu/summary", nil)
	rec1 := httptest.NewRecorder()
	mux.ServeHTTP(rec1, req1)

	if rec1.Code != http.StatusOK {
		t.Fatalf("expected 200 OK, got %d", rec1.Code)
	}

	req2 := httptest.NewRequest(http.MethodGet, "/api/v1/tu/summary", nil)
	req2.Header.Set("X-Tenant-ID", "tenant-lpk-lain")
	rec2 := httptest.NewRecorder()
	mux.ServeHTTP(rec2, req2)

	var resp struct {
		Data overviewModel.DashboardSummary `json:"data"`
	}
	if err := json.Unmarshal(rec2.Body.Bytes(), &resp); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}
	if len(resp.Data.Students) != 0 {
		t.Fatalf("expected 0 students for isolated tenant, got %d", len(resp.Data.Students))
	}
}

func TestPPDBRegistrationAndGraduationActivationLock(t *testing.T) {
	mux := setupTestMux()

	payload := map[string]any{
		"nik":             "3273011504040009",
		"full_name":       "Dimas Anggara",
		"gender":          "LAKI_LAKI",
		"birth_place":     "Cimahi",
		"birth_date":      "2004-04-15",
		"phone_student":   "081299887766",
		"parent_name":     "Bambang Sudibyo",
		"phone_parent":    "081299887700",
		"address":         "Cimahi Tengah",
		"education_level": "SMK Listrik",
		"target_program":  "MAGANG_JEPANG",
		"batch_name":      "Angkatan 19",
		"height_cm":       170,
		"weight_kg":       62,
	}
	bodyBytes, _ := json.Marshal(payload)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/tu/ppdb", bytes.NewReader(bodyBytes))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201 Created, got %d: %s", rec.Code, rec.Body.String())
	}

	var createResp struct {
		Data ppdbModel.Student `json:"data"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &createResp)
	if len(createResp.Data.Documents) != 7 {
		t.Fatalf("expected 7 mandatory documents initialized, got %d", len(createResp.Data.Documents))
	}

	actPayload := map[string]any{
		"height_cm":              170,
		"weight_kg":              62,
		"color_blind_status":     "NORMAL",
		"has_tattoo_or_piercing": false,
		"math_score":             90,
		"approve_graduation":     true,
	}
	actBytes, _ := json.Marshal(actPayload)
	actReq := httptest.NewRequest(http.MethodPost, "/api/v1/tu/students/"+createResp.Data.ID+"/activate", bytes.NewReader(actBytes))
	actRec := httptest.NewRecorder()
	mux.ServeHTTP(actRec, actReq)

	if actRec.Code != http.StatusOK {
		t.Fatalf("expected 200 OK on activation, got %d", actRec.Code)
	}

	var actResp struct {
		Data ppdbModel.Student `json:"data"`
	}
	_ = json.Unmarshal(actRec.Body.Bytes(), &actResp)
	if actResp.Data.NIS == "" || !actResp.Data.PortalAccountActive || !actResp.Data.InitialInvoiceTriggered {
		t.Fatalf("expected NIS, PortalAccountActive, and InitialInvoiceTriggered to be true, got %+v", actResp.Data)
	}
}

func TestDormitoryViolation100PointsSuspensionLock(t *testing.T) {
	mux := setupTestMux()

	vPayload := map[string]any{
		"violation_title": "Keluar asrama malam tanpa izin resmi",
		"category":        "BERAT",
		"points_added":    85,
		"recorded_by":     "Nadia Putri (Admin TU)",
	}
	vBytes, _ := json.Marshal(vPayload)
	req := httptest.NewRequest(http.MethodPost, "/api/v1/tu/students/stu-001/violations", bytes.NewReader(vBytes))
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201 Created, got %d", rec.Code)
	}

	var vResp struct {
		Data struct {
			Student ppdbModel.Student `json:"student"`
		} `json:"data"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &vResp)
	if vResp.Data.Student.ViolationPoints != 100 {
		t.Fatalf("expected 100 violation points, got %d", vResp.Data.Student.ViolationPoints)
	}
	if vResp.Data.Student.StudentStatus != ppdbModel.StatusSuspended || !vResp.Data.Student.LockedFromMensetsu {
		t.Fatalf("expected student to be SUSPENDED and locked from mensetsu at 100 points")
	}
}

func TestDocumentVerificationAndH30Expiry(t *testing.T) {
	mux := setupTestMux()

	badPayload := map[string]any{
		"doc_type":            "KTP",
		"verification_status": "DITOLAK",
		"rejection_reason":    "",
	}
	badBytes, _ := json.Marshal(badPayload)
	badReq := httptest.NewRequest(http.MethodPatch, "/api/v1/tu/students/stu-002/documents", bytes.NewReader(badBytes))
	badRec := httptest.NewRecorder()
	mux.ServeHTTP(badRec, badReq)

	if badRec.Code != http.StatusUnprocessableEntity {
		t.Fatalf("expected 422 when rejection reason is empty, got %d", badRec.Code)
	}

	soonDate := time.Now().UTC().AddDate(0, 0, 15).Format("2006-01-02")
	goodPayload := map[string]any{
		"doc_type":            "PASPOR",
		"document_number":     "X9988776",
		"verification_status": "VALID",
		"expiry_date":         soonDate,
		"verified_by":         "Admin TU",
	}
	goodBytes, _ := json.Marshal(goodPayload)
	goodReq := httptest.NewRequest(http.MethodPatch, "/api/v1/tu/students/stu-002/documents", bytes.NewReader(goodBytes))
	goodRec := httptest.NewRecorder()
	mux.ServeHTTP(goodRec, goodReq)

	if goodRec.Code != http.StatusOK {
		t.Fatalf("expected 200 OK, got %d", goodRec.Code)
	}
}

func TestOffboardingRefundAndCSVExport(t *testing.T) {
	mux := setupTestMux()

	offPayload := map[string]any{
		"student_id":             "stu-002",
		"reason":                 "Mengundurkan diri karena alasan kesehatan keluarga",
		"total_paid_idr":         8500000,
		"deduction_mcu_idr":      950000,
		"deduction_passport_idr": 650000,
		"deduction_uniform_idr":  400000,
		"deduction_dorm_idr":     500000,
	}
	offBytes, _ := json.Marshal(offPayload)
	offReq := httptest.NewRequest(http.MethodPost, "/api/v1/tu/offboardings", bytes.NewReader(offBytes))
	offRec := httptest.NewRecorder()
	mux.ServeHTTP(offRec, offReq)

	if offRec.Code != http.StatusCreated {
		t.Fatalf("expected 201 Created, got %d", offRec.Code)
	}

	var offResp struct {
		Data offboardingModel.OffboardingRequest `json:"data"`
	}
	_ = json.Unmarshal(offRec.Body.Bytes(), &offResp)
	if offResp.Data.NetRefundIDR != 6000000 {
		t.Fatalf("expected net refund 6000000, got %d", offResp.Data.NetRefundIDR)
	}

	csvReq := httptest.NewRequest(http.MethodGet, "/api/v1/tu/reports/disnaker.csv", nil)
	csvRec := httptest.NewRecorder()
	mux.ServeHTTP(csvRec, csvReq)

	if csvRec.Code != http.StatusOK || !strings.Contains(csvRec.Body.String(), "Rizky Pratama Putra") {
		t.Fatalf("expected valid CSV output containing student rows")
	}
}
