"use client";

import { useState } from "react";
import Link from "next/link";
import type { RegisterFormValues, RegisterValidationErrors } from "@/types/auth";

export function RegisterFormCard() {
  const [values, setValues] = useState<RegisterFormValues>({
    fullName: "",
    lpkName: "",
    email: "",
    whatsapp: "",
    subdomain: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatSubdomain = (raw: string) =>
    raw
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-");

  const handleLpkNameChange = (name: string) => {
    setValues((prev) => {
      const autoSub = formatSubdomain(name.replace(/\s+/g, ""));
      return {
        ...prev,
        lpkName: name,
        subdomain: prev.subdomain === "" || prev.subdomain === formatSubdomain(prev.lpkName.replace(/\s+/g, "")) ? autoSub : prev.subdomain,
      };
    });
  };

  const validate = (): boolean => {
    const nextErrors: RegisterValidationErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Nama lengkap penanggung jawab wajib diisi";
    }

    if (!values.lpkName.trim()) {
      nextErrors.lpkName = "Nama resmi LPK / SO wajib diisi";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email resmi LPK wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Format email tidak valid";
    }

    if (!values.whatsapp.trim()) {
      nextErrors.whatsapp = "Nomor WhatsApp aktif wajib diisi";
    } else if (values.whatsapp.trim().length < 9) {
      nextErrors.whatsapp = "Nomor WhatsApp minimal 9 digit";
    }

    if (!values.subdomain.trim()) {
      nextErrors.subdomain = "Subdomain LPK wajib diisi";
    } else if (values.subdomain.length < 3) {
      nextErrors.subdomain = "Subdomain minimal 3 karakter";
    }

    if (!values.password) {
      nextErrors.password = "Kata sandi wajib diisi";
    } else if (values.password.length < 6) {
      nextErrors.password = "Kata sandi minimal 6 karakter";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    window.setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="w-full max-w-[480px] rounded-[36px] bg-[#ffffff]/82 p-7 shadow-[0_24px_50px_rgba(20,40,80,0.08)] ring-1 ring-[#ffffff]/90 backdrop-blur-2xl sm:p-9">
      {/* Top Center Icon Badge matching login reference */}
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] to-[#eaf2fb] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ring-1 ring-[#ffffff]">
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1f2025"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      </div>

      {/* Heading & Subtitle */}
      <div className="text-center">
        <h1 className="text-[26px] font-bold tracking-tight text-[#1f2025] sm:text-[28px]">
          Daftar Akun LPK Baru
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#747679]">
          Coba gratis 14 hari penuh. Dapatkan ruang kerja eksklusif terisolasi untuk seluruh divisi LPK Anda.
        </p>
      </div>

      {isSuccess ? (
        <div className="mt-6 rounded-[22px] bg-[#ebf0f8] p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#31ce01]/20 text-[#1e8300]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="mt-3 text-[18px] font-bold text-[#222326]">
            Ruang Kerja Berhasil Dibuat
          </h2>
          <p className="mt-2 text-[13.5px] text-[#747679]">
            Subdomain khusus LPK Anda telah siap diaktifkan:
          </p>
          <div className="mt-3 rounded-xl bg-[#ffffff] p-3 font-mono text-[14px] font-bold text-[#415eee] ring-1 ring-[#222326]/6">
            https://{values.subdomain}.siapterbang.id
          </div>
          <p className="mt-3 text-[12.5px] text-[#747679]">
            Instruksi aktivasi dan kredensial login telah dikirimkan ke <strong>{values.email}</strong> dan nomor WhatsApp Anda.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-block rounded-full bg-[#1f2025] px-6 py-2.5 text-[14px] font-semibold text-[#ffffff] hover:bg-[#000000]"
          >
            Masuk ke Portal LPK
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
          {/* Full Name Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8f95a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                value={values.fullName}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="Nama Lengkap Penanggung Jawab"
                aria-label="Nama Lengkap Penanggung Jawab"
                className="w-full bg-transparent text-[14px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* LPK Name Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8f95a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
              </svg>
              <input
                type="text"
                name="lpkName"
                value={values.lpkName}
                onChange={(e) => handleLpkNameChange(e.target.value)}
                placeholder="Nama Resmi Lembaga / LPK"
                aria-label="Nama Resmi Lembaga / LPK"
                className="w-full bg-transparent text-[14px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
              />
            </div>
            {errors.lpkName && (
              <p className="mt-1 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.lpkName}
              </p>
            )}
          </div>

          {/* Subdomain Field */}
          <div>
            <div className="flex items-center overflow-hidden rounded-[16px] bg-[#f0f3f8]/90 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <div className="flex flex-1 items-center gap-2 px-4 py-3">
                <span className="text-[13px] font-medium text-[#747679]">https://</span>
                <input
                  type="text"
                  name="subdomain"
                  value={values.subdomain}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      subdomain: formatSubdomain(e.target.value),
                    }))
                  }
                  placeholder="namalpk"
                  aria-label="Subdomain LPK"
                  className="w-full bg-transparent font-mono text-[13.5px] font-semibold text-[#222326] placeholder-[#8f95a3] focus:outline-none"
                />
              </div>
              <span className="bg-[#ebf0f8] px-3.5 py-3 font-mono text-[12px] font-semibold text-[#1f2025]">
                .siapterbang.id
              </span>
            </div>
            {errors.subdomain && (
              <p className="mt-1 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.subdomain}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8f95a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email Operasional LPK"
                aria-label="Email Operasional LPK"
                className="w-full bg-transparent text-[14px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="mt-1 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.email}
              </p>
            )}
          </div>

          {/* WhatsApp Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8f95a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <input
                type="tel"
                name="whatsapp"
                autoComplete="tel"
                value={values.whatsapp}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, whatsapp: e.target.value }))
                }
                placeholder="Nomor WhatsApp Direktur / Admin (+62...)"
                aria-label="Nomor WhatsApp"
                className="w-full bg-transparent text-[14px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
              />
            </div>
            {errors.whatsapp && (
              <p className="mt-1 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.whatsapp}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8f95a3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={values.password}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Kata Sandi Baru"
                aria-label="Kata Sandi Baru"
                className="w-full bg-transparent text-[14px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
              />
              <button
                type="button"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 text-[#8f95a3] hover:text-[#222326]"
              >
                {showPassword ? (
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-[16px] bg-[#1f2025] py-3.5 text-[15px] font-semibold text-[#ffffff] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all hover:bg-[#000000] active:scale-[0.99] disabled:opacity-75"
          >
            {isLoading ? "Menyiapkan Ruang Kerja..." : "Mulai Coba Gratis 14 Hari"}
          </button>

          {/* Divider */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="w-full border-t border-[#ebf0f8]" />
            <span className="absolute bg-[#ffffff] px-3 text-[12px] text-[#8f95a3]">
              Or sign up with
            </span>
          </div>

          {/* 3 SSO Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              aria-label="Daftar dengan Google"
              onClick={() => alert("SSO Google terintegrasi untuk verifikasi akun LPK.")}
              className="flex h-11 items-center justify-center rounded-[16px] bg-[#ffffff] ring-1 ring-[#222326]/10 transition-colors hover:bg-[#f8f9fc]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.09C3.26 21.3 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.38l4.01-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.7 1.26 6.62l4.01 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Daftar dengan Facebook"
              onClick={() => alert("SSO Facebook terintegrasi.")}
              className="flex h-11 items-center justify-center rounded-[16px] bg-[#ffffff] ring-1 ring-[#222326]/10 transition-colors hover:bg-[#f8f9fc]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Daftar dengan Apple"
              onClick={() => alert("Sign in with Apple terintegrasi.")}
              className="flex h-11 items-center justify-center rounded-[16px] bg-[#ffffff] ring-1 ring-[#222326]/10 transition-colors hover:bg-[#f8f9fc]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.81 1.44-.6.69-1.12 1.84-.98 2.95 1.07.08 2.15-.54 2.8-1.29z" />
              </svg>
            </button>
          </div>

          {/* Link to Login */}
          <p className="pt-3 text-center text-[13px] text-[#747679]">
            Sudah memiliki akun LPK?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1f2025] underline decoration-[#1f2025]/30 underline-offset-2 hover:decoration-[#1f2025]"
            >
              Masuk di sini
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
