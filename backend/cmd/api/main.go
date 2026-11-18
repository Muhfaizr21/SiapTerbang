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
	"siapterbang-backend/internal/controllers"
	"siapterbang-backend/internal/routes"
)

func main() {
	cfg := config.LoadConfig()

	// Instantiate Controllers (MVC)
	healthCtrl := controllers.NewHealthController(cfg.AppName, cfg.AppEnv)
	authCtrl := controllers.NewAuthController()

	// Instantiate Router & Register Routes
	router := routes.NewRouter(healthCtrl, authCtrl, cfg.CORSAllowedOrigins)

	server := &http.Server{
		Addr:         fmt.Sprintf(":%s", cfg.AppPort),
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Server run context
	serverErrors := make(chan error, 1)
	go func() {
		log.Printf("==> %s berjalan di port %s (env: %s)\n", cfg.AppName, cfg.AppPort, cfg.AppEnv)
		log.Printf("==> Health check: http://localhost:%s/api/v1/health\n", cfg.AppPort)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			serverErrors <- err
		}
	}()

	// Graceful shutdown on SIGINT or SIGTERM
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
