import { useEffect, useState } from "react"
import { RiPlayFill } from "@remixicon/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export default function Hero() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string; duration: string }[]>([])

  useEffect(() => {
    const p = [...Array(40)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${5 + Math.random() * 10}s`
    }))
    setParticles(p)
  }, [])

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Exact Video Banner Container */}
      <div className="relative max-w-6xl mx-auto h-[480px] rounded-[32px] overflow-hidden bg-secondary border border-border shadow-2xl group">
        {/* Particle Animation Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50" />
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
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <Badge variant="secondary" className="bg-background/40 backdrop-blur-md border-border text-[10px] tracking-widest uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse mr-2" />
            INTRO
          </Badge>
        </div>

        <div className="absolute bottom-8 right-8">
          <Badge variant="secondary" className="bg-background/40 backdrop-blur-md border-border text-[10px] tracking-widest">
            0:60
          </Badge>
        </div>

        {/* Play Button & Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <Button 
            size="icon" 
            className="w-20 h-20 rounded-full shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:scale-110 transition-transform"
          >
            <RiPlayFill size={40} fill="currentColor" />
          </Button>
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-1">Meet Abrar</h2>
            <p className="text-sm text-muted-foreground font-medium">60 second intro</p>
          </div>
        </div>
      </div>

      {/* Pill Badges Below */}
      <div className="max-w-6xl mx-auto mt-12 flex flex-wrap items-center justify-center gap-4">
        <Badge variant="outline" className="px-4 py-2 rounded-full border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
          <div className="w-2 h-2 rounded-full bg-primary mr-2" />
          Open to Work — No Sponsorship Required
        </Badge>
        <Badge variant="outline" className="px-4 py-2 rounded-full border-border bg-secondary/50 text-muted-foreground text-xs font-semibold">
          London, UK
        </Badge>
        <Badge variant="outline" className="px-4 py-2 rounded-full border-border bg-secondary/50 text-muted-foreground text-xs font-semibold">
          No sponsorship needed
        </Badge>
      </div>
    </section>
  )
}
