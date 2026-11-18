package pemberkasan

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	pemberkasanModel "siapterbang-backend/internal/models/tu/pemberkasan"
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
	return store.DefaultDemoTenantID
}

func (c *Controller) VerifyDocument(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	studentID := strings.TrimSpace(r.PathValue("id"))

	var input pemberkasanModel.VerifyDocumentRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload verifikasi dokumen tidak valid", err.Error())
		return
	}

	if input.VerificationStatus == pemberkasanModel.DocRejected && strings.TrimSpace(input.RejectionReason) == "" {
		views.Error(w, http.StatusUnprocessableEntity, store.ErrMissingRejectReason.Error(), nil)
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	now := time.Now().UTC()
	for i := range c.store.Students {
		st := &c.store.Students[i]
		if st.TenantID == tenantID && st.ID == studentID {
			for j := range st.Documents {
				doc := &st.Documents[j]
				if doc.DocType == input.DocType {
					doc.VerificationStatus = input.VerificationStatus
					doc.RejectionReason = strings.TrimSpace(input.RejectionReason)
					if strings.TrimSpace(input.DocumentNumber) != "" {
						doc.DocumentNumber = strings.TrimSpace(input.DocumentNumber)
					}
					if strings.TrimSpace(input.ExpiryDate) != "" {
						doc.ExpiryDate = strings.TrimSpace(input.ExpiryDate)
						days, soon := store.ComputeDaysUntilExpiry(doc.ExpiryDate, now)
						doc.DaysUntilExpiry = days
						doc.IsExpiringSoon = soon
					}
					doc.VerifiedBy = strings.TrimSpace(input.VerifiedBy)
					doc.UpdatedAt = now
					break
				}
			}
			st.UpdatedAt = now
			views.Success(w, http.StatusOK, "Status verifikasi dokumen berhasil diperbarui", *st)
			return
		}
	}

	views.Error(w, http.StatusNotFound, store.ErrStudentNotFound.Error(), nil)
}
