import { User } from "../generated/prisma/client";
import { getCurrentUserTop, getCurrentUserTopArtists } from "@/lib/user";
import TopListItem from "./TopListItem";

interface TopListProps {
    user: User | null;
    topic: string;
    limit?: number | null;
}

export default async function TopList({ user, topic, limit }: TopListProps) {
    if (!user) return <p>Please log in to see your top {topic}</p>;

    const data = await getCurrentUserTop(user.sessionKey!, topic, limit!);

    const items =
        topic === 'tracks' ?
            data.toptracks?.track :
            topic === 'albums' ?
                data.topalbums.album :
                topic === 'artists' ?
                    data.topartists?.artist :
                    []



    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Top {topic}</h1>
                    <p className="text-muted-foreground">Your most played {topic}</p>
                </div>

                <div className="space-y-3">
                    {items.map((item: any, idx: number) => {
                        if (topic === "artists") console.log(item)

                        return (
                            <TopListItem
                                key={idx}
                                name={item.name}
                                playcount={item.playcount}
                                img={item.image[1]["#text"]}
                                url={item.url}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}