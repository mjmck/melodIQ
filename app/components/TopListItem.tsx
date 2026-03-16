import Image from "next/image"
import imgDefault from '@/public/defaultPFP.png'

interface Info {
    name: string
    playcount: number
    url: string
    artist: string
    img: string
}

export default function TopListItem({ name, playcount, url, artist, img }: Info) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="relative overflow-hidden rounded-2xl border bg-card border-border p-4 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                            src={img || imgDefault}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {playcount.toLocaleString()} plays
                        </p>
                    </div>

                    <h5 style={{ fontSize: '0.85rem', fontWeight: '200' }} className="flex opacity-100 group-hover:opacity-0 transition-opacity">
                        {artist}
                    </h5>

                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                            className="h-5 w-5 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    )
}