"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

function inputCls(hasError?: boolean) {
  return `w-full bg-[#0e0f11] border rounded-md px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none ${
    hasError
      ? "border-red-400/60 focus:border-red-400"
      : "border-white/10 focus:border-yellow-400/50"
  }`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

// Bulgarian phone numbers: +359 / 00359 / 0 prefix, then an 8–9 digit
// national number (first digit 1–9). Separators (spaces, dashes, parens,
// dots) are ignored. Examples: +359 88 123 4567, 0888 123 456, 02 980 1234.
function isValidBulgarianPhone(value: string) {
  const normalized = value.replace(/[\s\-().]/g, "");
  return /^(\+359|00359|0)[1-9]\d{7,8}$/.test(normalized);
}

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { email?: string; phone?: string };

export default function DemoRequestForm() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function buildMessage() {
    const lines = [message.trim()];
    if (restaurantAddress.trim()) {
      lines.push(`Restaurant Address: ${restaurantAddress.trim()}`);
    }
    if (phoneNumber.trim()) {
      lines.push(`Phone Number: ${phoneNumber.trim()}`);
    }
    return lines.filter(Boolean).join("\n\n");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const errors: FieldErrors = {};
    if (email.trim() && !isValidEmail(email)) {
      errors.email = t("form.errorEmail");
    }
    if (phoneNumber.trim() && !isValidBulgarianPhone(phoneNumber)) {
      errors.phone = t("form.errorPhone");
    }

    const missingRequired =
      !name.trim() ||
      !restaurantName.trim() ||
      !email.trim() ||
      !message.trim();

    if (missingRequired || errors.email || errors.phone) {
      setFieldErrors(errors);
      setError(missingRequired ? t("form.errorRequired") : "");
      setStatus("error");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: restaurantName.trim(),
          email: email.trim(),
          message: buildMessage(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setError(data.error ?? t("form.errorGeneric"));
        return;
      }

      setStatus("success");
      setName("");
      setRestaurantName("");
      setRestaurantAddress("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError(t("form.errorNetwork"));
    }
  }

  const submitting = status === "submitting";
  const submitted = status === "success";

  // Form and success panel are stacked in the same grid cell so swapping
  // between them cross-fades smoothly with no layout shift or page reload.
  return (
    <div className="grid">
      {/* Form */}
      <div
        inert={submitted || undefined}
        className={`[grid-area:1/1] transition-all duration-500 ease-out ${
          submitted
            ? "pointer-events-none opacity-0 scale-95"
            : "opacity-100 scale-100"
        }`}
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="sr-only">{t("form.name")}</label>
            <input
              className={inputCls()}
              placeholder={t("form.name")}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">{t("form.restaurantName")}</label>
            <input
              className={inputCls()}
              placeholder={t("form.restaurantName")}
              required
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">{t("form.restaurantAddress")}</label>
            <input
              className={inputCls()}
              placeholder={t("form.restaurantAddress")}
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">{t("form.phoneNumber")}</label>
            <input
              type="tel"
              className={inputCls(!!fieldErrors.phone)}
              placeholder={t("form.phoneNumber")}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (fieldErrors.phone) {
                  setFieldErrors((fe) => ({ ...fe, phone: undefined }));
                }
              }}
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-[11px] text-red-400">{fieldErrors.phone}</p>
            )}
          </div>
          <div>
            <label className="sr-only">{t("form.email")}</label>
            <input
              type="email"
              className={inputCls(!!fieldErrors.email)}
              placeholder={t("form.email")}
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((fe) => ({ ...fe, email: undefined }));
                }
              }}
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-[11px] text-red-400">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label className="sr-only">{t("form.messageLabel")}</label>
            <textarea
              rows={3}
              className={inputCls()}
              placeholder={t("form.messageLabel")}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-yellow-400 text-black font-semibold py-2.5 rounded-md hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? t("form.sending") : t("form.send")}
          </button>
        </form>
      </div>

      {/* Success */}
      <div
        inert={!submitted || undefined}
        role="status"
        className={`[grid-area:1/1] flex flex-col items-center justify-center text-center px-4 transition-all duration-500 ease-out ${
          submitted
            ? "opacity-100 scale-100 delay-200"
            : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h4 className="mb-1 text-lg font-semibold text-white">
          {t("form.successTitle")}
        </h4>
        <p className="max-w-xs text-sm text-gray-400">{t("form.successBody")}</p>
        <button
          type="button"
          onClick={() => {
            setError("");
            setFieldErrors({});
            setStatus("idle");
          }}
          className="mt-5 text-sm font-medium text-yellow-400 transition hover:text-yellow-300"
        >
          {t("form.successAgain")}
        </button>
      </div>
    </div>
  );
}
