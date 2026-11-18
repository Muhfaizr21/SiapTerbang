package views

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
	Error   any    `json:"error,omitempty"`
}

func RenderJSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(data)
}

func Success(w http.ResponseWriter, statusCode int, message string, data any) {
	RenderJSON(w, statusCode, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func Error(w http.ResponseWriter, statusCode int, message string, errDetails any) {
	RenderJSON(w, statusCode, APIResponse{
		Success: false,
		Message: message,
		Error:   errDetails,
	})
}
