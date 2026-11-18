package overview

import (
	"math"
	"net/http"
	"strings"

	asramaModel "siapterbang-backend/internal/models/tu/asrama"
	offboardingModel "siapterbang-backend/internal/models/tu/offboarding"
	overviewModel "siapterbang-backend/internal/models/tu/overview"
	pemberkasanModel "siapterbang-backend/internal/models/tu/pemberkasan"
	ppdbModel "siapterbang-backend/internal/models/tu/ppdb"
	suratModel "siapterbang-backend/internal/models/tu/surat"
	"siapterbang-backend/internal/services/tu/store"
	"siapterbang-backend/internal/views"
)

type Controller struct {
	store *store.TuDataStore
}

func NewController(ds *store.TuDataStore) *Controller {
	return &Controller{store: ds}
}

func resolveTenantID(r *http.Request) string {
	if h := strings.TrimSpace(r.Header.Get("X-Tenant-ID")); h != "" {
		return h
	}
	if q := strings.TrimSpace(r.URL.Query().Get("tenant_id")); q != "" {
		return q
	}
	return store.DefaultDemoTenantID
}

func (c *Controller) GetSummary(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	c.store.Mu.RLock()
	defer c.store.Mu.RUnlock()

	var (
		students              []ppdbModel.Student
		rooms                 []asramaModel.DormitoryRoom
		violations            []asramaModel.DormitoryViolation
		letters               []suratModel.OfficialLetter
		offboardings          []offboardingModel.OffboardingRequest
		pendingPPDB           int
		activeStudents        int
		pendingDocs           int
		expiringH30           int
		suspendedStudents     int
		totalDocsCount        int
		validDocsCount        int
		compliantDormStudents int
		totalGraduatedInDorm  int
	)

	for _, st := range c.store.Students {
		if st.TenantID != tenantID {
			continue
		}
		students = append(students, st)
		if st.PPDBStatus == ppdbModel.PPDBWaiting {
			pendingPPDB++
		}
		if st.StudentStatus == ppdbModel.StatusActive {
			activeStudents++
		}
		if st.StudentStatus == ppdbModel.StatusSuspended {
			suspendedStudents++
		}
		if st.PPDBStatus == ppdbModel.PPDBGraduated {
			totalGraduatedInDorm++
			if st.ViolationPoints < asramaModel.MaxAllowedViolationPoints {
				compliantDormStudents++
			}
		}
		for _, doc := range st.Documents {
			totalDocsCount++
			if doc.VerificationStatus == pemberkasanModel.DocValid {
				validDocsCount++
			}
			if doc.VerificationStatus == pemberkasanModel.DocPending {
				pendingDocs++
			}
			if doc.IsExpiringSoon {
				expiringH30++
			}
		}
	}

	for _, rm := range c.store.Rooms {
		if rm.TenantID == tenantID {
			rooms = append(rooms, rm)
		}
	}
	for _, v := range c.store.Violations {
		if v.TenantID == tenantID {
			violations = append(violations, v)
		}
	}
	for _, l := range c.store.Letters {
		if l.TenantID == tenantID {
			letters = append(letters, l)
		}
	}
	for _, ob := range c.store.Offboardings {
		if ob.TenantID == tenantID {
			offboardings = append(offboardings, ob)
		}
	}

	docCompletion := 0.0
	if totalDocsCount > 0 {
		docCompletion = math.Round((float64(validDocsCount)/float64(totalDocsCount))*1000) / 10
	}

	dormCompliance := 100.0
	if totalGraduatedInDorm > 0 {
		dormCompliance = math.Round((float64(compliantDormStudents)/float64(totalGraduatedInDorm))*1000) / 10
	}

	views.Success(w, http.StatusOK, "Ringkasan operasional Admin TU berhasil dimuat", overviewModel.DashboardSummary{
		TenantID:                  tenantID,
		PendingPPDBCount:          pendingPPDB,
		ActiveStudentCount:        activeStudents,
		PendingDocVerification:    pendingDocs,
		ExpiringDocumentH30Count:  expiringH30,
		SuspendedStudentCount:     suspendedStudents,
		DocumentCompletionPercent: docCompletion,
		DormitoryComplianceRate:   dormCompliance,
		Students:                  students,
		Rooms:                     rooms,
		Violations:                violations,
		Letters:                   letters,
		Offboardings:              offboardings,
	})
}
