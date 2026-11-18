package surat

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

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
	return store.DefaultDemoTenantID
}

func (c *Controller) GenerateLetter(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	var input suratModel.GenerateLetterRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload generator surat tidak valid", err.Error())
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	for _, st := range c.store.Students {
		if st.TenantID == tenantID && st.ID == input.StudentID {
			now := time.Now().UTC()
			letter := suratModel.OfficialLetter{
				ID:                fmt.Sprintf("ltr-%d", len(c.store.Letters)+1),
				TenantID:          tenantID,
				StudentID:         st.ID,
				StudentName:       st.FullName,
				StudentNIS:        st.NIS,
				LetterNumber:      fmt.Sprintf("%03d/TU-LPKN/XI/2026", len(c.store.Letters)+42),
				LetterType:        input.LetterType,
				DestinationAgency: strings.TrimSpace(input.DestinationAgency),
				SignerName:        strings.TrimSpace(input.SignerName),
				SignerRole:        strings.TrimSpace(input.SignerRole),
				IssuedDate:        now.Format("2006-01-02"),
				CreatedAt:         now,
			}
			c.store.Letters = append([]suratModel.OfficialLetter{letter}, c.store.Letters...)
			views.Success(w, http.StatusCreated, "Surat resmi berkop LPK berhasil diterbitkan", letter)
			return
		}
	}

	views.Error(w, http.StatusNotFound, store.ErrStudentNotFound.Error(), nil)
}
