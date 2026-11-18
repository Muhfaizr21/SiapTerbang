package overview

import (
	asramaModel "siapterbang-backend/internal/models/tu/asrama"
	offboardingModel "siapterbang-backend/internal/models/tu/offboarding"
	ppdbModel "siapterbang-backend/internal/models/tu/ppdb"
	suratModel "siapterbang-backend/internal/models/tu/surat"
)

type DashboardSummary struct {
	TenantID                  string                                 `json:"tenant_id"`
	PendingPPDBCount          int                                    `json:"pending_ppdb_count"`
	ActiveStudentCount        int                                    `json:"active_student_count"`
	PendingDocVerification    int                                    `json:"pending_doc_verification"`
	ExpiringDocumentH30Count  int                                    `json:"expiring_document_h30_count"`
	SuspendedStudentCount     int                                    `json:"suspended_student_count"`
	DocumentCompletionPercent float64                                `json:"document_completion_percent"`
	DormitoryComplianceRate   float64                                `json:"dormitory_compliance_rate"`
	Students                  []ppdbModel.Student                    `json:"students"`
	Rooms                     []asramaModel.DormitoryRoom            `json:"rooms"`
	Violations                []asramaModel.DormitoryViolation       `json:"violations"`
	Letters                   []suratModel.OfficialLetter            `json:"letters"`
	Offboardings              []offboardingModel.OffboardingRequest  `json:"offboardings"`
}
