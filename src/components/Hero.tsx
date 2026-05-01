import { getHero } from "@/lib/cms"
import { RiCloseLine, RiPlayFill } from "@remixicon/react"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface HeroData {
  title: string
  description: string
  introBadge: string
  videoDuration: string
  videoUrl: string
  location: string
  sponsorshipInfo: string
  openToWork: boolean
}

const FALLBACK_HERO: HeroData = {
  title: "Meet John",
  description: "60 second intro",
  introBadge: "INTRO",
  videoDuration: "0:60",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  location: "London, UK",
  sponsorshipInfo: "No sponsorship needed",
  openToWork: true,
}

export default function Hero() {
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([])
  const [data, setData] = useState<HeroData>(FALLBACK_HERO)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const p = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${5 + Math.random() * 10}s`,
    }))
    setParticles(p)

    async function loadHero() {
      try {
        const h = await getHero()
        if (h) setData(h)
      } catch (error) {
        console.error("Failed to fetch hero data, using fallback.", error)
      }
    }
    loadHero()
  }, [])

  // Helper to parse YouTube/Vimeo URLs for embedding
  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
        : url
    }
    if (url.includes("vimeo.com")) {
      const regExp =
        /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/
      const match = url.match(regExp)
      return match
        ? `https://player.vimeo.com/video/${match[1]}?autoplay=1`
        : url
    }
    return url
  }

  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-20">
      {/* Exact Video Banner Container */}
      <div className="group relative mx-auto h-80 max-w-6xl overflow-hidden rounded-[24px] border border-border bg-black shadow-2xl transition-all duration-500 md:h-120 md:rounded-[32px]">
        {!isPlaying ? (
          <>
            {/* Particle Animation Background */}
            <div className="absolute inset-0 bg-secondary">
              <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent opacity-50" />
              <div className="grid-overlay absolute inset-0 opacity-20" />

              {particles.map((p, i) => (
                <div
                  key={i}
                  className="particle animate-float"
                  style={{
                    left: p.left,
                    top: p.top,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                />
              ))}
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 md:top-8 md:left-8">
              <Badge
                variant="secondary"
                className="border-border bg-background/40 px-2 py-1 text-[9px] tracking-widest uppercase backdrop-blur-md md:text-[10px]"
              >
                <div className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                {data.introBadge}
              </Badge>
            </div>

            <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8">
              <Badge
                variant="secondary"
                className="border-border bg-background/40 px-2 py-1 text-[9px] tracking-widest backdrop-blur-md md:text-[10px]"
              >
                {data.videoDuration}
              </Badge>
            </div>

            {/* Play Button & Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 md:gap-6">
              <Button
                size="icon"
                onClick={() => setIsPlaying(true)}
                className="h-16 w-16 rounded-full bg-primary shadow-[0_0_40px_rgba(0,112,243,0.4)] transition-transform hover:scale-110 hover:bg-primary/90 active:scale-95 md:h-20 md:w-20"
              >
                <RiPlayFill
                  size={32}
                  className="md:size-[40px]"
                  fill="currentColor"
                />
              </Button>
              <div className="text-center">
                <h2 className="mb-1 text-lg font-bold text-white md:text-2xl">
                  {data.title}
                </h2>
                <p className="max-w-[200px] text-xs font-medium text-white/60 md:max-w-none md:text-sm">
                  {data.description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="relative h-full w-full animate-in duration-500 fade-in">
            <iframe
              src={getEmbedUrl(data.videoUrl)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 rounded-full border-white/20 bg-background/20 text-white backdrop-blur-md hover:bg-background/40"
            >
              <RiCloseLine size={24} />
            </Button>
          </div>
        )}
      </div>

      {/* Pill Badges Below */}
      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-3 md:mt-12 md:gap-4">
        {data.openToWork && (
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold text-primary md:px-4 md:py-2 md:text-xs"
          >
            <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
            Open to Work — No Sponsorship Required
          </Badge>
        )}
        <Badge
          variant="outline"
          className="rounded-full border-border bg-secondary/50 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground md:px-4 md:py-2 md:text-xs"
        >
          {data.location}
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full border-border bg-secondary/50 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground md:px-4 md:py-2 md:text-xs"
        >
          {data.sponsorshipInfo}
        </Badge>
      </div>
    </section>
  )
}
