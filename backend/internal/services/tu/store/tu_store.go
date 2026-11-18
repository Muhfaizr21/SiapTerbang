package store

import (
	"errors"
	"fmt"
	"math"
	"strings"
	"sync"
	"time"

	asramaModel "siapterbang-backend/internal/models/tu/asrama"
	offboardingModel "siapterbang-backend/internal/models/tu/offboarding"
	pemberkasanModel "siapterbang-backend/internal/models/tu/pemberkasan"
	ppdbModel "siapterbang-backend/internal/models/tu/ppdb"
	suratModel "siapterbang-backend/internal/models/tu/surat"
)

var (
	ErrInvalidTenant       = errors.New("tenant_id wajib disertakan untuk isolasi keamanan")
	ErrStudentNotFound     = errors.New("data siswa tidak ditemukan pada tenant ini")
	ErrRoomNotFound        = errors.New("kamar asrama tidak ditemukan pada tenant ini")
	ErrRoomFull            = errors.New("kapasitas kamar asrama sudah penuh")
	ErrDuplicateNIK        = errors.New("NIK 16 digit sudah terdaftar pada LPK ini")
	ErrInvalidNIK          = errors.New("NIK wajib terdiri dari tepat 16 digit angka")
	ErrMissingRejectReason = errors.New("catatan alasan penolakan wajib diisi saat menolak dokumen")
	ErrInvalidPoints       = errors.New("poin pelanggaran harus bernilai positif")
)

const DefaultDemoTenantID = "tenant-lpk-nusantara"

type TuDataStore struct {
	Mu           sync.RWMutex
	Students     []ppdbModel.Student
	Rooms        []asramaModel.DormitoryRoom
	Violations   []asramaModel.DormitoryViolation
	Letters      []suratModel.OfficialLetter
	Offboardings []offboardingModel.OffboardingRequest
	NisSeq       int
}

func NewTuDataStore() *TuDataStore {
	ds := &TuDataStore{
		NisSeq: 1004,
	}
	ds.seedTenant(DefaultDemoTenantID)
	return ds
}

func CalculateBMI(heightCm, weightKg float64) float64 {
	if heightCm <= 0 || weightKg <= 0 {
		return 0
	}
	heightM := heightCm / 100.0
	bmi := weightKg / (heightM * heightM)
	return math.Round(bmi*10) / 10
}

func ComputeDaysUntilExpiry(expiryDateISO string, refTime time.Time) (*int, bool) {
	trimmed := strings.TrimSpace(expiryDateISO)
	if trimmed == "" {
		return nil, false
	}
	parsed, err := time.Parse("2006-01-02", trimmed)
	if err != nil {
		return nil, false
	}
	refDay := time.Date(refTime.Year(), refTime.Month(), refTime.Day(), 0, 0, 0, 0, time.UTC)
	expDay := time.Date(parsed.Year(), parsed.Month(), parsed.Day(), 0, 0, 0, 0, time.UTC)
	days := int(expDay.Sub(refDay).Hours() / 24)
	isExpiringSoon := days <= pemberkasanModel.ExpiryWarningThresholdDays
	return &days, isExpiringSoon
}

func BuildSevenDocuments(tenantID, studentID string, initialStatus pemberkasanModel.VerificationStatus, now time.Time) []pemberkasanModel.StudentDocument {
	docs := make([]pemberkasanModel.StudentDocument, 0, len(pemberkasanModel.MandatoryDocumentTypes))
	for i, docType := range pemberkasanModel.MandatoryDocumentTypes {
		docs = append(docs, pemberkasanModel.StudentDocument{
			ID:                 fmt.Sprintf("doc-%s-%d", studentID, i+1),
			TenantID:           tenantID,
			StudentID:          studentID,
			DocType:            docType,
			VerificationStatus: initialStatus,
			UpdatedAt:          now,
		})
	}
	return docs
}

