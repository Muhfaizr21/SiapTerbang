# SiapTerbang Backend (Golang MVC)

Backend API untuk platform SaaS Manajemen Operasional LPK SiapTerbang.

## Arsitektur MVC (Model-View-Controller)

```
backend/
├── cmd/
│   └── api/
│       └── main.go                         # Entry point aplikasi & server lifecycle
├── internal/
│   ├── config/
│   │   └── config.go                       # Konfigurasi & environment loader
│   ├── controllers/                        # CONTROLLER: Request handling & flow logic
│   │   ├── auth/                           # Modul Controller Auth
│   │   │   ├── auth_controller.go          # Handlers: Login & Register LPK
│   │   │   └── auth_controller_test.go     # Unit tests controller auth
│   │   └── health/                         # Modul Controller Health
│   │       ├── health_controller.go        # Handler: Health check API
│   │       └── health_controller_test.go   # Unit test controller health
│   ├── models/                             # MODEL: Domain entities & data structures
│   │   ├── auth/                           # Model Auth & Pengguna
│   │   │   └── user.go                     # Entitas User & 6 Role LPK RBAC
│   │   └── tenant/                         # Model Tenant / Lembaga
│   │       └── tenant.go                   # Entitas Tenant LPK & Status Langganan
│   ├── views/                              # VIEW: Serializer & response envelope
│   │   └── json_response.go                # Standardized JSON response (Success & Error)
│   ├── routes/                             # ROUTER: HTTP Multiplexer & CORS
│   │   └── routes.go                       # Endpoint mapping
│   └── supabase/                           # Client SDK & helper koneksi Supabase
│       └── client.go                       # Ping & client wrapper
├── .env.example                            # Template environment variable
├── .gitignore                              # Git ignore rules
└── go.mod                                  # Go module: siapterbang-backend
```

## Menjalankan Server

1. Salin environment variable:
   ```bash
   cp .env.example .env
   ```

2. Jalankan server:
   ```bash
   go run cmd/api/main.go
   ```

3. Build binary:
   ```bash
   go build -o bin/api cmd/api/main.go
   ```

## Endpoint Awal

- `GET /api/v1/health` - Cek status backend
- `POST /api/v1/auth/login` - Login akun LPK
- `POST /api/v1/auth/register` - Pendaftaran akun & tenant LPK baru
