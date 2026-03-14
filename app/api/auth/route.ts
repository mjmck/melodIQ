import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.api_key;
    const url = process.env.app_url;

    const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${url}/api/callback`;

    return NextResponse.redirect(authUrl);
}