package controllers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthCheck(t *testing.T) {
	ctrl := NewHealthController("SiapTerbang-Test", "test", "https://owlvnrhtsqkosuwtidlf.supabase.co")

	req := httptest.NewRequest(http.MethodGet, "/api/v1/health", nil)
	rr := httptest.NewRecorder()

	ctrl.Check(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Fatalf("Status handler salah: dapat %v, ekspektasi %v", status, http.StatusOK)
	}

	var resp struct {
		Success bool           `json:"success"`
		Message string         `json:"message"`
		Data    map[string]any `json:"data"`
	}

	if err := json.Unmarshal(rr.Body.Bytes(), &resp); err != nil {
		t.Fatalf("Gagal unmarshal response JSON: %v", err)
	}

	if !resp.Success {
		t.Fatalf("Ekspektasi success = true, dapat false")
	}

	if resp.Data["status"] != "healthy" {
		t.Fatalf("Ekspektasi status healthy, dapat %v", resp.Data["status"])
	}
}
