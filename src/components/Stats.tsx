import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { getStats } from "@/lib/cms"

export default function Stats() {
  const [stats, setStats] = useState<any[]>([
    { value: "4+", label: "Years of Experience" },
    { value: "25+", label: "Projects Completed" },
    { value: "10+", label: "Global Clients" },
    { value: "9K+", label: "LinkedIn Following" }
  ])

  useEffect(() => {
    async function loadStats() {
      const data = await getStats()
      if (data && data.length > 0) setStats(data)
    }
    loadStats()
  }, [])

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
            Hello, I&apos;m Abrar — <br />
            <span className="text-primary">Data Scientist</span> & Engineer.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I specialize in building intelligent data solutions that bridge the gap between complex 
            unstructured data and actionable business insights. My focus lies in LLMs, RAG pipelines, 
            and scalable machine learning systems.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-8 bg-secondary/50 border-border hover:border-primary/20 transition-all group">
              <div className="text-4xl font-black text-primary mb-2 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
