package auth

import "time"

type Role string

const (
	RoleDirektur   Role = "DIREKTUR_LPK"
	RoleAdminTU    Role = "ADMIN_TU"
	RoleSensei     Role = "SENSEI"
	RolePenempatan Role = "STAF_PENEMPATAN"
	RoleKeuangan   Role = "ADMIN_KEUANGAN"
	RoleSiswa      Role = "PORTAL_SISWA"
)

type User struct {
	ID        string    `json:"id"`
	TenantID  string    `json:"tenant_id"`
	Email     string    `json:"email"`
	FullName  string    `json:"full_name"`
	Role      Role      `json:"role"`
	IsActive  bool      `json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
