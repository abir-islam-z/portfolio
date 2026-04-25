import { useEffect, useState } from "react"
import { RiPlayFill } from "@remixicon/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { getHero } from "@/lib/cms"

interface HeroData {
  title: string
  description: string
  introBadge: string
  videoDuration: string
  location: string
  sponsorshipInfo: string
  openToWork: boolean
}

const FALLBACK_HERO: HeroData = {
  title: "Meet Abrar",
  description: "60 second intro",
  introBadge: "INTRO",
  videoDuration: "0:60",
  location: "London, UK",
  sponsorshipInfo: "No sponsorship needed",
  openToWork: true,
}

export default function Hero() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string; duration: string }[]>([])
  const [data, setData] = useState<HeroData>(FALLBACK_HERO)

  useEffect(() => {
    const p = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${5 + Math.random() * 10}s`
    }))
    setParticles(p)

    async function loadHero() {
      try {
        const h = await getHero()
        if (h) setData(h as HeroData)
      } catch (error) {
        console.error("Failed to fetch hero data, using fallback.", error)
      }
    }
    loadHero()
  }, [])

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden">
      {/* Exact Video Banner Container */}
      <div className="relative max-w-6xl mx-auto h-80 md:h-120 rounded-[24px] md:rounded-[32px] overflow-hidden bg-secondary border border-border shadow-2xl group">
        {/* Particle Animation Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 grid-overlay opacity-20" />
          
          {particles.map((p, i) => (
            <div 
              key={i}
              className="particle animate-float"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2">
          <Badge variant="secondary" className="bg-background/40 backdrop-blur-md border-border text-[9px] md:text-[10px] tracking-widest uppercase py-1 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse mr-2" />
            {data.introBadge}
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <Badge variant="secondary" className="bg-background/40 backdrop-blur-md border-border text-[9px] md:text-[10px] tracking-widest py-1 px-2">
            {data.videoDuration}
          </Badge>
        </div>

        {/* Play Button & Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 px-4">
          <Button 
            size="icon" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:scale-110 transition-transform"
          >
            <RiPlayFill size={32} className="md:size-[40px]" fill="currentColor" />
          </Button>
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-bold mb-1">{data.title}</h2>
            <p className="text-xs md:text-sm text-muted-foreground font-medium max-w-[200px] md:max-w-none">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Pill Badges Below */}
      <div className="max-w-6xl mx-auto mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {data.openToWork && (
          <Badge variant="outline" className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-semibold">
            <div className="w-2 h-2 rounded-full bg-primary mr-2" />
            Open to Work — No Sponsorship Required
          </Badge>
        )}
        <Badge variant="outline" className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border-border bg-secondary/50 text-muted-foreground text-[10px] md:text-xs font-semibold">
          {data.location}
        </Badge>
        <Badge variant="outline" className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border-border bg-secondary/50 text-muted-foreground text-[10px] md:text-xs font-semibold">
          {data.sponsorshipInfo}
        </Badge>
      </div>
    </section>
  )
}
