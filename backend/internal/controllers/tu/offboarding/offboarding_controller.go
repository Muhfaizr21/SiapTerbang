package offboarding

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	offboardingModel "siapterbang-backend/internal/models/tu/offboarding"
	ppdbModel "siapterbang-backend/internal/models/tu/ppdb"
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

func CalculateNetRefund(totalPaid, mcu, passport, uniform, dorm int64) int64 {
	deductions := mcu + passport + uniform + dorm
	net := totalPaid - deductions
	if net < 0 {
		return 0
	}
	return net
}

func (c *Controller) CreateOffboarding(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	var input offboardingModel.CreateOffboardingInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload offboarding tidak valid", err.Error())
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	for i := range c.store.Students {
		st := &c.store.Students[i]
		if st.TenantID == tenantID && st.ID == input.StudentID {
			netRefund := CalculateNetRefund(
				input.TotalPaidIDR,
				input.DeductionMCUIDR,
				input.DeductionPassportIDR,
				input.DeductionUniformIDR,
				input.DeductionDormIDR,
			)
			st.StudentStatus = ppdbModel.StatusOffboarded
			st.LockedFromMensetsu = true
			st.UpdatedAt = time.Now().UTC()

			req := offboardingModel.OffboardingRequest{
				ID:                   fmt.Sprintf("off-%d", len(c.store.Offboardings)+1),
				TenantID:             tenantID,
				StudentID:            st.ID,
				StudentName:          st.FullName,
				StudentNIS:           st.NIS,
				Reason:               strings.TrimSpace(input.Reason),
				TotalPaidIDR:         input.TotalPaidIDR,
				DeductionMCUIDR:      input.DeductionMCUIDR,
				DeductionPassportIDR: input.DeductionPassportIDR,
				DeductionUniformIDR:  input.DeductionUniformIDR,
				DeductionDormIDR:     input.DeductionDormIDR,
				NetRefundIDR:         netRefund,
				ApprovalStatus:       "MENUNGGU_DIREKTUR",
				CreatedAt:            time.Now().UTC(),
			}
			c.store.Offboardings = append([]offboardingModel.OffboardingRequest{req}, c.store.Offboardings...)
			views.Success(w, http.StatusCreated, "Pengajuan offboarding dan kalkulasi refund berhasil disimpan", req)
			return
		}
	}

	views.Error(w, http.StatusNotFound, store.ErrStudentNotFound.Error(), nil)
}

func (c *Controller) ExportDisnakerCSV(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	c.store.Mu.RLock()
	defer c.store.Mu.RUnlock()

	var buf bytes.Buffer
	writer := csv.NewWriter(&buf)
	_ = writer.Write([]string{
		"NIS",
		"NIK",
		"Nama Lengkap",
		"Gender",
		"Tempat Tanggal Lahir",
		"Program Tujuan",
		"Angkatan",
		"Kamar Asrama",
		"Poin Disiplin",
		"Status Siswa",
	})

	for _, st := range c.store.Students {
		if st.TenantID != tenantID {
			continue
		}
		_ = writer.Write([]string{
			st.NIS,
			st.NIK,
			st.FullName,
			st.Gender,
			fmt.Sprintf("%s, %s", st.BirthPlace, st.BirthDate),
			st.TargetProgram,
			st.BatchName,
			st.DormitoryRoomCode,
			fmt.Sprintf("%d", st.ViolationPoints),
			string(st.StudentStatus),
		})
	}
	writer.Flush()

	w.Header().Set("Content-Type", "text/csv; charset=utf-8")
	w.Header().Set("Content-Disposition", `attachment; filename="laporan-disnaker-bp2mi.csv"`)
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(buf.Bytes())
}
