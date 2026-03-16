import { User } from "../generated/prisma/client";
import { getCurrentUserTop } from "@/lib/user";
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
        topic === 'tracks'
            ? data.toptracks?.track
            : topic === 'albums'
                ? data.topalbums.album
                : topic === 'artists'
                    ? data.topartists?.artist
                    : [];

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground">Top {topic}</h1>
                <p className="text-muted-foreground">Your most played {topic}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {items.map((item: any, idx: number) => {
                    if (topic === "artists") {
                        return (
                            <TopListItem
                                key={idx}
                                name={item.name}
                                playcount={item.playcount}
                                img={item.image[1]["#text"]}
                                artist=""
                                url={item.url}
                            />
                        );
                    } else {
                        return (
                            <TopListItem
                                key={idx}
                                name={item.name}
                                playcount={item.playcount}
                                img={item.image[1]["#text"]}
                                artist={item.artist.name}
                                url={item.url}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}