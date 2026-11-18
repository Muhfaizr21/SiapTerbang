package asrama

import "time"

const MaxAllowedViolationPoints = 100

type DormitoryRoom struct {
	ID            string `json:"id"`
	TenantID      string `json:"tenant_id"`
	RoomCode      string `json:"room_code"`
	BuildingName  string `json:"building_name"`
	GenderZone    string `json:"gender_zone"`
	Capacity      int    `json:"capacity"`
	OccupiedCount int    `json:"occupied_count"`
}

type DormitoryViolation struct {
	ID             string    `json:"id"`
	TenantID       string    `json:"tenant_id"`
	StudentID      string    `json:"student_id"`
	StudentName    string    `json:"student_name"`
	ViolationTitle string    `json:"violation_title"`
	Category       string    `json:"category"`
	PointsAdded    int       `json:"points_added"`
	RecordedBy     string    `json:"recorded_by"`
	OccurredAt     time.Time `json:"occurred_at"`
}

type RecordViolationRequest struct {
	ViolationTitle string `json:"violation_title"`
	Category       string `json:"category"`
	PointsAdded    int    `json:"points_added"`
	RecordedBy     string `json:"recorded_by"`
}

type AssignDormitoryRequest struct {
	RoomID string `json:"room_id"`
}
