import { getUser, getCurrentUserTop } from "@/lib/user";
import ProfileNav from "@/app/components/ProfileNav";
import TopListDisplayBox from "@/app/components/TopListDisplayBox";
import type { LastFmTopPeriod } from "@/lib/lastfm";

export default async function Profile({
    params,
    searchParams,
}: {
    params: Promise<{ name: string }>
    searchParams?: Promise<{ period?: LastFmTopPeriod }>
}) {
    const { name } = await params
    const { period = "overall" } = (await searchParams) ?? {}
    const user = await getUser(name)

    if (!user) {
        return <p>{name} is not a registered user</p>
    }

    // Fetch all topics on the server
    const [tracksData, albumsData, artistsData] = await Promise.all([
        getCurrentUserTop(user.sessionKey!, "tracks", 15, period),
        getCurrentUserTop(user.sessionKey!, "albums", 15, period),
        getCurrentUserTop(user.sessionKey!, "artists", 15, period),
    ])

    // Extract arrays
    const tracks = tracksData.toptracks?.track || []
    const albums = albumsData.topalbums?.album || []
    const artists = artistsData.topartists?.artist || []

    return (
        <div className="space-y-6">
            <ProfileNav />
            <TopListDisplayBox tracks={tracks} albums={albums} artists={artists} />
        </div>
    )
}