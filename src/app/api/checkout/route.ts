import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({ error: "Stripe not enabled in scaffold" }, { status: 501 });
}
