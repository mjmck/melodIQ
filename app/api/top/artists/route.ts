import { getCurrentUserTopArtists } from "@/lib/user";

export async function GET(request: Request) {
    const cookieHeader = request.headers.get("cookie");
    const sessionMatch = cookieHeader?.match(/(?:^|;\s*)session=([^;]*)/);
    const cookie = sessionMatch?.[1];
    if (!cookie) return new Response("Not signed in", { status: 401 });

    try {
        const topArtists = await getCurrentUserTopArtists(cookie);
        return new Response(JSON.stringify(topArtists), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
    }
}