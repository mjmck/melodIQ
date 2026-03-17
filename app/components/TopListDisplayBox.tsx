'use client'

import { useEffect, useMemo, useState, useTransition } from "react"
import TopListItem from "./TopListItem"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';
import { useRouter, useSearchParams } from "next/navigation"
import type { LastFmTopPeriod } from "@/lib/lastfm"

interface TopListDisplayBoxProps {
    tracks: any[]
    albums: any[]
    artists: any[]
}

export default function TopListDisplayBox({ tracks, albums, artists }: TopListDisplayBoxProps) {
    const [topic, setTopic] = useState<"tracks" | "albums" | "artists">("tracks")
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const periodToIndex = useMemo(() => ({
        overall: 0,
        "7day": 1,
        "1month": 2,
        "3month": 3,
        "6month": 4,
        "12month": 5,
    } satisfies Record<LastFmTopPeriod, number>), [])

    const indexToPeriod = useMemo(() => ([
        "overall",
        "7day",
        "1month",
        "3month",
        "6month",
        "12month",
    ] satisfies LastFmTopPeriod[]), [])

    const urlPeriod = (searchParams.get("period") as LastFmTopPeriod | null) ?? "overall"
    const urlIndex = periodToIndex[urlPeriod] ?? 0

    const [timeRange, setTimeRange] = useState<number>(urlIndex)

    useEffect(() => {
        setTimeRange(urlIndex)
    }, [urlIndex])

    const dataMap = { tracks, albums, artists }
    const items = dataMap[topic] || []

    return (
        <div className={`space-y-6 transition-opacity duration-200 ${isPending ? "opacity-60" : "opacity-100"}`}>
            {/* Topic buttons */}
            <div>
                <div className="flex justify-center gap-4">
                    {(["tracks", "albums", "artists"] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setTopic(t)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${topic === t ? "bg-primary text-white" : "bg-muted text-zinc"}`}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
                {/* Time Range Slider */}
                <div className="mt-4 flex w-full flex-col items-end pr-15">
                    <div className="w-full max-w-md flex flex-col items-start gap-2">
                        <label htmlFor="time-range-slider" className="text-sm font-medium">
                            Time Range
                        </label>
                        <Slider
                            id="time-range-slider"
                            className="rc-slider"
                            defaultValue={0}
                            max={5}
                            min={0}
                            dots={false}
                            value={timeRange}
                            onChange={(value: number | number[]) => {
                                const idx = Array.isArray(value) ? value[0] : value
                                setTimeRange(idx)

                                const period = indexToPeriod[idx] ?? "overall"
                                const next = new URLSearchParams(searchParams.toString())
                                if (period === "overall") next.delete("period")
                                else next.set("period", period)
                                startTransition(() => {
                                    router.replace(`?${next.toString()}`)
                                })
                            }}
                            marks={{
                                0: "All Time",
                                1: "7 days",
                                2: "30 days",
                                3: "3 months",
                                4: "6 months",
                                5: "12 months",
                            }}
                            step={1}
                        />
                    </div>


                </div>
            </div>

            <div
                key={`${topic}-${urlPeriod}`}
                className="grid grid-cols-3 gap-4 mt-4 animate-fadeInUp"
            >
                {items.map((item: any, idx: number) => {
                    return (
                        <TopListItem
                            key={item?.url ?? `${topic}-${item?.name ?? "item"}-${idx}`}
                            name={item.name}
                            playcount={item.playcount}
                            artist={item.artist?.name || ""}
                            img={item.image[1]["#text"]}
                            url={item.url}
                        />
                    )
                })}
            </div>
        </div>
    )
}