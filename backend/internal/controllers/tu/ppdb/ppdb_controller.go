package ppdb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	pemberkasanModel "siapterbang-backend/internal/models/tu/pemberkasan"
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

func isSixteenDigits(nik string) bool {
	if len(nik) != 16 {
		return false
	}
	for _, ch := range nik {
		if ch < '0' || ch > '9' {
			return false
		}
	}
	return true
}

func (c *Controller) RegisterApplicant(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	var input ppdbModel.RegisterApplicantRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload pendaftaran PPDB tidak valid", err.Error())
		return
	}

	if strings.TrimSpace(input.FullName) == "" {
		views.Error(w, http.StatusUnprocessableEntity, "Nama lengkap calon siswa wajib diisi", nil)
		return
	}
	nik := strings.TrimSpace(input.NIK)
	if !isSixteenDigits(nik) {
		views.Error(w, http.StatusUnprocessableEntity, store.ErrInvalidNIK.Error(), nil)
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	for _, st := range c.store.Students {
		if st.TenantID == tenantID && st.NIK == nik {
			views.Error(w, http.StatusUnprocessableEntity, store.ErrDuplicateNIK.Error(), nil)
			return
		}
	}

	now := time.Now().UTC()
	studentID := fmt.Sprintf("stu-%d", len(c.store.Students)+1)
	newStudent := ppdbModel.Student{
		ID:                  studentID,
		TenantID:            tenantID,
		NIS:                 "",
		NIK:                 nik,
		FullName:            strings.TrimSpace(input.FullName),
		Gender:              input.Gender,
		BirthPlace:          strings.TrimSpace(input.BirthPlace),
		BirthDate:           input.BirthDate,
		PhoneStudent:        strings.TrimSpace(input.PhoneStudent),
		ParentName:          strings.TrimSpace(input.ParentName),
		PhoneParent:         strings.TrimSpace(input.PhoneParent),
		Address:             strings.TrimSpace(input.Address),
		EducationLevel:      strings.TrimSpace(input.EducationLevel),
		TargetProgram:       input.TargetProgram,
		BatchName:           strings.TrimSpace(input.BatchName),
		PPDBStatus:          ppdbModel.PPDBWaiting,
		HeightCm:            input.HeightCm,
		WeightKg:            input.WeightKg,
		BMIScore:            store.CalculateBMI(input.HeightCm, input.WeightKg),
		ColorBlindStatus:    "NORMAL",
		HasTattooOrPiercing: false,
		MathScore:           0,
		DormitoryRoomCode:   "-",
		ViolationPoints:     0,
		StudentStatus:       ppdbModel.StatusApplicant,
		LockedFromMensetsu:  true,
		Documents:           store.BuildSevenDocuments(tenantID, studentID, pemberkasanModel.DocPending, now),
		CreatedAt:           now,
		UpdatedAt:           now,
	}

	c.store.Students = append([]ppdbModel.Student{newStudent}, c.store.Students...)
	views.Success(w, http.StatusCreated, "Pendaftar PPDB baru berhasil ditambahkan", newStudent)
}

func (c *Controller) ActivateStudent(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	studentID := strings.TrimSpace(r.PathValue("id"))

	var input ppdbModel.PhysicalTestRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload seleksi fisik tidak valid", err.Error())
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	for i := range c.store.Students {
		st := &c.store.Students[i]
		if st.TenantID == tenantID && st.ID == studentID {
			st.HeightCm = input.HeightCm
			st.WeightKg = input.WeightKg
			st.BMIScore = store.CalculateBMI(input.HeightCm, input.WeightKg)
			st.ColorBlindStatus = input.ColorBlindStatus
			st.HasTattooOrPiercing = input.HasTattooOrPiercing
			st.MathScore = input.MathScore
			st.UpdatedAt = time.Now().UTC()

			if input.ApproveGraduation && st.PPDBStatus != ppdbModel.PPDBGraduated {
				c.store.NisSeq++
				st.PPDBStatus = ppdbModel.PPDBGraduated
				st.NIS = fmt.Sprintf("LPK-2026-%d", c.store.NisSeq)
				st.StudentStatus = ppdbModel.StatusActive
				st.PortalAccountActive = true
				st.InitialInvoiceTriggered = true
			}
			views.Success(w, http.StatusOK, "Hasil seleksi fisik dan aktivasi NIS siswa berhasil disimpan", *st)
			return
		}
	}

	views.Error(w, http.StatusNotFound, store.ErrStudentNotFound.Error(), nil)
}
