package routes

import (
	"net/http"

	"siapterbang-backend/internal/controllers"
)

type Router struct {
	mux              *http.ServeMux
	healthController *controllers.HealthController
	authController   *controllers.AuthController
	corsOrigin       string
}

func NewRouter(
	healthCtrl *controllers.HealthController,
	authCtrl *controllers.AuthController,
	corsOrigin string,
) *Router {
	r := &Router{
		mux:              http.NewServeMux(),
		healthController: healthCtrl,
		authController:   authCtrl,
		corsOrigin:       corsOrigin,
	}
	r.registerRoutes()
	return r
}

func (r *Router) registerRoutes() {
	// Health routes
	r.mux.HandleFunc("GET /api/v1/health", r.healthController.Check)

	// Auth routes
	r.mux.HandleFunc("POST /api/v1/auth/login", r.authController.Login)
	r.mux.HandleFunc("POST /api/v1/auth/register", r.authController.Register)
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	// Simple CORS Middleware
	w.Header().Set("Access-Control-Allow-Origin", r.corsOrigin)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

	if req.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	r.mux.ServeHTTP(w, req)
}
