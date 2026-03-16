'use client'

import { useState } from "react"
import TopListItem from "./TopListItem"

interface TopListDisplayBoxProps {
    tracks: any[]
    albums: any[]
    artists: any[]
}

export default function TopListDisplayBox({ tracks, albums, artists }: TopListDisplayBoxProps) {
    const [topic, setTopic] = useState<"tracks" | "albums" | "artists">("tracks")

    const dataMap = { tracks, albums, artists }
    const items = dataMap[topic] || []

    return (
        <div className="space-y-6">
            {/* Topic buttons */}
            <div className="flex justify-center gap-4">
                {(["tracks", "albums", "artists"] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTopic(t)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${topic === t ? "bg-primary text-white" : "bg-muted text-zinc"
                            }`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* Display selected list with subtle fade-in animation */}
            <div
                key={topic} // triggers React to treat new topic as new element
                className="grid grid-cols-3 gap-4 mt-4 animate-fadeInUp"
            >
                {items.map((item: any, idx: number) => (
                    <TopListItem
                        key={idx}
                        name={item.name}
                        playcount={item.playcount}
                        artist={item.artist?.name || ""}
                        img={item.image[1]["#text"]}
                        url={item.url}
                    />
                ))}
            </div>
        </div>
    )
}