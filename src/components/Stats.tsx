import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { getStats } from "@/lib/cms"

interface StatItem {
  value: string
  label: string
}

const FALLBACK_STATS: StatItem[] = [
  { value: "4+", label: "Years of Experience" },
  { value: "25+", label: "Projects Completed" },
  { value: "10+", label: "Global Clients" },
  { value: "9K+", label: "LinkedIn Following" }
]

export default function Stats() {
  const [stats, setStats] = useState<StatItem[]>(FALLBACK_STATS)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats()
        if (data && data.length > 0) setStats(data as StatItem[])
      } catch (error) {
        console.error("Failed to fetch stats, using fallback.", error)
      }
    }
    loadStats()
  }, [])

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 leading-tight">
            Hello, I&apos;m Abrar — <br className="hidden md:block" />
            <span className="text-primary">Data Scientist</span> & Engineer.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            I specialize in building intelligent data solutions that bridge the gap between complex 
            unstructured data and actionable business insights. My focus lies in LLMs, RAG pipelines, 
            and scalable machine learning systems.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 md:p-8 bg-secondary/50 border-border hover:border-primary/20 transition-all group">
              <div className="text-3xl md:text-4xl font-black text-primary mb-1 md:mb-2 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
