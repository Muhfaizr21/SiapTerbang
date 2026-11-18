package auth

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAuthLogin(t *testing.T) {
	ctrl := NewController()

	payload := LoginRequest{
		Email:    "direktur@lpknusantara.id",
		Password: "password123",
	}
	body, _ := json.Marshal(payload)

	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/login", bytes.NewReader(body))
	rr := httptest.NewRecorder()

	ctrl.Login(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Fatalf("Status login salah: dapat %v, ekspektasi %v", status, http.StatusOK)
	}
}

func TestAuthRegister(t *testing.T) {
	ctrl := NewController()

	payload := RegisterRequest{
		FullName:  "Budi Santoso",
		LPKName:   "LPK Bina Taruna",
		Email:     "budi@binataruna.id",
		WhatsApp:  "08123456789",
		Subdomain: "binataruna",
		Password:  "password123",
	}
	body, _ := json.Marshal(payload)

	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/register", bytes.NewReader(body))
	rr := httptest.NewRecorder()

	ctrl.Register(rr, req)

	if status := rr.Code; status != http.StatusCreated {
		t.Fatalf("Status register salah: dapat %v, ekspektasi %v", status, http.StatusCreated)
	}
}
