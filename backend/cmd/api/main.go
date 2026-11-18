package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"siapterbang-backend/internal/config"
	authController "siapterbang-backend/internal/controllers/auth"
	healthController "siapterbang-backend/internal/controllers/health"
	"siapterbang-backend/internal/routes"
	"siapterbang-backend/internal/services/tu/store"
)

func main() {
	cfg := config.LoadConfig()

	// Instantiate Multi-Tenant Stores & Modular Feature Controllers (MVC)
	tuStore := store.NewTuDataStore()
	healthCtrl := healthController.NewController(cfg.AppName, cfg.AppEnv, cfg.SupabaseURL)
	authCtrl := authController.NewController()
	tuCtrls := routes.NewTuControllers(tuStore)

	// Instantiate Router & Register Routes
	router := routes.NewRouter(healthCtrl, authCtrl, tuCtrls, cfg.CORSAllowedOrigins)

	server := &http.Server{
		Addr:         fmt.Sprintf(":%s", cfg.AppPort),
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	serverErrors := make(chan error, 1)
	go func() {
		log.Printf("==> %s berjalan di port %s (env: %s)\n", cfg.AppName, cfg.AppPort, cfg.AppEnv)
		log.Printf("==> Health check: http://localhost:%s/api/v1/health\n", cfg.AppPort)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			serverErrors <- err
		}
	}()

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, os.Interrupt, syscall.SIGTERM)

	select {
	case err := <-serverErrors:
		log.Fatalf("Fatal: server gagal berjalan: %v", err)
	case sig := <-shutdown:
		log.Printf("Sinyal %v diterima, mematikan server secara graceful...", sig)

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			_ = server.Close()
			log.Fatalf("Gagal mematikan server dengan bersih: %v", err)
		}
		log.Println("Server berhasil dimatikan.")
	}
}
