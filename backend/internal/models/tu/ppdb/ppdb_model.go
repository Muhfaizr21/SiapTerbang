package ppdb

import (
	"time"

	pemberkasanModel "siapterbang-backend/internal/models/tu/pemberkasan"
)

type PPDBStatus string

const (
	PPDBWaiting   PPDBStatus = "MENUNGGU_SELEKSI"
	PPDBGraduated PPDBStatus = "LULUS_SELEKSI"
	PPDBRejected  PPDBStatus = "DITOLAK"
)

type StudentStatus string

const (
	StatusApplicant  StudentStatus = "CALON_SISWA"
	StatusActive     StudentStatus = "AKTIF"
	StatusSuspended  StudentStatus = "SUSPENDED"
	StatusOffboarded StudentStatus = "OFFBOARDED"
	StatusAlumni     StudentStatus = "ALUMNI"
)

type Student struct {
	ID                      string                             `json:"id"`
	TenantID                string                             `json:"tenant_id"`
	NIS                     string                             `json:"nis"`
	NIK                     string                             `json:"nik"`
	FullName                string                             `json:"full_name"`
	Gender                  string                             `json:"gender"`
	BirthPlace              string                             `json:"birth_place"`
	BirthDate               string                             `json:"birth_date"`
	PhoneStudent            string                             `json:"phone_student"`
	ParentName              string                             `json:"parent_name"`
	PhoneParent             string                             `json:"phone_parent"`
	Address                 string                             `json:"address"`
	EducationLevel          string                             `json:"education_level"`
	TargetProgram           string                             `json:"target_program"`
	BatchName               string                             `json:"batch_name"`
	PPDBStatus              PPDBStatus                         `json:"ppdb_status"`
	HeightCm                float64                            `json:"height_cm"`
	WeightKg                float64                            `json:"weight_kg"`
	BMIScore                float64                            `json:"bmi_score"`
	ColorBlindStatus        string                             `json:"color_blind_status"`
	HasTattooOrPiercing     bool                               `json:"has_tattoo_or_piercing"`
	MathScore               int                                `json:"math_score"`
	DormitoryRoomID         string                             `json:"dormitory_room_id"`
	DormitoryRoomCode       string                             `json:"dormitory_room_code"`
	ViolationPoints         int                                `json:"violation_points"`
	StudentStatus           StudentStatus                      `json:"student_status"`
	LockedFromMensetsu      bool                               `json:"locked_from_mensetsu"`
	PortalAccountActive     bool                               `json:"portal_account_active"`
	InitialInvoiceTriggered bool                               `json:"initial_invoice_triggered"`
	Documents               []pemberkasanModel.StudentDocument `json:"documents"`
	CreatedAt               time.Time                          `json:"created_at"`
	UpdatedAt               time.Time                          `json:"updated_at"`
}

type RegisterApplicantRequest struct {
	NIK            string  `json:"nik"`
	FullName       string  `json:"full_name"`
	Gender         string  `json:"gender"`
	BirthPlace     string  `json:"birth_place"`
	BirthDate      string  `json:"birth_date"`
	PhoneStudent   string  `json:"phone_student"`
	ParentName     string  `json:"parent_name"`
	PhoneParent    string  `json:"phone_parent"`
	Address        string  `json:"address"`
	EducationLevel string  `json:"education_level"`
	TargetProgram  string  `json:"target_program"`
	BatchName      string  `json:"batch_name"`
	HeightCm       float64 `json:"height_cm"`
	WeightKg       float64 `json:"weight_kg"`
}

type PhysicalTestRequest struct {
	HeightCm            float64 `json:"height_cm"`
	WeightKg            float64 `json:"weight_kg"`
	ColorBlindStatus    string  `json:"color_blind_status"`
	HasTattooOrPiercing bool    `json:"has_tattoo_or_piercing"`
	MathScore           int     `json:"math_score"`
	ApproveGraduation   bool    `json:"approve_graduation"`
}
