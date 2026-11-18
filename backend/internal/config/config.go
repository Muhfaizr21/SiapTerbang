package config

import (
	"os"
)

type Config struct {
	AppEnv             string
	AppPort            string
	AppName            string
	CORSAllowedOrigins string
	DatabaseURL        string
	JWTSecret          string
}

func LoadConfig() *Config {
	return &Config{
		AppEnv:             getEnv("APP_ENV", "development"),
		AppPort:            getEnv("APP_PORT", "8080"),
		AppName:            getEnv("APP_NAME", "SiapTerbang-Backend"),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000"),
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		JWTSecret:          getEnv("JWT_SECRET", "default-dev-secret-key"),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
