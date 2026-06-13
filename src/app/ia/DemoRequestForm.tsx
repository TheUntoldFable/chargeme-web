"use client";

import { useState } from "react";

const inputClass =
  "w-full bg-[#0e0f11] border border-white/10 rounded-md px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50";

type Status = "idle" | "submitting" | "success" | "error";

export default function DemoRequestForm() {
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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

    if (
      !name.trim() ||
      !restaurantName.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      setStatus("error");
      setError("Please fill in your name, restaurant name, email, and message.");
      return;
    }

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
        setError(data.error ?? "Something went wrong. Please try again.");
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
      setError("Network error. Please try again.");
    }
  }

  const submitting = status === "submitting";

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="sr-only">Name</label>
        <input
          className={inputClass}
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="sr-only">Restaurant Name</label>
        <input
          className={inputClass}
          placeholder="Restaurant Name"
          required
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>
      <div>
        <label className="sr-only">Restaurant Address</label>
        <input
          className={inputClass}
          placeholder="Restaurant Address"
          value={restaurantAddress}
          onChange={(e) => setRestaurantAddress(e.target.value)}
        />
      </div>
      <div>
        <label className="sr-only">Phone Number</label>
        <input
          className={inputClass}
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label className="sr-only">Email</label>
        <input
          type="email"
          className={inputClass}
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="sr-only">What do you need to hear about us?</label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="What do you need to hear about us?"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="text-[11px] text-gray-500 mt-1">(2-3 words max)</div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      {status === "success" && (
        <p className="text-sm text-green-400" role="status">
          Thanks! Your request has been sent — we&apos;ll be in touch shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-yellow-400 text-black font-semibold py-2.5 rounded-md hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Send Request"}
      </button>
    </form>
  );
}
