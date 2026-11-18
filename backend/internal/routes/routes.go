package routes

import (
	"net/http"

	authController "siapterbang-backend/internal/controllers/auth"
	healthController "siapterbang-backend/internal/controllers/health"
	tuAsramaCtrl "siapterbang-backend/internal/controllers/tu/asrama"
	tuOffboardingCtrl "siapterbang-backend/internal/controllers/tu/offboarding"
	tuOverviewCtrl "siapterbang-backend/internal/controllers/tu/overview"
	tuPemberkasanCtrl "siapterbang-backend/internal/controllers/tu/pemberkasan"
	tuPpdbCtrl "siapterbang-backend/internal/controllers/tu/ppdb"
	tuSuratCtrl "siapterbang-backend/internal/controllers/tu/surat"
	"siapterbang-backend/internal/services/tu/store"
)

type TuControllers struct {
	Overview    *tuOverviewCtrl.Controller
	PPDB        *tuPpdbCtrl.Controller
	Asrama      *tuAsramaCtrl.Controller
	Pemberkasan *tuPemberkasanCtrl.Controller
	Surat       *tuSuratCtrl.Controller
	Offboarding *tuOffboardingCtrl.Controller
}

func NewTuControllers(ds *store.TuDataStore) *TuControllers {
	return &TuControllers{
		Overview:    tuOverviewCtrl.NewController(ds),
		PPDB:        tuPpdbCtrl.NewController(ds),
		Asrama:      tuAsramaCtrl.NewController(ds),
		Pemberkasan: tuPemberkasanCtrl.NewController(ds),
		Surat:       tuSuratCtrl.NewController(ds),
		Offboarding: tuOffboardingCtrl.NewController(ds),
	}
}

type Router struct {
	mux              *http.ServeMux
	healthController *healthController.Controller
	authController   *authController.Controller
	tuControllers    *TuControllers
	corsOrigin       string
}

func NewRouter(
	healthCtrl *healthController.Controller,
	authCtrl *authController.Controller,
	tuCtrls *TuControllers,
	corsOrigin string,
) *Router {
	r := &Router{
		mux:              http.NewServeMux(),
		healthController: healthCtrl,
		authController:   authCtrl,
		tuControllers:    tuCtrls,
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

	// Role 3: Admin Tata Usaha (TU) modular feature routes
	if r.tuControllers != nil {
		r.mux.HandleFunc("GET /api/v1/tu/summary", r.tuControllers.Overview.GetSummary)
		r.mux.HandleFunc("POST /api/v1/tu/ppdb", r.tuControllers.PPDB.RegisterApplicant)
		r.mux.HandleFunc("POST /api/v1/tu/students/{id}/activate", r.tuControllers.PPDB.ActivateStudent)
		r.mux.HandleFunc("POST /api/v1/tu/students/{id}/violations", r.tuControllers.Asrama.RecordViolation)
		r.mux.HandleFunc("POST /api/v1/tu/students/{id}/dormitory", r.tuControllers.Asrama.AssignDormitory)
		r.mux.HandleFunc("PATCH /api/v1/tu/students/{id}/documents", r.tuControllers.Pemberkasan.VerifyDocument)
		r.mux.HandleFunc("POST /api/v1/tu/letters", r.tuControllers.Surat.GenerateLetter)
		r.mux.HandleFunc("POST /api/v1/tu/offboardings", r.tuControllers.Offboarding.CreateOffboarding)
		r.mux.HandleFunc("GET /api/v1/tu/reports/disnaker.csv", r.tuControllers.Offboarding.ExportDisnakerCSV)
	}
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.corsOrigin)
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, X-Tenant-ID")

	if req.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	r.mux.ServeHTTP(w, req)
}
