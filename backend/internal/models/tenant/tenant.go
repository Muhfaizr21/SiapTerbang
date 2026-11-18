package tenant

import "time"

type Status string

const (
	StatusActive    Status = "ACTIVE"
	StatusSuspended Status = "SUSPENDED"
	StatusTrial     Status = "TRIAL"
)

type Tenant struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Subdomain   string    `json:"subdomain"`
	Status      Status    `json:"status"`
	TierPlan    string    `json:"tier_plan"`
	MaxStudents int       `json:"max_students"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