func (ds *TuDataStore) seedTenant(tenantID string) {
	now := time.Now().UTC()
	expSoonPaspor := now.AddDate(0, 0, 19).Format("2006-01-02")
	expSoonMCU := now.AddDate(0, 0, 11).Format("2006-01-02")
	expSafe := now.AddDate(2, 4, 0).Format("2006-01-02")

	ds.Rooms = []asramaModel.DormitoryRoom{
		{
			ID:            "room-a101",
			TenantID:      tenantID,
			RoomCode:      "A-101",
			BuildingName:  "Asrama Putra Sakura",
			GenderZone:    "PUTRA",
			Capacity:      8,
			OccupiedCount: 6,
		},
		{
			ID:            "room-a102",
			TenantID:      tenantID,
			RoomCode:      "A-102",
			BuildingName:  "Asrama Putra Sakura",
			GenderZone:    "PUTRA",
			Capacity:      8,
			OccupiedCount: 8,
		},
		{
			ID:            "room-b201",
			TenantID:      tenantID,
			RoomCode:      "B-201",
			BuildingName:  "Asrama Putri Fuji",
			GenderZone:    "PUTRI",
			Capacity:      8,
			OccupiedCount: 5,
		},
	}

	days19, soon19 := ComputeDaysUntilExpiry(expSoonPaspor, now)
	days11, soon11 := ComputeDaysUntilExpiry(expSoonMCU, now)
	daysSafe, soonSafe := ComputeDaysUntilExpiry(expSafe, now)

	s1Docs := BuildSevenDocuments(tenantID, "stu-001", pemberkasanModel.DocValid, now)
	s1Docs[4].DocumentNumber = "C8941205"
	s1Docs[4].ExpiryDate = expSoonPaspor
	s1Docs[4].DaysUntilExpiry = days19
	s1Docs[4].IsExpiringSoon = soon19
	s1Docs[5].DocumentNumber = "MCU-2026-089"
	s1Docs[5].ExpiryDate = expSafe
	s1Docs[5].DaysUntilExpiry = daysSafe
	s1Docs[5].IsExpiringSoon = soonSafe

	s2Docs := BuildSevenDocuments(tenantID, "stu-002", pemberkasanModel.DocValid, now)
	s2Docs[5].DocumentNumber = "MCU-2026-014"
	s2Docs[5].ExpiryDate = expSoonMCU
	s2Docs[5].DaysUntilExpiry = days11
	s2Docs[5].IsExpiringSoon = soon11
	s2Docs[6].VerificationStatus = pemberkasanModel.DocPending

	s3Docs := BuildSevenDocuments(tenantID, "stu-003", pemberkasanModel.DocPending, now)

	ds.Students = []ppdbModel.Student{
		{
			ID:                      "stu-001",
			TenantID:                tenantID,
			NIS:                     "LPK-2026-1001",
			NIK:                     "3204011805030001",
			FullName:                "Rizky Pratama Putra",
			Gender:                  "LAKI_LAKI",
			BirthPlace:              "Bandung",
			BirthDate:               "2003-05-18",
			PhoneStudent:            "081234567801",
			ParentName:              "Hendra Wijaya",
			PhoneParent:             "081234567899",
			Address:                 "Jl. Raya Soreang No. 45, Kab. Bandung",
			EducationLevel:          "SMK Teknik Mesin",
			TargetProgram:           "MAGANG_JEPANG",
			BatchName:               "Angkatan 18 - Musim Semi",
			PPDBStatus:              ppdbModel.PPDBGraduated,
			HeightCm:                171,
			WeightKg:                64,
			BMIScore:                CalculateBMI(171, 64),
			ColorBlindStatus:        "NORMAL",
			HasTattooOrPiercing:     false,
			MathScore:               88,
			DormitoryRoomID:         "room-a101",
			DormitoryRoomCode:       "A-101",
			ViolationPoints:         15,
			StudentStatus:           ppdbModel.StatusActive,
			LockedFromMensetsu:      false,
			PortalAccountActive:     true,
			InitialInvoiceTriggered: true,
			Documents:               s1Docs,
			CreatedAt:               now.AddDate(0, -2, 0),
			UpdatedAt:               now,
		},
		{
			ID:                      "stu-002",
			TenantID:                tenantID,
			NIS:                     "LPK-2026-1002",
			NIK:                     "3302052108020004",
			FullName:                "Aulia Rahmawati",
			Gender:                  "PEREMPUAN",
			BirthPlace:              "Banyumas",
			BirthDate:               "2002-08-21",
			PhoneStudent:            "081398765412",
			ParentName:              "Slamet Riyadi",
			PhoneParent:             "081398765400",
			Address:                 "Purwokerto Utara, Kab. Banyumas",
			EducationLevel:          "D3 Keperawatan",
			TargetProgram:           "TOKUTEI_GINOU",
			BatchName:               "Angkatan 18 - Kaigo SSW",
			PPDBStatus:              ppdbModel.PPDBGraduated,
			HeightCm:                160,
			WeightKg:                52,
			BMIScore:                CalculateBMI(160, 52),
			ColorBlindStatus:        "NORMAL",
			HasTattooOrPiercing:     false,
			MathScore:               92,
			DormitoryRoomID:         "room-b201",
			DormitoryRoomCode:       "B-201",
			ViolationPoints:         0,
			StudentStatus:           ppdbModel.StatusActive,
			LockedFromMensetsu:      false,
			PortalAccountActive:     true,
			InitialInvoiceTriggered: true,
			Documents:               s2Docs,
			CreatedAt:               now.AddDate(0, -1, -10),
			UpdatedAt:               now,
		},
		{
			ID:                      "stu-003",
			TenantID:                tenantID,
			NIS:                     "",
			NIK:                     "3507120911040002",
			FullName:                "Bagas Adi Saputra",
			Gender:                  "LAKI_LAKI",
			BirthPlace:              "Malang",
			BirthDate:               "2004-11-09",
			PhoneStudent:            "085711223344",
			ParentName:              "Suroso",
			PhoneParent:             "085711223300",
			Address:                 "Kec. Kepanjen, Kab. Malang",
			EducationLevel:          "SMK Otomotif",
			TargetProgram:           "MAGANG_JEPANG",
			BatchName:               "Angkatan 19 - Gelombang 1",
			PPDBStatus:              ppdbModel.PPDBWaiting,
			HeightCm:                168,
			WeightKg:                61,
			BMIScore:                CalculateBMI(168, 61),
			ColorBlindStatus:        "NORMAL",
			HasTattooOrPiercing:     false,
			MathScore:               80,
			DormitoryRoomID:         "",
			DormitoryRoomCode:       "-",
			ViolationPoints:         0,
			StudentStatus:           ppdbModel.StatusApplicant,
			LockedFromMensetsu:      true,
			PortalAccountActive:     false,
			InitialInvoiceTriggered: false,
			Documents:               s3Docs,
			CreatedAt:               now.AddDate(0, 0, -2),
			UpdatedAt:               now,
		},
	}

	ds.Violations = []asramaModel.DormitoryViolation{
		{
			ID:             "vio-001",
			TenantID:       tenantID,
			StudentID:      "stu-001",
			StudentName:    "Rizky Pratama Putra",
			ViolationTitle: "Terlambat Apel Fisik Pagi (05:30 WIB)",
			Category:       "RINGAN",
			PointsAdded:    15,
			RecordedBy:     "Nadia Putri (Admin TU)",
			OccurredAt:     now.AddDate(0, 0, -4),
		},
	}

	ds.Letters = []suratModel.OfficialLetter{
		{
			ID:                "ltr-001",
			TenantID:          tenantID,
			StudentID:         "stu-001",
			StudentName:       "Rizky Pratama Putra",
			StudentNIS:        "LPK-2026-1001",
			LetterNumber:      "042/TU-LPKN/XI/2026",
			LetterType:        "PENGANTAR_PASPOR",
			DestinationAgency: "Kantor Imigrasi Kelas I TPI Bandung",
			SignerName:        "H. Ahmad Fauzi, S.E.",
			SignerRole:        "Direktur Utama LPK Nusantara",
			IssuedDate:        now.Format("2006-01-02"),
			CreatedAt:         now.AddDate(0, 0, -3),
		},
	}
}
