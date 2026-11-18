"use client";

import { useState } from "react";
import type { LoginFormValues, LoginValidationErrors } from "@/types/auth";
import { SIX_LPK_DEMO_ACCOUNTS } from "@/domain/auth-demo-accounts";

export function LoginFormCard() {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successRole, setSuccessRole] = useState<string | null>(null);
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  const validate = (): boolean => {
    const nextErrors: LoginValidationErrors = {};
    if (!values.email.trim()) {
      nextErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Format email tidak valid";
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
      const matched = SIX_LPK_DEMO_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === values.email.toLowerCase()
      );
      setSuccessRole(matched ? matched.roleName : "Pengguna LPK Terverifikasi");
    }, 700);
  };

  const handleSelectDemoAccount = (acc: typeof SIX_LPK_DEMO_ACCOUNTS[number]) => {
    setValues({
      email: acc.email,
      password: acc.defaultPass,
    });
    setErrors({});
    setShowDemoSelector(false);
  };

  return (
    <div className="w-full max-w-[430px] rounded-[36px] bg-[#ffffff]/82 p-7 shadow-[0_24px_50px_rgba(20,40,80,0.08)] ring-1 ring-[#ffffff]/90 backdrop-blur-2xl sm:p-9">
      {/* Top Center Icon Badge matching reference */}
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
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      </div>

      {/* Heading & Subtitle */}
      <div className="text-center">
        <h1 className="text-[26px] font-bold tracking-tight text-[#1f2025] sm:text-[28px]">
          Sign in with email
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#747679]">
          Kelola seluruh operasional, siswa, dan penempatan luar negeri LPK Anda dalam satu sistem.
        </p>
      </div>

      {successRole ? (
        <div className="mt-6 rounded-[22px] bg-[#ebf0f8] p-5 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#31ce01]/20 text-[#1e8300]">
            <svg
              width="20"
              height="20"
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
          <h2 className="mt-3 text-[17px] font-bold text-[#222326]">
            Autentikasi Berhasil
          </h2>
          <p className="mt-1 text-[13px] text-[#747679]">
            Membuka sesi untuk <strong>{successRole}</strong>...
          </p>
          <button
            type="button"
            onClick={() => setSuccessRole(null)}
            className="mt-4 rounded-full bg-[#1f2025] px-5 py-2 text-[13px] font-semibold text-[#ffffff] hover:bg-[#000000]"
          >
            Ganti Akun
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>
          {/* Email Input Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3.5 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="18"
                height="18"
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
                placeholder="Email"
                aria-label="Alamat Email"
                className="w-full bg-transparent text-[14.5px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#f0f3f8]/90 px-4 py-3.5 ring-1 ring-transparent transition-all focus-within:bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#1f2025]/20">
              <svg
                aria-hidden="true"
                width="18"
                height="18"
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
                autoComplete="current-password"
                value={values.password}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Password"
                aria-label="Kata Sandi"
                className="w-full bg-transparent text-[14.5px] text-[#222326] placeholder-[#8f95a3] focus:outline-none"
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
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
              <p className="mt-1.5 px-2 text-[12px] font-medium text-[#a93f22]">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-0.5">
            <a
              href="#lupa-password"
              onClick={(e) => {
                e.preventDefault();
                alert("Silakan hubungi Super Admin platform atau Admin TU LPK Anda untuk reset kredensial.");
              }}
              className="text-[13px] font-medium text-[#747679] transition-colors hover:text-[#222326]"
            >
              Forgot password?
            </a>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-[16px] bg-[#1f2025] py-3.5 text-[15px] font-semibold text-[#ffffff] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all hover:bg-[#000000] active:scale-[0.99] disabled:opacity-75"
          >
            {isLoading ? "Memverifikasi..." : "Get Started"}
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-[#ebf0f8]" />
            <span className="absolute bg-[#ffffff] px-3 text-[12px] text-[#8f95a3]">
              Or sign in with
            </span>
          </div>

          {/* 3 SSO Buttons (Google, Facebook, Apple) matching reference */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Google */}
            <button
              type="button"
              aria-label="Sign in with Google"
              onClick={() => alert("Fitur Single Sign-On Google siap dihubungkan dengan Google Workspace LPK.")}
              className="flex h-12 items-center justify-center rounded-[16px] bg-[#ffffff] ring-1 ring-[#222326]/10 transition-colors hover:bg-[#f8f9fc]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
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

            {/* Facebook */}
            <button
              type="button"
              aria-label="Sign in with Facebook"
              onClick={() => alert("Fitur Login SSO Facebook siap dikonfigurasikan.")}
              className="flex h-12 items-center justify-center rounded-[16px] bg-[#ffffff] ring-1 ring-[#222326]/10 transition-colors hover:bg-[#f8f9fc]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              aria-label="Sign in with Apple"
              onClick={() => alert("Fitur Sign in with Apple siap dikonfigurasikan.")}
              className="flex h-12 items-center justify-center rounded-[16px] bg-[#ffffff] ring-1 ring-[#222326]/10 transition-colors hover:bg-[#f8f9fc]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.81 1.44-.6.69-1.12 1.84-.98 2.95 1.07.08 2.15-.54 2.8-1.29z" />
              </svg>
            </button>
          </div>

          {/* Quick Demo Account Selector Helper */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowDemoSelector((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl bg-[#ebf0f8]/70 px-3.5 py-2 text-[12px] font-semibold text-[#415eee] hover:bg-[#ebf0f8]"
            >
              <span>Gunakan Akun Demo (6 Role LPK)</span>
              <span>{showDemoSelector ? "▲" : "▼"}</span>
            </button>

            {showDemoSelector && (
              <div className="mt-2 space-y-1.5 rounded-xl border border-[#ebf0f8] bg-[#ffffff] p-2 text-left">
                {SIX_LPK_DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectDemoAccount(acc)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-[#f8f9fc]"
                  >
                    <div>
                      <p className="text-[12.5px] font-bold text-[#222326]">
                        {acc.roleName}
                      </p>
                      <p className="font-mono text-[11px] text-[#747679]">
                        {acc.email}
                      </p>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold ${acc.badgeColor}`}
                    >
                      Pilih
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
