# Product Requirements Document (PRD) — SiapTerbang SaaS

| Metadata Dokumen | Detail Spesifikasi |
| :--- | :--- |
| **Nama Produk** | **SiapTerbang** (`siapterbang.id`) |
| **Tipe Sistem** | B2B Multi-Tenant SaaS (Single Database, Isolated Tenant Workspace) |
| **Target Pasar Utama** | LPK Pengirim Tenaga Kerja Jepang (*Magang / Ginou Jisshusei*, *Tokutei Ginou / SSW*), Korea Selatan (*G-to-G*), Perhotelan & Kapal Pesiar |
| **Struktur Hak Akses** | 7 Role Terintegrasi (1 Platform Super Admin + 6 Role Tenant LPK) dengan *Permission-Based Multi-Role RBAC* |
| **Versi Dokumen** | Versi 1.0 — Spesifikasi Komplit End-to-End (100% Feature Coverage) |
| **Status** | Approved Blueprint for Full-Stack Implementation |

---

## Daftar Isi

1. [Latar Belakang, Analisis Masalah & Solusi Unik SaaS](#bab-1-latar-belakang-analisis-masalah--solusi-unik-saas)
2. [Arsitektur Multi-Tenant & Matriks 7 Role](#bab-2-arsitektur-multi-tenant--matriks-7-role)
3. [Spesifikasi Fungsional Lengkap & Logika Bisnis per Role (100% Feature Set)](#bab-3-spesifikasi-fungsional-lengkap--logika-bisnis-per-role)
   - [3.1 Role 1: Platform Super Admin (Pengelola Sistem SaaS)](#31-role-1-platform-super-admin-pengelola-sistem-saas)
   - [3.2 Role 2: Tenant Owner / Direktur LPK (Pemilik LPK)](#32-role-2-tenant-owner--direktur-lpk-pemilik-lpk)
   - [3.3 Role 3: Admin Tata Usaha (TU)](#33-role-3-admin-tata-usaha-tu)
   - [3.4 Role 4: Sensei / Instruktur](#34-role-4-sensei--instruktur)
   - [3.5 Role 5: Staf Penempatan (Job Matching)](#35-role-5-staf-penempatan-job-matching)
   - [3.6 Role 6: Admin Keuangan](#36-role-6-admin-keuangan)
   - [3.7 Role 7: Siswa / Kandidat (Portal Mobile Web)](#37-role-7-siswa--kandidat-portal-mobile-web)
4. [Alur Kerja Lintas Divisi & Titik Penguncian Sistem (Cross-Role Locks)](#bab-4-alur-kerja-lintas-divisi--titik-penguncian-sistem-cross-role-locks)
5. [Model Monetisasi SaaS & Roadmap Pengembangan Produk](#bab-5-model-monetisasi-saas--roadmap-pengembangan-produk)
6. [Kriteria Penerimaan Global (Acceptance Criteria)](#bab-6-kriteria-penerimaan-global-acceptance-criteria)

---

## BAB 1: Latar Belakang, Analisis Masalah & Solusi Unik SaaS

Pertumbuhan Lembaga Pelatihan Kerja (LPK) di berbagai daerah di Indonesia—khususnya kantong-kantong Calon Pekerja Migran Indonesia (CPMI) untuk program magang Jepang (*Ginou Jisshusei*), *Tokutei Ginou* (SSW), G-to-G Korea Selatan, maupun perhotelan/kapal pesiar—meningkat pesat. Namun, peningkatan kuota keberangkatan ini tidak diimbangi dengan kesiapan infrastruktur digital. Mayoritas LPK masih mengandalkan pencatatan manual berbasis kertas dan file Microsoft Excel yang terpisah antar-divisi.

### 1.1 Masalah Utama (Pain Points) Operasional LPK

| Area Masalah | Kondisi Lapangan Saat Ini | Dampak Bisnis Bagi LPK | Solusi Modul SiapTerbang |
| :--- | :--- | :--- | :--- |
| **Pemberkasan & Dokumen Legal** | Puluhan dokumen siswa (KTP, KK, Akta, Paspor, MCU, sertifikat bahasa, ID CPMI) disimpan dalam map fisik atau folder terpisah. | Dokumen sering tercecer, salah ketik identitas antar-berkas, hingga masa berlaku MCU/Paspor habis menjelang jadwal terbang. | Modul Manajemen Pemberkasan Digital + *H-30 Expiry Tracker* + Portal Unggah Mandiri Siswa. |
| **Kebocoran Keuangan & Talangan** | Biaya pendidikan dan pemberangkatan puluhan juta rupiah dicicil bertahap atau menggunakan skema dana talangan pasca-terbang. | Admin kesulitan melacak tunggakan secara *real-time*, kuitansi rawan dimanipulasi, dan cicilan alumni di luar negeri sering terlewat. | Modul Keuangan Terpadu + Kuitansi PDF ber-QR Code via WA + Pelacak Cicilan Dana Talangan Alumni + Pemisahan Kas Operasional. |
| **Ketidaksinkronan Progres Siswa** | Pemilik LPK harus bertanya manual ke Sensei, Admin TU, dan Staf Penempatan untuk mengetahui kesiapan tiap siswa. | Siswa yang belum lulus bahasa atau melanggar disiplin asrama bisa lolos daftar wawancara (*mensetsu*) dan merusak reputasi LPK. | *Cross-Role Gatekeeping*: Poin pelanggaran asrama & validasi *Layak Mensetsu* dari Sensei mengunci daftar kandidat wawancara. |
| **Pembuatan CV & Surat Manual** | Admin mengetik ulang biodata siswa ke format CV Jepang (*Rirekisho*) dan surat pengantar Disnaker/Imigrasi satu per satu. | Menghabiskan waktu berhari-hari setiap kali ada *Job Order* mendadak dari *Sending Organization* (SO) atau perusahaan luar negeri. | *1-Click Auto-Generator* Rirekisho standar Jepang/Korea & Surat Resmi Berkop LPK (Imigrasi, Disnaker, Kontrak). |

### 1.2 Lima Celah Krusial Lapangan (Edge Cases) yang Dipecahkan SiapTerbang

1. **Manajemen Asrama & Poin Disiplin**: Mencatat penempatan kamar asrama dan poin pelanggaran harian. Jika akumulasi poin melewati ambang batas (default: `100 poin`), sistem otomatis mengubah status siswa menjadi `Suspended` dan memblokir siswa dari daftar kandidat wawancara (*mensetsu*).
2. **Siklus Gagal Wawancara & Rematching**: Mendukung relasi *Many-to-Many* antara Siswa dan *Job Order*. Siswa yang gagal *mensetsu* otomatis kembali ke *pool* kandidat siap wawancara lengkap dengan riwayat evaluasi kegagalannya untuk dicocokkan ke *Job Order* berikutnya.
3. **Offboarding (Cancel) & Kalkulator Refund**: Menghitung otomatis sisa dana pengembalian bagi siswa yang mengundurkan diri:
   $$\text{Total Refund} = \text{Total Dana Disetor} - \sum(\text{Biaya Terpakai: MCU, Paspor, Seragam, dll.})$$
   Wajib melalui persetujuan (*Approval*) Tenant Owner sebelum pencairan.
4. **Auto-Generator Surat Lokal & Rirekisho**: Mencetak otomatis CV standar Jepang (*Rirekisho*) / Korea sekaligus surat pengantar Imigrasi, rekomendasi Disnaker / ID CPMI, izin orang tua, dan kontrak pelatihan berbasis kop surat resmi masing-masing LPK.
5. **Notifikasi Otomatis WhatsApp Orang Tua**: Orang tua di daerah menerima pembaruan otomatis via WhatsApp saat tagihan terbit, kuitansi lunas (beserta PDF ber-QR Code), siswa membolos (*Alpa*) 3 kali berturut-turut atau $> 3$ hari dalam sebulan, hingga kabar kelulusan wawancara.

---

## BAB 2: Arsitektur Multi-Tenant & Matriks 7 Role

SiapTerbang dirancang menggunakan arsitektur **Single-Database Multi-Tenancy** dengan isolasi ruang kerja (*Workspace Isolation*) yang ketat. Setiap LPK yang berlangganan mendapatkan satu ruang tertutup yang diidentifikasi oleh `tenant_id` unik dan subdomain khusus (`namalpk.siapterbang.id`), sehingga data antar-LPK terisolasi sepenuhnya.

### 2.1 Hierarki 7 Role Terintegrasi

| Level | Kode Role | Nama Role | Pengguna di Lapangan | Cakupan Ruang & Sifat Akses |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1 (Global SaaS)** | `SUPER_ADMIN` | **1. Platform Super Admin** | Pemilik Platform SiapTerbang & Tim Internal | Ruang Global (`tenant_id = NULL`). Mengelola seluruh tenant LPK, paket langganan, billing SaaS, pembatasan kuota, template global, dan audit sistem. |
| **Level 2 (Tenant LPK)** | `TENANT_OWNER` | **2. Tenant Owner / Direktur** | Pemilik / Direktur LPK Pelanggan | Ruang Tenant LPK-nya. Mewarisi akses lihat & override seluruh divisi internal + manajemen staf (RBAC), *approval* sensitif, audit trail internal, dan billing langganan. |
| **Level 2 (Tenant LPK)** | `ADMIN_TU` | **3. Admin Tata Usaha (TU)** | Staf Administrasi Kantor LPK | Ruang Tenant LPK-nya. Mengelola PPDB, seleksi fisik, data induk siswa, asrama & poin disiplin, verifikasi berkas legalitas, generator surat, offboarding, dan laporan dinas. |
| **Level 2 (Tenant LPK)** | `SENSEI` | **4. Sensei / Instruktur** | Guru Bahasa & Pelatih Fisik | Ruang Tenant LPK-nya. Mengelola jadwal mengajar, kurikulum, absensi harian (QR), penilaian bahasa/fisik, dan validasi gatekeeper *Layak Mensetsu*. |
| **Level 2 (Tenant LPK)** | `STAF_PENEMPATAN` | **5. Staf Penempatan** | Divisi *Job Matching* & Kerja Sama SO | Ruang Tenant LPK-nya. Mengelola mitra luar negeri (SO/User), *Job Order*, smart matching, auto-generate *Rirekisho*, jadwal *mensetsu*, pipeline CoE/Visa, dan database alumni. |
| **Level 2 (Tenant LPK)** | `ADMIN_KEUANGAN` | **6. Admin Keuangan** | Bendahara / Kasir LPK | Ruang Tenant LPK-nya. Mengelola tagihan SPP & pemberangkatan, kuitansi WA ber-QR, cicilan dana talangan, *financial gatekeeping* visa/tiket, kalkulator *refund*, dan kas operasional. |
| **Level 2 (Tenant LPK)** | `SISWA` | **7. Siswa / Kandidat** | Peserta Pelatihan LPK | Portal Mobile Web Siswa. Melihat *progress tracker*, unggah dokumen mandiri via kamera HP, cek jadwal/nilai/absensi/poin disiplin, info lowongan & evaluasi mensetsu, serta tagihan & kuitansi. |

### 2.2 Ketentuan Teknis Multi-Role per Akun (Permission-Based RBAC)
* **Konteks Lapangan**: Pada LPK skala kecil-menengah di daerah, satu orang staf sering kali merangkap lebih dari satu fungsi (misalnya Admin TU merangkap Admin Keuangan, atau Sensei merangkap Staf Penempatan).
* **Spesifikasi Sistem**: Sistem menggunakan **Permission-Based RBAC** dengan relasi *Many-to-Many* antara `users` dan `roles`. Satu akun pengguna dapat dicentang lebih dari satu role secara bersamaan pada matriks RBAC oleh *Tenant Owner*, dan navigasi sidebar akan menggabungkan seluruh modul yang diizinkan tanpa konflik hak akses.

---

## BAB 3: Spesifikasi Fungsional Lengkap & Logika Bisnis per Role

Bagian ini mendefinisikan 100% fitur, sub-fitur, dan aturan bisnis yang wajib diimplementasikan untuk masing-masing dari 7 Role.

---

### 3.1 Role 1: Platform Super Admin (Pengelola Sistem SaaS)
*Fokus: Manajemen seluruh LPK pelanggan (Tenants), monetisasi langganan, pembatasan fitur per paket, template standar nasional, dan dukungan teknis.*

#### Modul 1.1: Dashboard Global SaaS (`FR-SA-01`)
* **Sub-Fitur Spesifik**:
  1. **Metrik MRR, ARR, & Pertumbuhan Tenant**: Menampilkan *Monthly Recurring Revenue*, *Annual Recurring Revenue*, grafik penambahan tenant baru per bulan, dan rasio *churn*.
  2. **Statistik LPK Aktif, Trial, & Suspended**: Kartu ringkasan jumlah LPK berdasarkan status langganan (`ACTIVE`, `TRIAL`, `GRACE_PERIOD`, `SUSPENDED`).
  3. **Monitoring Total Storage & Kuota WA**: Bar indikator pemakaian *cloud storage* dokumen (GB) dan trafik pengiriman pesan WhatsApp Gateway di seluruh tenant.
* **Aksi & Logika Bisnis**: Mengagregasi performa bisnis platform secara *real-time* lintas tenant (`tenant_id IS NOT NULL`) untuk memantau pendapatan berulang dan beban infrastruktur server.

#### Modul 1.2: Manajemen Tenant / LPK (`FR-SA-02`)
* **Sub-Fitur Spesifik**:
  1. **Daftar Seluruh LPK Terdaftar**: Tabel direktori LPK lengkap dengan filter status, paket aktif, jumlah siswa aktif, pemakaian storage, dan tanggal jatuh tempo.
  2. **Aktivasi / Perpanjangan Manual Tenant**: Form pembuatan tenant baru atau perpanjangan masa aktif secara manual oleh Super Admin (untuk pembayaran *offline*/khusus).
  3. **Auto-Suspend Akun Menunggak**: Penjadwal otomatis (*cron job*) yang memantau tanggal berakhir langganan.
  4. **Impersonate (Login As Tenant Owner)**: Tombol aksi cepat pada baris tenant untuk masuk ke ruang kerja LPK tersebut sebagai *Tenant Owner*.
* **Aksi & Logika Bisnis**:
  * Jika masa aktif langganan habis melewati masa tenggang (*grace period*, misal 3–7 hari), sistem otomatis mengubah status tenant menjadi `SUSPENDED` dan membekukan akses login seluruh staf & siswa LPK hingga tagihan dibayar (halaman dialihkan ke halaman *Billing Lock* bagi Tenant Owner).
  * Fitur *Impersonate* menerbitkan sesi sementara yang dicatat di *Global Audit Log* untuk memudahkan tim dukungan teknis membantu LPK tanpa meminta kata sandi.

#### Modul 1.3: Paket Langganan & Feature Gating (`FR-SA-03`)
* **Sub-Fitur Spesifik**:
  1. **Manajemen Tier (Starter, Pro, Enterprise)**: Pengaturan harga bulanan/tahunan dan deskripsi paket.
  2. **Pengaturan Limitasi Kuota per Paket**: Konfigurasi parameter batas: `max_active_students`, `max_staff_users`, `max_storage_gb`, serta *feature flags* (`enable_auto_rirekisho`, `enable_wa_gateway`, `enable_bailout_loan`, `enable_multi_branch`, `enable_custom_domain`, `enable_partner_portal`).
* **Aksi & Logika Bisnis**: Mengunci fitur dan kuota otomatis berdasarkan paket LPK (misal: Paket *Starter* maksimal 100 siswa aktif, storage 5 GB, dan fitur *Auto-Rirekisho* terkunci dengan *upgrade prompt* hingga peningkatan ke paket *Pro*).

#### Modul 1.4: Billing & Invoice SaaS (`FR-SA-04`)
* **Sub-Fitur Spesifik**:
  1. **Integrasi Payment Gateway (VA / QRIS)**: Pembuatan tagihan otomatis yang terhubung ke *Virtual Account* bank dan QRIS.
  2. **Riwayat Pembayaran Langganan LPK**: Log seluruh transaksi pembayaran langganan dari seluruh LPK beserta status (`PENDING`, `PAID`, `EXPIRED`, `FAILED`).
  3. **Manajemen Kode Promo / Referral**: Pembuatan voucher diskon (persentase atau nominal tetap) dengan batas kuota pemakaian dan masa berlaku untuk akuisisi LPK baru.
* **Aksi & Logika Bisnis**: Menerbitkan *invoice* langganan otomatis setiap bulan/tahun ke pemilik LPK dan memperpanjang masa aktif (`subscription_ends_at`) secara instan melalui *webhook* saat pembayaran terkonfirmasi.

#### Modul 1.5: Master Template Global (`FR-SA-05`)
* **Sub-Fitur Spesifik**:
  1. **Template Baku CV Jepang (*Rirekisho*)**: Pengelolaan layout standar JIS *Rirekisho* Jepang dan CV standar Korea.
  2. **Template Surat Disnaker & Imigrasi**: Editor template dengan variabel dinamis (`{{nama_siswa}}`, `{{nik}}`, `{{alamat}}`, `{{nama_lpk}}`, dll.) untuk Surat Pengantar Paspor, Rekomendasi Disnaker/ID CPMI, Surat Izin Orang Tua, dan Kontrak Pelatihan.
  3. **Master Checklist Dokumen Negara Tujuan**: Preset daftar dokumen wajib per program (misal: Program Magang Jepang wajib KTP, KK, Akta, Ijazah, Paspor, MCU, Sertifikat N5/N4, ID CPMI).
* **Aksi & Logika Bisnis**: Menyediakan *template* standar siap pakai yang otomatis di-clone ke ruang kerja LPK baru saat *onboarding* sehingga mereka tidak perlu membuat format dokumen dari nol.

#### Modul 1.6: System Logs & Broadcast (`FR-SA-06`)
* **Sub-Fitur Spesifik**:
  1. **Error Log & API Monitoring**: Pemantauan kesehatan sistem, kegagalan webhook Payment Gateway, antrean PDF generator, dan status koneksi WhatsApp Gateway.
  2. **Pengumuman Pembaruan (Changelog & Maintenance Banner)**: Form publikasi pesan siaran (*broadcast*) terjadwal.
* **Aksi & Logika Bisnis**: Menampilkan notifikasi *banner* pembaruan fitur atau jadwal pemeliharaan sistem secara serentak di seluruh *dashboard* Tenant Owner.

---

### 3.2 Role 2: Tenant Owner / Direktur LPK (Pemilik LPK)
*Fokus: Mewarisi akses lihat seluruh divisi di LPK-nya + kontrol eksekutif, pencegahan kecurangan staf (fraud prevention), dan langganan SaaS.*

#### Modul 2.1: Dashboard Eksekutif LPK (`FR-TO-01`)
* **Sub-Fitur Spesifik**:
  1. **KPI Siswa Aktif, Siap Mensetsu, & Terbang**: Kartu metrik utama jumlah siswa di tiap tahap corong (*funnel*) pelatihan.
  2. **Grafik Rasio Kelulusan Wawancara**: Visualisasi persentase siswa lolos vs gagal *mensetsu* per bulan dan per *Sending Organization* (SO).
  3. **Ringkasan Kas Masuk vs Piutang Siswa**: Perbandingan total uang masuk bulan berjalan, total piutang tertunggak, dan pengeluaran operasional.
  4. **Alert Center Dokumen & Tunggakan**: Panel peringatan cepat untuk persetujuan (*approval*) yang menunggu, dokumen hampir kedaluwarsa, dan tunggakan kritis.
* **Aksi & Logika Bisnis**: Menyajikan ringkasan kesehatan operasional dan finansial internal LPK dalam satu layar secara *real-time* tanpa perlu menunggu rekap manual dari admin.

#### Modul 2.2: Manajemen Staf & RBAC (`FR-TO-02`)
* **Sub-Fitur Spesifik**:
  1. **Tambah / Nonaktifkan Akun Staf**: CRUD akun staf internal LPK (nama, email, nomor HP, status aktif/nonaktif, reset password).
  2. **Matriks Centang Hak Akses (Multi-Role)**: Antarmuka matriks kotak centang (*checkbox*) untuk menetapkan satu atau beberapa role (`ADMIN_TU`, `SENSEI`, `STAF_PENEMPATAN`, `ADMIN_KEUANGAN`) ke satu akun staf.
* **Aksi & Logika Bisnis**: Mengatur pembagian tugas staf internal serta mendukung penggabungan role pada satu akun staf. Membatasi penambahan staf jika jumlah staf aktif telah mencapai batas kuota paket langganan (`max_staff_users`).

#### Modul 2.3: Pusat Persetujuan / Approval (`FR-TO-03`)
* **Sub-Fitur Spesifik**:
  1. **Approval Pembatalan Siswa (Cancel)**: Antrean pengajuan siswa mengundurkan diri dari Admin TU beserta alasan dan berita acara.
  2. **Approval Pencairan Refund Keuangan**: Antrean rincian perhitungan kalkulator refund dari Admin Keuangan.
  3. **Approval Diskon Biaya & Hapus Transaksi**: Antrean permohonan potongan biaya khusus (beasiswa/keringanan) atau pembatalan/koreksi transaksi pembayaran yang salah input.
* **Aksi & Logika Bisnis**: **Kontrol Anti-Fraud**: Staf operasional (TU/Keuangan/Penempatan) **dilarang keras** dan dikunci oleh sistem dari menghapus transaksi keuangan atau membatalkan siswa yang sudah aktif/lolos lowongan secara sepihak; aksi baru dieksekusi sistem setelah Tenant Owner menekan tombol `Setujui (Approve)`.

#### Modul 2.4: Audit Trail Internal (`FR-TO-04`)
* **Sub-Fitur Spesifik**:
  1. **Log Aktivitas Perubahan Data Sensitif**: Tabel kronologis *immutable* (tidak dapat dihapus) yang menampilkan `Aktor (Staf)`, `Aksi`, `Entitas`, `Nilai Lama (Before)`, `Nilai Baru (After)`, `IP Address`, dan `Waktu`.
  2. **Riwayat Login & Perubahan Nominal**: Filter khusus untuk memantau aktivitas di modul Keuangan dan perubahan status kelayakan siswa.
* **Aksi & Logika Bisnis**: Merekam jejak siapa staf yang mengubah biodata, menghapus dokumen, atau mengedit nominal tagihan beserta stempel waktunya.

#### Modul 2.5: Pengaturan LPK & Branding (`FR-TO-05`)
* **Sub-Fitur Spesifik**:
  1. **Profil LPK, Unggah Logo & Kop Surat**: Pengaturan nama resmi LPK, nomor izin Disnaker/SO, alamat, tanda tangan digital direktur, logo, dan gambar/layout kop surat.
  2. **Pengaturan Subdomain LPK**: Konfigurasi subdomain (`namalpk.siapterbang.id`) dan *Custom Domain* (khusus paket *Enterprise*).
  3. **Koneksi Nomor WhatsApp Gateway LPK**: Pemindaian QR / pengaturan API Token WhatsApp pengirim resmi milik LPK beserta tes kirim pesan.
* **Aksi & Logika Bisnis**: Mengatur identitas resmi LPK yang otomatis tercetak pada seluruh dokumen PDF (surat pengantar, kontrak, & kuitansi) serta nomor pengirim notifikasi WhatsApp ke siswa dan orang tua.

#### Modul 2.6: Langganan & Billing SaaS (`FR-TO-06`)
* **Sub-Fitur Spesifik**:
  1. **Info Paket Aktif & Sisa Kuota Siswa/Storage**: Indikator pemakaian kuota siswa aktif (misal: `78 / 100 Siswa`) dan kapasitas penyimpanan berkas (`3.2 / 5.0 GB`).
  2. **Upgrade Paket & Pembayaran Invoice SaaS**: Pemilihan paket peningkatan (*Starter* $\rightarrow$ *Pro* / *Enterprise*), input kode promo, dan pembayaran langsung via Virtual Account / QRIS.
* **Aksi & Logika Bisnis**: Halaman khusus bagi pemilik LPK untuk memantau batas kuota paket mereka dan melakukan pembayaran perpanjangan langganan ke SiapTerbang.

#### Modul 2.7: Akses Warisan Operasional (`FR-TO-07`)
* **Sub-Fitur Spesifik**:
  1. **Full Read & Override pada Modul TU, Sensei, Penempatan, dan Keuangan**: Akses penuh ke seluruh menu keempat divisi di bawahnya.
* **Aksi & Logika Bisnis**: Pemilik LPK dapat membuka seluruh menu operasional keempat divisi di bawahnya untuk inspeksi mendadak maupun tindakan darurat (*override* kunci sistem dengan pencatatan alasan di Audit Trail).

---

### 3.3 Role 3: Admin Tata Usaha (TU)
*Fokus: Administrasi pendaftaran siswa baru, validasi dokumen legalitas, kedisiplinan asrama, dan pelaporan dinas.*

#### Modul 3.1: Dashboard Admin TU (`FR-TU-01`)
* **Sub-Fitur Spesifik**:
  1. **Antrean Pendaftar Online Baru**: Daftar calon siswa yang baru mengisi form PPDB dan menunggu seleksi fisik/verifikasi awal.
  2. **Daftar Berkas Menunggu Verifikasi**: Antrean dokumen yang baru diunggah siswa melalui Portal Mobile Web.
  3. **Peringatan H-30 Dokumen Kedaluwarsa**: Tabel khusus berkas Paspor dan MCU siswa aktif yang masa berlakunya sisa $\le 30$ hari atau sudah kedaluwarsa.
* **Aksi & Logika Bisnis**: Memprioritaskan pekerjaan harian staf administrasi agar tidak ada pendaftar baru yang terabaikan atau berkas siswa yang melewati masa berlaku menjelang keberangkatan.

#### Modul 3.2: PPDB & Seleksi Awal (`FR-TU-02`)
* **Sub-Fitur Spesifik**:
  1. **Verifikasi Formulir Pendaftaran Online**: Pemeriksaan data awal calon siswa dan penentuan gelombang/angkatan (*batch*).
  2. **Input Hasil Tes Fisik**: Form pencatatan parameter fisik wajib:
     * Tinggi Badan (cm) & Berat Badan (kg) $\rightarrow$ Kalkulasi otomatis **BMI** (Indeks Massa Tubuh).
     * Tes Buta Warna (`Normal`, `Parsial`, `Total`).
     * Pemeriksaan Fisik: Tato (`Ada/Tidak`), Tindik (`Ada/Tidak`), Bekas Patah Tulang/Operasi, Minus Mata (Kanan/Kiri).
     * Skor Tes Matematika Dasar & Psikotes Dasar.
  3. **Aktivasi Kelulusan Siswa Resmi**: Tombol perubahan status pendaftar dari `Calon / Seleksi` menjadi `Lulus Seleksi (Siswa Aktif)`.
* **Aksi & Logika Bisnis (Cross-Role Trigger 1)**:
  Saat status pendaftar diubah menjadi **Lulus Seleksi**, sistem secara atomik dan otomatis:
  1. Menerbitkan **Nomor Induk Siswa (NIS)** unik sesuai format LPK (contoh: `LPK-2026-001`).
  2. Mengaktifkan **akun login Portal Mobile Web Siswa** dan mengirimkan kredensial login via WhatsApp.
  3. Memicu pembuatan **Rencana Tagihan Otomatis** (Biaya Pendaftaran, SPP Pendidikan, & Biaya Pemberangkatan) di modul **Admin Keuangan**.

#### Modul 3.3: Data Induk & Asrama (`FR-TU-03`)
* **Sub-Fitur Spesifik**:
  1. **Biodata Lengkap**: Data Pribadi (NIK, Nama Lengkap sesuai KTP & Katakana/Romaji, TTL, Agama, Golongan Darah, Ukuran Baju/Sepatu), Data Keluarga/Wali (Nama Ayah/Ibu, Pekerjaan, Nomor WhatsApp Aktif Orang Tua), Riwayat Pendidikan Formal (SD–SMA/PT beserta tahun masuk/lulus), dan Riwayat Pekerjaan.
  2. **Manajemen Penempatan Kamar Asrama**: Pengelolaan gedung/kamar asrama, kapasitas tempat tidur (*bed*), dan histori *check-in / check-out* siswa di asrama.
  3. **Pencatatan Poin Pelanggaran Disiplin**: Form input pelanggaran tata tertib asrama/LPK (jenis pelanggaran, tanggal, bukti/catatan, bobot poin misal +15, +25, +50).
* **Aksi & Logika Bisnis (Cross-Role Lock)**:
  Jika akumulasi poin pelanggaran disiplin seorang siswa mencapai atau melewati ambang batas (`>= 100 poin`), status siswa otomatis berubah menjadi **`Suspended`** dan namanya **terkunci (diblokir)** dari daftar kandidat wawancara (*Smart Matching*) di modul Staf Penempatan.

#### Modul 3.4: Manajemen Pemberkasan (`FR-TU-04`)
* **Sub-Fitur Spesifik**:
  1. **Checklist Dokumen Wajib**: Pemantauan kelengkapan 7+ dokumen inti: `KTP`, `Kartu Keluarga (KK)`, `Akta Kelahiran`, `Ijazah Terakhir`, `Paspor`, `Medical Check Up (MCU)`, `Sertifikat Bahasa`, dan `ID CPMI`.
  2. **Verifikasi / Penolakan + Catatan Alasan**: Pratinjau file gambar/PDF unggahan siswa dengan tombol `Valid (Setujui)` atau `Tolak (Minta Revisi)` disertai input alasan penolakan (contoh: *"Foto KTP buram / terpotong, mohon foto ulang tegak lurus"*).
  3. **Expiry Tracker (Pelacak Masa Berlaku)**: Input tanggal terbit & tanggal kedaluwarsa (`expired_at`) untuk dokumen berjangka waktu (khususnya **MCU** dan **Paspor**).
* **Aksi & Logika Bisnis**: Admin memvalidasi hasil pindai dokumen unggahan siswa. Jika ditolak, siswa langsung menerima notifikasi alasan revisi di Portal Siswa & WhatsApp. Sistem memberi **tanda peringatan merah (`EXPIRING SOON` / `EXPIRED`)** jika masa berlaku MCU atau Paspor kurang dari 30 hari ($H-30$).

#### Modul 3.5: Generator Surat Resmi (`FR-TU-05`)
* **Sub-Fitur Spesifik**:
  1. **Surat Pengantar Paspor (Kantor Imigrasi)**.
  2. **Surat Rekomendasi Disnaker / Pengantar ID CPMI**.
  3. **Surat Izin Orang Tua / Wali & Kontrak Perjanjian Pelatihan**.
* **Aksi & Logika Bisnis**: Menarik data induk siswa dan orang tua secara otomatis ke dalam *template* surat resmi berkop LPK (termasuk penomoran surat otomatis) dan menghasilkan dokumen dalam format **PDF siap cetak** tanpa pengetikan ulang.

#### Modul 3.6: Offboarding & Laporan Dinas (`FR-TU-06`)
* **Sub-Fitur Spesifik**:
  1. **Pengajuan Siswa Mengundurkan Diri (Cancel)**: Form pembuatan Berita Acara Pembatalan Siswa (alasan berhenti, tanggal efektif, dokumen yang dikembalikan).
  2. **Ekspor Laporan Disnaker / BP2MI (Excel/CSV)**: Generator rekapitulasi siswa aktif, peserta pelatihan, dan penempatan sesuai kolom standar pelaporan Dinas Tenaga Kerja / BP2MI.
* **Aksi & Logika Bisnis**: Pengajuan pembatalan siswa otomatis meneruskan tiket ke **Kalkulator Refund Admin Keuangan** dan meminta persetujuan akhir **Tenant Owner** sebelum status siswa resmi ditutup (`CANCELLED`).

---

### 3.4 Role 4: Sensei / Instruktur
*Fokus: Kegiatan belajar-mengajar harian, absensi, evaluasi nilai bahasa dan fisik, serta penentuan kelayakan wawancara (Gatekeeper Utama).*

#### Modul 4.1: Dashboard Sensei (`FR-SN-01`)
* **Sub-Fitur Spesifik**:
  1. **Jadwal Mengajar Hari Ini**: Daftar sesi kelas hari berjalan beserta ruang kelas, jam, dan bab materi.
  2. **Daftar Kelas yang Diampu**: Ringkasan angkatan/kelas aktif yang menjadi tanggung jawab Sensei tersebut.
  3. **Daftar Siswa Remedial (Nilai di bawah KKM)**: *Highlight* otomatis daftar siswa yang skor evaluasi mingguannya berada di bawah ambang batas kelulusan (*KKM*).
* **Aksi & Logika Bisnis**: Menampilkan ringkasan kelas aktif dan siswa yang membutuhkan bimbingan tambahan sebelum dijadwalkan mengikuti wawancara kerja (*mensetsu*).

#### Modul 4.2: Jadwal & Kurikulum (`FR-SN-02`)
* **Sub-Fitur Spesifik**:
  1. **Jadwal Pelajaran Mingguan**: Kalender akademik kelas (Bahasa, Budaya Kerja/Hourensou, Fisik/Olahraga).
  2. **Tracking Progres Bab Materi**: Pencatatan jurnal mengajar harian berdasarkan kurikulum (contoh: *Minna no Nihongo I & II Bab 1–50*, *Irodori*, atau *Modul EPS-TOPIK Korea*).
* **Aksi & Logika Bisnis**: Mencatat capaian pembelajaran tiap angkatan secara terstruktur agar target kesiapan bahasa sebelum jadwal *mensetsu* terpantau jelas oleh Sensei dan Direktur LPK.

#### Modul 4.3: Absensi Harian Kelas (`FR-SN-03`)
* **Sub-Fitur Spesifik**:
  1. **Input Kehadiran**: Pencatatan status kehadiran harian siswa per sesi kelas: `Hadir (H)`, `Izin (I)`, `Sakit (S)`, `Alpa (A)`.
  2. **Scan QR Code Kartu Siswa**: Fitur pemindaian kamera/scanner pada QR Code Kartu Siswa untuk mencatat kehadiran cepat.
  3. **Rekap Persentase Kehadiran**: Kalkulasi otomatis rasio kehadiran bulanan dan kumulatif per siswa.
* **Aksi & Logika Bisnis (Logika Kedisiplinan Presensi)**:
  Jika seorang siswa tercatat **Alpa 3 kali berturut-turut** ATAU **akumulasi Alpa lebih dari 3 hari dalam sebulan** ($\ge 4$ hari dalam bulan berjalan), sistem secara otomatis:
  1. Mengirimkan **notifikasi peringatan merah** ke dashboard **Admin TU** (untuk tindak lanjut disiplin asrama).
  2. Mengirimkan **pesan WhatsApp otomatis ke nomor Orang Tua/Wali** siswa di daerah.

#### Modul 4.4: Evaluasi & Penilaian (`FR-SN-04`)
* **Sub-Fitur Spesifik**:
  1. **Input Skor Ujian Bahasa**: Pencatatan nilai berkala untuk 4 aspek kompetensi:
     * *Bunpou* (Tata Bahasa & Kosakata)
     * *Kanji* (Aksara)
     * *Choukai* (Mendengarkan / Listening)
     * *Kaiwa* (Percakapan / Speaking)
  2. **Input Tes Ketahanan Fisik**: Pencatatan metrik kebugaran berkala: `Lari (km / menit)`, `Push-up (repetisi)`, `Sit-up (repetisi)`.
  3. **Kalkulasi Rata-Rata & Grafik Progres**: Perhitungan nilai rata-rata tertimbang dan visualisasi grafik perkembangan akademik maupun fisik tiap siswa dari waktu ke waktu.
* **Aksi & Logika Bisnis**: Menghitung skor evaluasi secara otomatis, menandai siswa di bawah KKM sebagai `Remedial`, dan memetakan tren perkembangan siswa di profil mereka.

#### Modul 4.5: Rekomendasi Wawancara (`FR-SN-05`)
* **Sub-Fitur Spesifik**:
  1. **Validasi Status *Layak Mensetsu***: Toggle/centang otorisasi kelayakan wawancara kerja per siswa.
  2. **Penetapan Level Bahasa Aktual**: Penilaian level kompetensi aktual siswa (`Pra-N5`, `N5`, `N4`, `N3`, `JFT-Basic A2`, `TOPIK 1/2`).
  3. **Catatan Karakter & Sikap (*Attitude*)**: Input deskripsi kepribadian, etos kerja, kesopanan (*aisatsu*), dan kekuatan/kelemahan siswa sebagai bahan referensi Staf Penempatan & CV.
* **Aksi & Logika Bisnis (Gatekeeper Utama / Cross-Role Lock 2)**:
  **Staf Penempatan tidak dapat mendaftarkan siswa ke lowongan kerja luar negeri (*Job Order*) sebelum Sensei mencentang status `Layak Mensetsu = TRUE`**.

---

### 3.5 Role 5: Staf Penempatan (Job Matching)
*Fokus: Penyaluran kandidat ke mitra luar negeri, manajemen wawancara (mensetsu), pengurusan CoE/Visa, dan database alumni.*

#### Modul 5.1: Dashboard Penempatan (`FR-SP-01`)
* **Sub-Fitur Spesifik**:
  1. **Kuota Job Order Aktif**: Ringkasan jumlah lowongan terbuka vs jumlah kandidat yang sudah terpenuhi.
  2. **Jadwal Mensetsu Terdekat**: Kalender wawancara kerja yang akan berlangsung dalam 7–14 hari ke depan.
  3. **Statistik Progres CoE & Visa Siswa**: Ringkasan jumlah siswa di tiap tahap pengurusan imigrasi pasca-lolos wawancara.
* **Aksi & Logika Bisnis**: Memantau alur penyaluran tenaga kerja secara menyeluruh agar tidak ada tenggat pengumpulan CV atau jadwal keberangkatan yang terlewat.

#### Modul 5.2: Mitra & Job Order (`FR-SP-02`)
* **Sub-Fitur Spesifik**:
  1. **Database *Sending Organization* (SO) & Perusahaan Penerima (*User/Kumiai*)**: Direktori mitra penyalur dan perusahaan pemberi kerja di Jepang/Korea (nama perusahaan, prefektur/kota, bidang industri, kontak PIC).
  2. **Input Spesifikasi Lowongan (*Job Order*)**: Form pembuatan lowongan kerja dengan parameter kriteria terstruktur:
     * Sektor Pekerjaan (Konstruksi, Pengolahan Makanan, Pertanian, Kaigo/Lansia, Manufaktur, Perhotelan, dll.)
     * Kuota Kebutuhan & Rasio Kandidat (misal: Butuh 5 orang, seleksi 15 kandidat)
     * Estimasi Gaji Pokok (JPY/KRW), Batas Usia (`min_age` – `max_age`), Tinggi Badan Minimal (`min_height_cm`), Gender (`Laki-laki / Perempuan / Semua`), Batas Minus Mata / Buta Warna, Level Bahasa Minimal, dan Batas Waktu (*Deadline*) Seleksi.
* **Aksi & Logika Bisnis**: Menyimpan seluruh kriteria permintaan tenaga kerja dari luar negeri sebagai parameter acuan mesin *Smart Matching*.

#### Modul 5.3: Smart Matching & CV (`FR-SP-03`)
* **Sub-Fitur Spesifik**:
  1. **Auto-Filter Kandidat Sesuai Syarat Job**: Mesin pencocokan otomatis yang menyaring daftar siswa berdasarkan spesifikasi *Job Order*.
  2. **Auto-Generate CV Jepang (*Rirekisho*) / Korea**: Generator 1-klik untuk mencetak CV dalam format tabel baku Jepang (JIS) atau Korea lengkap dengan konversi nama Katakana, tahun kalender Jepang, hasil tes fisik, catatan karakter dari Sensei, dan pasfoto formal.
  3. **Manajemen Video Perkenalan (*Jikoshoukai*)**: Penyimpanan tautan/file video perkenalan diri bahasa Jepang/Korea milik masing-masing siswa untuk dibagikan ke mitra luar negeri.
* **Aksi & Logika Bisnis (Cross-Role Lock Enforcement)**:
  Mesin *Smart Matching* **hanya menampilkan dan mengizinkan pendaftaran siswa** yang memenuhi 3 syarat mutlak:
  1. Berstatus **`Layak Mensetsu = TRUE`** dari Sensei.
  2. Bebas masalah disiplin (**poin pelanggaran asrama $< 100$** dan status bukan `Suspended`).
  3. Memenuhi kriteria fisik & usia pada *Job Order* tersebut.

#### Modul 5.4: Manajemen Wawancara / Mensetsu (`FR-SP-04`)
* **Sub-Fitur Spesifik**:
  1. **Penjadwalan Mensetsu (Zoom / Tatap Muka)**: Pengaturan tanggal, jam, lokasi atau tautan Zoom wawancara, serta daftar kandidat peserta.
  2. **Input Hasil Wawancara**: Penetapan status akhir per kandidat: `Lolos (Passed)`, `Cadangan (Reserve)`, atau `Gagal (Failed)` beserta catatan evaluasi pewawancara.
  3. **Logika Rematching Kandidat Gagal**: Pengelolaan histori wawancara *Many-to-Many*.
* **Aksi & Logika Bisnis (Cross-Role Trigger 3)**:
  * **Jika LOLOS**: Status siswa otomatis berpindah ke `Lolos Wawancara` dan masuk ke **Pipeline Keberangkatan (CoE & Visa)**.
  * **Jika GAGAL**: Riwayat dan catatan evaluasi kegagalan tersimpan permanen di profil siswa (dan dapat dilihat siswa/Sensei untuk perbaikan), lalu **status siswa otomatis dikembalikan ke *pool* kandidat `Siap Wawancara`** sehingga langsung bisa didaftarkan ke *Job Order* berikutnya tanpa input ulang.

#### Modul 5.5: Pipeline Keberangkatan (`FR-SP-05`)
* **Sub-Fitur Spesifik**:
  1. **Stepper Pasca-Lolos 5 Tahap**:
     $$\text{1. Kontrak Kerja} \rightarrow \text{2. Pengajuan CoE} \rightarrow \text{3. CoE Turun} \rightarrow \text{4. Apply Visa} \rightarrow \text{5. Tiket & Terbang}$$
  2. Pencatatan nomor dokumen, tanggal terbit, dan unggah bukti dokumen di setiap tahapan stepper.
* **Aksi & Logika Bisnis (Cross-Role Lock 4 & Trigger 5)**:
  * Mengawal proses imigrasi selama 2–4 bulan.
  * **Kunci Financial Gatekeeping**: Tahap **4. Apply Visa** dan **5. Tiket & Terbang** **TERKUNCI** secara sistem apabila modul Keuangan belum memverifikasi pelunasan biaya pra-keberangkatan atau persetujuan akad dana talangan.
  * Saat status mencapai tahap akhir **Terbang**, siswa otomatis dipindahkan ke modul **Database Alumni** dan memicu pengaktifan jadwal cicilan dana talangan di modul Keuangan.

#### Modul 5.6: Database Alumni (`FR-SP-06`)
* **Sub-Fitur Spesifik**:
  1. **Pelacakan Perusahaan & Kota Kerja**: Pencatatan perusahaan penerima, kota/prefektur penempatan di luar negeri, tanggal tiba, dan kontak darurat.
  2. **Pengingat Habis Kontrak (3 / 5 Tahun)**: *Countdown* otomatis masa kontrak kerja (3 tahun atau 5 tahun sejak tanggal terbang) dengan peringatan $H-90$ sebelum kontrak berakhir.
  3. **Peluang Perpanjangan / Pindah Visa SSW (*Tokutei Ginou*)**: Penandaan alumni yang berpotensi memperpanjang kontrak atau naik tingkat ke program *Specified Skilled Worker (SSW)*.
* **Aksi & Logika Bisnis**: Menjaga database alumni di luar negeri untuk kebutuhan pelaporan dinas, pemantauan cicilan dana talangan, dan monetisasi penempatan ulang (*repeat placement*).

---

### 3.6 Role 6: Admin Keuangan
*Fokus: Pengelolaan tagihan pendidikan & pemberangkatan, pencatatan cicilan dana talangan, kontrol penguncian finansial (financial gatekeeping), dan kas operasional LPK.*

#### Modul 6.1: Dashboard Keuangan (`FR-KU-01`)
* **Sub-Fitur Spesifik**:
  1. **Pemasukan Hari Ini & Bulan Berjalan**: Ringkasan kas masuk dari pembayaran siswa secara *real-time*.
  2. **Total Piutang / Tunggakan per Angkatan**: Tabel dan grafik sisa kewajiban pembayaran siswa dikelompokkan per gelombang/angkatan.
  3. **Perbandingan Kas Masuk vs Operasional**: Visualisasi arus kas (*cashflow*) antara dana masuk dan pengeluaran operasional kantor/asrama.
* **Aksi & Logika Bisnis**: Memberikan visibilitas penuh atas likuiditas keuangan LPK dan daftar siswa yang memiliki tunggakan jatuh tempo.

#### Modul 6.2: Tagihan & Pembayaran (`FR-KU-02`)
* **Sub-Fitur Spesifik**:
  1. **Rencana Tagihan Otomatis**: Komponen tagihan terstruktur (`Biaya Pendaftaran/MCU`, `SPP Pendidikan & Asrama`, `Biaya Pemberangkatan/Job`) yang terbit otomatis saat siswa diaktifkan oleh Admin TU.
  2. **Input Pembayaran (Tunai / Transfer)**: Pencatatan pembayaran masuk beserta unggah bukti transfer, metode pembayaran, dan pemilihan termin tagihan.
  3. **Kuitansi Digital PDF via WhatsApp**: Generator kuitansi resmi berkop LPK yang dilengkapi **QR Code Verifikasi Keaslian**.
* **Aksi & Logika Bisnis**: Setiap pembayaran masuk otomatis memotong saldo piutang siswa, mencatat jurnal di buku kas, dan mengirimkan **kuitansi digital PDF ber-QR Code ke WhatsApp siswa dan orang tua** secara instan. (Penghapusan atau pengeditan transaksi yang sudah tersimpan wajib melalui *Approval* Tenant Owner).

#### Modul 6.3: Manajemen Dana Talangan (`FR-KU-03`)
* **Sub-Fitur Spesifik**:
  1. **Pencatatan Skema Pembiayaan**: Penetapan metode pembiayaan keberangkatan tiap siswa: `Biaya Mandiri (Lunas Pra-Terbang)` vs `Dana Talangan (Internal LPK / Koperasi / Bank Mitra)`.
  2. **Jadwal Potong Gaji Pasca-Terbang**: Tabel amortisasi cicilan bulanan (pokok + margin/bunga jika ada, tanggal jatuh tempo bulanan selama 6–24 bulan) saat siswa sudah bekerja di luar negeri.
* **Aksi & Logika Bisnis**: Memantau kewajiban cicilan dana talangan siswa secara berkelanjutan meskipun siswa tersebut sudah berstatus **Alumni** dan bekerja di Jepang/Korea.

#### Modul 6.4: Financial Gatekeeping (`FR-KU-04`)
* **Sub-Fitur Spesifik**:
  1. **Pengingat Jatuh Tempo Otomatis WA**: Pengiriman pesan pengingat tagihan (*invoice reminder*) otomatis via WhatsApp pada $H-7$, $H-3$, dan saat jatuh tempo ke siswa & orang tua.
  2. **Penguncian & Pembukaan Kunci Tahap Visa / Tiket Pesawat**: Kontrol validasi status `Financial Cleared (Lunas / Akad Talangan Disetujui)`.
* **Aksi & Logika Bisnis (Cross-Role Lock 4)**:
  Jika kewajiban biaya pra-keberangkatan siswa **belum lunas** DAN **tidak memiliki akad dana talangan yang terverifikasi**, sistem memunculkan **tanda kunci merah (`FINANCIAL LOCK`)** di modul Staf Penempatan sehingga siswa tidak dapat diproses ke tahap *Apply Visa* maupun *Tiket & Terbang*.

#### Modul 6.5: Kalkulator Refund (`FR-KU-05`)
* **Sub-Fitur Spesifik**:
  1. **Simulasi & Pengajuan Pengembalian Dana Siswa Batal (Cancel)**: Antarmuka kalkulator yang menarik data otomatis `Total Setoran Masuk Siswa` dikurangi rincian komponen biaya yang sudah terpakai (`Biaya MCU`, `Pembuatan Paspor`, `Seragam & Modul`, `Biaya Makan/Asrama Terpakai`, `Penalti Pembatalan sesuai Kontrak`).
* **Aksi & Logika Bisnis**: Menghitung otomatis nilai bersih dana pengembalian (*net refund*) bagi siswa yang mengundurkan diri, melampirkan rincian perhitungannya, dan mengirimkannya ke **Pusat Persetujuan (Approval) Tenant Owner** sebelum dana dapat dicairkan.

#### Modul 6.6: Kas Operasional LPK (`FR-KU-06`)
* **Sub-Fitur Spesifik**:
  1. **Pencatatan Pengeluaran Kantor & Asrama**: Jurnal pengeluaran harian berdasarkan kategori (`Listrik & Air`, `Katering/Makan Asrama`, `Gaji Staf & Sensei`, `Sewa Gedung`, `ATK & Modul`, `Pemasaran/Komisi`).
  2. **Laporan Buku Kas & Laba Rugi**: Rekapitulasi keuangan bulanan dan tahunan yang dapat diekspor ke PDF/Excel.
* **Aksi & Logika Bisnis**: **Pemisahan Dana**: Memisahkan secara tegas dana titipan pemberangkatan siswa (*escrow/unearned revenue*) dengan biaya operasional harian kantor agar laporan keuangan dan laba rugi LPK tetap akurat dan sehat.

---

### 3.7 Role 7: Siswa / Kandidat (Portal Mobile Web)
*Fokus: Transparansi progres mandiri via smartphone (Mobile-First Responsive Web / PWA) untuk mengurangi beban pertanyaan berulang dari siswa dan orang tua ke staf admin.*

#### Modul 7.1: Beranda / Progress Tracker (`FR-SW-01`)
* **Sub-Fitur Spesifik**:
  1. **Visualisasi Timeline Tahapan Pelatihan**: Stepper visual interaktif yang menampilkan posisi siswa saat ini:
     $$\text{PPDB} \rightarrow \text{Belajar} \rightarrow \text{Siap Wawancara} \rightarrow \text{Proses Visa} \rightarrow \text{Terbang}$$
  2. **To-Do List Kekurangan Berkas & Tagihan**: Daftar tugas mendesak yang harus segera diselesaikan siswa (misal: *"Unggah ulang scan KK"*, *"Tagihan SPP Bulan ke-2 jatuh tempo 5 hari lagi"*).
* **Aksi & Logika Bisnis**: Menampilkan posisi tahap siswa secara *real-time* beserta kartu aksi cepat untuk menyelesaikan administrasi yang tertunda.

#### Modul 7.2: Profil & Upload Berkas (`FR-SW-02`)
* **Sub-Fitur Spesifik**:
  1. **Pengisian Biodata Lengkap (Bahan CV)**: Formulir mandiri bagi siswa untuk melengkapi detail biodata pribadi, keluarga, dan riwayat pendidikan/kerja yang akan menjadi sumber data *Rirekisho*.
  2. **Unggah Scan Dokumen via Kamera HP**: Fitur unggah file atau ambil foto langsung dari kamera smartphone (dengan kompresi gambar otomatis) untuk KTP, KK, Akta, Ijazah, Paspor, MCU, dll.
  3. **Status Verifikasi (`Menunggu` / `Valid` / `Ditolak`)**: Lencana status di setiap item dokumen.
* **Aksi & Logika Bisnis**: Siswa mengunggah dokumen secara mandiri. Jika dokumen ditolak oleh Admin TU, siswa langsung melihat **kotak alasan penolakan** berwarna merah dan tombol **`Unggah Ulang`** aktif kembali. Dokumen yang sudah berstatus `Valid` dikunci agar tidak tertimpa tanpa izin TU.

#### Modul 7.3: Akademik & Disiplin (`FR-SW-03`)
* **Sub-Fitur Spesifik**:
  1. **Jadwal Kelas Harian & Materi**: Tampilan jadwal pelajaran hari ini, ruang kelas, nama Sensei, dan progres bab materi.
  2. **Rekap Kehadiran & Poin Pelanggaran**: Persentase kehadiran kelas, rincian jumlah Hadir/Izin/Sakit/Alpa, serta bar indikator **Poin Pelanggaran Disiplin Asrama** (`X / 100 Poin`).
  3. **Grafik Nilai Ujian dari Sensei**: Visualisasi skor ujian bahasa (*Bunpou, Kanji, Choukai, Kaiwa*), tes fisik, level bahasa aktual (N5/N4), serta status indikator **`Layak Mensetsu`**.
* **Aksi & Logika Bisnis**: Akses *Read-Only* yang transparan agar siswa dan orang tua mengetahui kelayakan akademik serta kedisiplinan mereka untuk direkomendasikan ikut wawancara kerja.

#### Modul 7.4: Karir & Wawancara (`FR-SW-04`)
* **Sub-Fitur Spesifik**:
  1. **Daftar Job Order Tersedia**: Informasi lowongan kerja luar negeri yang sedang dibuka di LPK (sektor, lokasi, estimasi gaji, syarat).
  2. **Jadwal & Lokasi/Link Mensetsu**: Kartu pemberitahuan jadwal wawancara kerja yang diikuti siswa beserta tautan Zoom atau ruangan wawancara.
  3. **Status Hasil & Evaluasi Wawancara**: Riwayat seluruh wawancara yang pernah diikuti (`Lolos`, `Cadangan`, `Gagal`) beserta catatan evaluasi/masukan dari Sensei dan Staf Penempatan.
* **Aksi & Logika Bisnis**: Menampilkan jadwal wawancara mendatang serta catatan masukan tertulis apabila siswa belum lolos wawancara sebelumnya agar siswa dapat memperbaiki performanya di wawancara berikutnya.

#### Modul 7.5: Keuangan Mandiri (`FR-SW-05`)
* **Sub-Fitur Spesifik**:
  1. **Rincian Total Biaya & Sisa Tagihan**: Ringkasan total biaya program, total yang sudah dibayar, dan sisa piutang/cicilan.
  2. **Jadwal Jatuh Tempo Cicilan Berikutnya**: Tabel rincian termin pembayaran pendidikan, pra-terbang, maupun jadwal cicilan dana talangan pasca-terbang.
  3. **Unduh Kuitansi Digital Lunas**: Tombol unduh langsung file PDF kuitansi resmi ber-QR Code untuk setiap transaksi yang telah diverifikasi Admin Keuangan.
* **Aksi & Logika Bisnis**: Memberikan transparansi penuh atas riwayat pembayaran siswa kepada siswa dan orang tua di daerah sehingga meminimalkan miskomunikasi atau potensi penyalahgunaan uang titipan.

---

## BAB 4: Alur Kerja Lintas Divisi & Titik Penguncian Sistem (Cross-Role Locks)

Kekuatan utama SiapTerbang terletak pada integrasi logika antar-divisi (*Cross-Role Locks*) yang memastikan tidak ada tahapan yang terlewat atau dilompati secara tidak sah. Seluruh aturan di bawah ini wajib ditegakkan baik di level antarmuka (*UI state*) maupun di level *Backend API / Database Guard*:

| Tahap Alur | Aktor Pemicu | Kondisi / Aksi Pemicu | Dampak Otomatis & Penguncian ke Divisi Lain |
| :--- | :--- | :--- | :--- |
| **1. Aktivasi Siswa Baru** | **Admin TU** | Mengubah status pendaftar PPDB menjadi **`Lulus Seleksi`**. | 1. Sistem menerbitkan **Nomor Induk Siswa (NIS)** otomatis.<br>2. **Akun Mobile Web Siswa** langsung aktif otomatis.<br>3. Modul **Admin Keuangan** otomatis membuatkan rencana tagihan pendidikan & pemberangkatan untuk siswa tersebut. |
| **2. Validasi Kesiapan Belajar** | **Sensei** & **Admin TU** | Sensei menginput absensi & nilai, lalu mencentang status **`Layak Mensetsu`**. | 1. Nama siswa terbuka di modul **Smart Matching** milik **Staf Penempatan**.<br>2. **LOCK**: Tanpa centang `Layak Mensetsu` dari Sensei (**ATAU** jika poin disiplin asrama di Admin TU $\ge 100$), siswa **terkunci dan tidak bisa didaftarkan ke Job Order mana pun**. |
| **3. Siklus Wawancara (Mensetsu)** | **Staf Penempatan** | Mendaftarkan kandidat ke *Job Order* & menginput hasil wawancara. | 1. **Jika LOLOS**: Siswa otomatis masuk ke **Pipeline CoE & Visa**.<br>2. **Jika GAGAL**: Riwayat evaluasi tercatat di profil siswa, dan status siswa **otomatis kembali ke *pool* siap wawancara** untuk dicocokkan ke *Job Order* berikutnya (*Many-to-Many*). |
| **4. Kontrol Keuangan Pra-Terbang** | **Admin Keuangan** | Memverifikasi pelunasan tahap pra-keberangkatan atau menyetujui skema **Dana Talangan**. | 1. **LOCK / UNLOCK**: Membuka kunci tahap **Apply Visa** & **Tiket Pesawat** di modul **Staf Penempatan** (sebelum diverifikasi Keuangan, kedua tahap ini terkunci).<br>2. **Kuitansi PDF ber-QR Code** otomatis terkirim ke WhatsApp siswa & orang tua. |
| **5. Keberangkatan & Alumni** | **Staf Penempatan** | Memperbarui status akhir pipeline keberangkatan menjadi **`Terbang`**. | 1. Status siswa otomatis berubah menjadi **`Alumni`** dan masuk ke **Database Alumni**.<br>2. Sistem menghitung otomatis **tanggal habis kontrak (3 atau 5 tahun)**.<br>3. Mengaktifkan jadwal pantauan **cicilan potong gaji Dana Talangan** di modul **Admin Keuangan**. |

---

## BAB 5: Model Monetisasi SaaS & Roadmap Pengembangan Produk

### 5.1 Skema Paket Langganan (Tiered Pricing SaaS)

Sistem *Feature Gating* pada modul Super Admin dan Tenant Owner wajib mengimplementasikan batasan kuota sesuai tabel berikut:

| Paket Langganan | Target Pelanggan | Batasan Kuota & Fitur Utama | Estimasi Harga |
| :--- | :--- | :--- | :--- |
| **Paket Starter** | LPK Rintisan / Skala Kecil | • Maksimal **100 Siswa Aktif** & **5 Staf**<br>• Storage Dokumen **5 GB**<br>• Modul PPDB, Akademik, Pemberkasan, & Keuangan Dasar<br>• *Fitur Auto-Rirekisho, WA Gateway & Dana Talangan Terkunci* | **Rp 500.000 – Rp 750.000** / bulan |
| **Paket Pro** *(Best Seller)* | LPK Berkembang / Pengirim Aktif | • Siswa & Staf **Tidak Terbatas (Unlimited)**<br>• Storage Dokumen **50 GB**<br>• **Auto-Generate CV Jepang (Rirekisho)** & Surat Resmi PDF<br>• **Integrasi Notifikasi WhatsApp Gateway** & **Manajemen Dana Talangan** | **Rp 1.500.000 – Rp 2.500.000** / bulan |
| **Paket Enterprise** | Asosiasi LPK / *Sending Organization* (SO) | • **Multi-Cabang LPK** & **Custom Domain Sendiri**<br>• **Portal Akses Mitra Luar Negeri (*Read-Only*)**<br>• Dedicated Server / Storage Custom & Migrasi Data Prioritas | **Rp 4.000.000+** / bulan *(+ Setup Fee)* |

### 5.2 Tahapan Pengembangan Produk (Product Roadmap)

| Fase Pengembangan | Fokus Deliverable | Target Output |
| :--- | :--- | :--- |
| **Fase 1: MVP** *(Bulan 1–2)* | Arsitektur Multi-Tenant, RBAC 7 Role (Multi-Role per Akun), PPDB, Pemberkasan + Expiry Tracker, Absensi/Nilai Sensei, Tagihan Dasar, Cross-Role Locks, & Portal Siswa. | Sistem siap digunakan oleh 3–5 LPK percontohan (*Early Adopters*) untuk validasi alur lapangan. |
| **Fase 2: Otomasi & Monetisasi** *(Bulan 3–4)* | Auto-Generate *Rirekisho* & Surat PDF berkop LPK, Integrasi WhatsApp Gateway, Siklus Rematching *Mensetsu*, Kalkulator Refund, Dana Talangan, & Billing Otomatis SaaS (VA/QRIS). | Siap dipasarkan secara komersial ke asosiasi LPK daerah (Jawa Barat, Jawa Tengah, Jawa Timur). |
| **Fase 3: Ekspansi Ekosistem** *(Bulan 5+)* | Portal Mitra Luar Negeri (*User* Jepang/Korea *Read-Only*), Manajemen Dana Talangan Lanjutan (Multi-Koperasi), Multi-Cabang LPK, & Aplikasi Mobile Native. | Skalabilitas ke ratusan tenant LPK dengan retensi jangka panjang. |

---

## BAB 6: Kriteria Penerimaan Global (Acceptance Criteria)

1. **Isolasi Multi-Tenant 100%**: Tidak boleh ada satu pun kueri atau endpoint yang membocorkan data siswa, staf, dokumen, atau keuangan dari `tenant_id` A ke `tenant_id` B.
2. **Dukungan Multi-Role Tanpa Konflik**: Satu akun staf yang dicentang memiliki role `ADMIN_TU` dan `ADMIN_KEUANGAN` harus dapat mengakses seluruh menu kedua role tersebut dalam satu sesi login.
3. **Penegakan Cross-Role Locks di Backend**: Upaya memanggil API pendaftaran kandidat *Job Order* untuk siswa yang belum dicentang `Layak Mensetsu` oleh Sensei atau memiliki `poin_disiplin >= 100` harus ditolak dengan HTTP `403 Forbidden / 422 Unprocessable Entity` beserta pesan alasan penguncian yang jelas.
4. **Anti-Fraud Approval**: Penghapusan transaksi pembayaran, pemberian diskon, pencairan refund, dan pembatalan siswa aktif oleh staf operasional wajib berstatus `PENDING_APPROVAL` hingga disetujui oleh `TENANT_OWNER`.
5. **Kepatuhan Otomasi Peringatan**:
   * Dokumen Paspor/MCU dengan sisa masa berlaku $\le 30$ hari wajib ditandai merah di dashboard Admin TU dan Tenant Owner.
   * Siswa dengan Alpa $3\times$ berturut-turut atau $> 3$ hari dalam 1 bulan wajib memicu alert ke Admin TU dan pesan WhatsApp ke nomor orang tua.
