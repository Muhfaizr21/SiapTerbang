package models

import "time"

type TenantStatus string

const (
	TenantStatusActive    TenantStatus = "ACTIVE"
	TenantStatusSuspended TenantStatus = "SUSPENDED"
	TenantStatusTrial     TenantStatus = "TRIAL"
)

type Tenant struct {
	ID          string       `json:"id"`
	Name        string       `json:"name"`
	Subdomain   string       `json:"subdomain"`
	Status      TenantStatus `json:"status"`
	TierPlan    string       `json:"tier_plan"`
	MaxStudents int          `json:"max_students"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at"`
}
