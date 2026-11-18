package controllers

import (
	"net/http"
	"time"

	"siapterbang-backend/internal/views"
)

type HealthController struct {
	appName     string
	appEnv      string
	supabaseURL string
}

func NewHealthController(appName, appEnv, supabaseURL string) *HealthController {
	return &HealthController{
		appName:     appName,
		appEnv:      appEnv,
		supabaseURL: supabaseURL,
	}
}

func (c *HealthController) Check(w http.ResponseWriter, r *http.Request) {
	views.Success(w, http.StatusOK, "SiapTerbang API backend is running", map[string]any{
		"app_name":     c.appName,
		"env":          c.appEnv,
		"supabase_url": c.supabaseURL,
		"timestamp":    time.Now().UTC().Format(time.RFC3339),
		"status":       "healthy",
	})
}
