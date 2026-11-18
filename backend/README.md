# SiapTerbang Backend (Golang MVC)

Backend API untuk platform SaaS Manajemen Operasional LPK SiapTerbang.

## Arsitektur MVC (Model-View-Controller)

```
backend/
├── cmd/
│   └── api/
│       └── main.go                  # Entry point aplikasi & server lifecycle
├── internal/
│   ├── config/
│   │   └── config.go                # Manajemen konfigurasi & environment variable
│   ├── controllers/                 # CONTROLLER: Request handling & orchestrator logic
│   │   ├── auth_controller.go       # Auth handlers (Login, Register)
│   │   └── health_controller.go     # Health check & system status
│   ├── models/                      # MODEL: Business entities & relational schemas
│   │   ├── tenant.go                # Data tenant/LPK workspace
│   │   └── user.go                  # Data pengguna & 6 Role LPK
│   ├── views/                       # VIEW / PRESENTER: Response formatting & serialization
│   │   └── json_response.go         # Standardized JSON response envelope
│   └── routes/                      # ROUTER: HTTP multiplexer & middleware
│       └── routes.go                # Endpoint mapping
├── .env.example                     # Contoh variabel lingkungan
├── .gitignore                       # Git ignore list
└── go.mod                           # Go module definition
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
