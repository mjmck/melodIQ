import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "./components/Button";
import { Music, Search, Users } from "lucide-react";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans flex flex-col">

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {user && (<h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight max-w-3xl leading-tight">
          Welcome back, <span className="font-semibold">{user.name}</span>
        </h1>)}

        <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl">
          Search for a user to see what they're scrobbling!
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/profile">
            <Button size="lg" className="cursor-pointer rounded-full px-8 text-base">
              View Your Profile
            </Button>
          </a>

          <Link href="/search">
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer rounded-full px-8 text-base"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Users
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Search,
              title: "Search Users",
              desc: "Find any listener and explore their music taste.",
            },
            {
              icon: Music,
              title: "Top Tracks",
              desc: "See the most played songs ranked by play count.",
            },
            {
              icon: Users,
              title: "Compare Tastes",
              desc: "Discover overlaps and differences in music preferences.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-zinc-900 dark:text-white text-lg">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}