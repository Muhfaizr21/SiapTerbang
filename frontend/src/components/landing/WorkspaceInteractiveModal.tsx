"use client";

import { useEffect, useState } from "react";

export interface WorkspaceInteractiveModalProps {
  readonly isOpen: boolean;
  readonly initialContext: string;
  readonly onClose: () => void;
}

type SubmissionState = "idle" | "loading" | "error" | "success";

export function WorkspaceInteractiveModal({
  isOpen,
  initialContext,
  onClose,
}: WorkspaceInteractiveModalProps) {
  const [lpkName, setLpkName] = useState("LPK Hikari Nusantara");
  const [subdomain, setSubdomain] = useState("hikarinusantara");
  const [whatsappNumber, setWhatsappNumber] = useState("+62812");
  const [selectedPlan, setSelectedPlan] = useState("Paket Pro");
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sanitizeSubdomain = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9-]/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lpkName.trim() || subdomain.trim().length < 3) {
      setStatus("error");
      setErrorMessage("Nama LPK dan subdomain minimal 3 karakter wajib diisi.");
      return;
    }
    if (whatsappNumber.trim().length < 9) {
      setStatus("error");
      setErrorMessage("Masukkan nomor WhatsApp aktif Direktur / Pengelola LPK.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    window.setTimeout(() => {
      setStatus("success");
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-workspace-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2025]/60 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg rounded-[28px] bg-[#ffffff] p-6 text-[#222326] shadow-2xl ring-1 ring-[#222326]/10 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-[#ebf0f8] px-3 py-1 font-mono text-[11px] font-semibold text-[#415eee]">
              Konteks: {initialContext || "Aktivasi Workspace LPK"}
            </span>
            <h2
              id="modal-workspace-title"
              className="mt-2 text-[24px] font-semibold tracking-tight text-[#222326]"
            >
              Siapkan Ruang Kerja Multi-Tenant LPK
            </h2>
          </div>
          <button
            type="button"
            aria-label="Tutup dialog"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#ebf0f8] text-[#222326] hover:bg-[#d2e5ff]"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6 rounded-[20px] bg-[#ebf0f8] p-5">
            <div className="flex items-center gap-2 text-[#1e8300]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#31ce01]" />
              <p className="text-[15px] font-semibold">
                Konfigurasi Subdomain Siap Diterbitkan
              </p>
            </div>
            <p className="mt-2 text-[14px] text-[#222326]">
              Ruang tertutup untuk <strong>{lpkName}</strong> telah disimulasikan pada:
            </p>
            <p className="mt-2 rounded-xl bg-[#ffffff] px-3.5 py-2 font-mono text-[13px] font-semibold text-[#415eee]">
              https://{subdomain}.siapterbang.id
            </p>
            <p className="mt-2 text-[13px] text-[#747679]">
              Paket dipilih: <strong>{selectedPlan}</strong> • 6 Role Internal LPK & Master Template Rirekisho otomatis disertakan.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  onClose();
                }}
                className="bevel-charcoal-pill min-h-[44px] px-5"
              >
                Selesai
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div>
              <label
                htmlFor="input-lpk-name"
                className="block text-[13px] font-semibold text-[#222326]"
              >
                Nama Resmi LPK / Sending Organization
              </label>
              <input
                id="input-lpk-name"
                type="text"
                value={lpkName}
                onChange={(e) => setLpkName(e.target.value)}
                className="mt-1.5 w-full rounded-[14px] bg-[#ebf0f8] px-3.5 py-2.5 text-[15px] text-[#222326] focus:bg-[#ffffff]"
                placeholder="Contoh: LPK Bina Mandiri Jepang"
              />
            </div>

            <div>
              <label
                htmlFor="input-subdomain"
                className="block text-[13px] font-semibold text-[#222326]"
              >
                Subdomain Workspace Terisolasi
              </label>
              <div className="mt-1.5 flex items-center overflow-hidden rounded-[14px] bg-[#ebf0f8]">
                <input
                  id="input-subdomain"
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(sanitizeSubdomain(e.target.value))}
                  className="w-full bg-transparent px-3.5 py-2.5 font-mono text-[14px] text-[#222326]"
                  placeholder="namalpk"
                />
                <span className="bg-[#1f2025] px-3.5 py-2.5 font-mono text-[13px] text-[#ebf0f8]">
                  .siapterbang.id
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="input-wa-director"
                  className="block text-[13px] font-semibold text-[#222326]"
                >
                  Nomor WhatsApp Direktur LPK
                </label>
                <input
                  id="input-wa-director"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="mt-1.5 w-full rounded-[14px] bg-[#ebf0f8] px-3.5 py-2.5 text-[14px] text-[#222326]"
                  placeholder="+62812xxxx"
                />
              </div>

              <div>
                <label
                  htmlFor="select-plan-tier"
                  className="block text-[13px] font-semibold text-[#222326]"
                >
                  Pilih Paket Langganan SaaS
                </label>
                <select
                  id="select-plan-tier"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="mt-1.5 w-full rounded-[14px] bg-[#ebf0f8] px-3.5 py-2.5 text-[14px] text-[#222326]"
                >
                  <option value="Paket Starter">Paket Starter (Maks 100 Siswa)</option>
                  <option value="Paket Pro">Paket Pro (Unlimited + Auto-Rirekisho)</option>
                  <option value="Paket Enterprise">Paket Enterprise (Multi-Cabang + SO)</option>
                </select>
              </div>
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="rounded-[12px] bg-[#ffab94]/30 px-3.5 py-2.5 text-[13px] font-medium text-[#a93f22]"
              >
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-[128px] px-4 text-[14px] font-medium text-[#747679] hover:text-[#222326]"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="bevel-charcoal-pill min-h-[44px] px-6"
              >
                {status === "loading" ? "Memverifikasi..." : "Aktifkan Ruang Kerja"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
