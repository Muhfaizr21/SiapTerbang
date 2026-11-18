package pemberkasan

import "time"

type DocumentType string

const (
	DocKTP    DocumentType = "KTP"
	DocKK     DocumentType = "KK"
	DocAkta   DocumentType = "AKTA"
	DocIjazah DocumentType = "IJAZAH"
	DocPaspor DocumentType = "PASPOR"
	DocMCU    DocumentType = "MCU"
	DocIDCPMI DocumentType = "ID_CPMI"
)

var MandatoryDocumentTypes = []DocumentType{
	DocKTP,
	DocKK,
	DocAkta,
	DocIjazah,
	DocPaspor,
	DocMCU,
	DocIDCPMI,
}

type VerificationStatus string

const (
	DocNotUploaded VerificationStatus = "BELUM_UNGGAH"
	DocPending     VerificationStatus = "MENUNGGU"
	DocValid       VerificationStatus = "VALID"
	DocRejected    VerificationStatus = "DITOLAK"
)

const ExpiryWarningThresholdDays = 30

type StudentDocument struct {
	ID                 string             `json:"id"`
	TenantID           string             `json:"tenant_id"`
	StudentID          string             `json:"student_id"`
	DocType            DocumentType       `json:"doc_type"`
	DocumentNumber     string             `json:"document_number"`
	VerificationStatus VerificationStatus `json:"verification_status"`
	RejectionReason    string             `json:"rejection_reason"`
	ExpiryDate         string             `json:"expiry_date,omitempty"`
	DaysUntilExpiry    *int               `json:"days_until_expiry,omitempty"`
	IsExpiringSoon     bool               `json:"is_expiring_soon"`
	VerifiedBy         string             `json:"verified_by,omitempty"`
	UpdatedAt          time.Time          `json:"updated_at"`
}

type VerifyDocumentRequest struct {
	DocType            DocumentType       `json:"doc_type"`
	DocumentNumber     string             `json:"document_number"`
	VerificationStatus VerificationStatus `json:"verification_status"`
	RejectionReason    string             `json:"rejection_reason"`
	ExpiryDate         string             `json:"expiry_date"`
	VerifiedBy         string             `json:"verified_by"`
}
