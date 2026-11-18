package controllers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"siapterbang-backend/internal/models"
	"siapterbang-backend/internal/views"
)

type AuthController struct{}

func NewAuthController() *AuthController {
	return &AuthController{}
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	FullName  string `json:"full_name"`
	LPKName   string `json:"lpk_name"`
	Email     string `json:"email"`
	WhatsApp  string `json:"whatsapp"`
	Subdomain string `json:"subdomain"`
	Password  string `json:"password"`
}

func (c *AuthController) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload request tidak valid", err.Error())
		return
	}

	req.Email = strings.TrimSpace(req.Email)
	if req.Email == "" || req.Password == "" {
		views.Error(w, http.StatusUnprocessableEntity, "Email dan password wajib diisi", map[string]string{
			"email":    "Wajib diisi",
			"password": "Wajib diisi",
		})
		return
	}

	// Mock model mapping for MVC architecture
	user := models.User{
		ID:        "usr-demo-001",
		TenantID:  "tenant-demo-001",
		Email:     req.Email,
		FullName:  "Direktur LPK Nusantara",
		Role:      models.RoleDirektur,
		IsActive:  true,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}

	views.Success(w, http.StatusOK, "Login berhasil", map[string]any{
		"token": "mock-jwt-token-siapterbang",
		"user":  user,
	})
}

func (c *AuthController) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload request tidak valid", err.Error())
		return
	}

	req.Email = strings.TrimSpace(req.Email)
	req.LPKName = strings.TrimSpace(req.LPKName)
	req.Subdomain = strings.TrimSpace(req.Subdomain)

	if req.Email == "" || req.LPKName == "" || req.Subdomain == "" {
		views.Error(w, http.StatusUnprocessableEntity, "Data registrasi tidak lengkap", map[string]string{
			"email":     "Wajib diisi",
			"lpk_name":  "Wajib diisi",
			"subdomain": "Wajib diisi",
		})
		return
	}

	tenant := models.Tenant{
		ID:          "tenant-" + req.Subdomain,
		Name:        req.LPKName,
		Subdomain:   req.Subdomain,
		Status:      models.TenantStatusTrial,
		TierPlan:    "Paket Pro (Trial 14 Hari)",
		MaxStudents: 100,
		CreatedAt:   time.Now().UTC(),
		UpdatedAt:   time.Now().UTC(),
	}

	user := models.User{
		ID:        "usr-owner-" + req.Subdomain,
		TenantID:  tenant.ID,
		Email:     req.Email,
		FullName:  req.FullName,
		Role:      models.RoleDirektur,
		IsActive:  true,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}

	views.Success(w, http.StatusCreated, "Registrasi LPK berhasil", map[string]any{
		"tenant": tenant,
		"user":   user,
	})
}
