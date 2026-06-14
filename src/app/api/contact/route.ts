import { NextResponse } from "next/server";

const ANALYTICS_API_URL =
  process.env.ANALYTICS_API_URL ?? "http://localhost:3000/api";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const base = ANALYTICS_API_URL.replace(/\/+$/, "");
    const res = await fetch(`${base}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach contact service" },
      { status: 502 },
    );
  }
}
