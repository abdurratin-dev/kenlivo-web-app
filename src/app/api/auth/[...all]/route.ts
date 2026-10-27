import { NextResponse } from "next/server";

// better-auth has been replaced with custom JWT auth via the Kenlivo API.
export function GET() {
  return NextResponse.json({ error: "Not implemented" }, { status: 404 });
}
export function POST() {
  return NextResponse.json({ error: "Not implemented" }, { status: 404 });
}
