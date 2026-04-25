import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { getTestimonials } from "@/lib/cms"
import { RiDoubleQuotesL } from "@remixicon/react"

interface TestimonialItem {
  name: string
  role: string
  content: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTestimonials()
        if (data && data.length > 0) setTestimonials(data as TestimonialItem[])
      } catch (error) {
        console.error("Failed to fetch testimonials.", error)
      }
    }
    loadData()
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">TESTIMONIALS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kind words from partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, i) => (
            <Card key={i} className="p-6 md:p-8 bg-background border-border relative group hover:border-primary/20 transition-all rounded-[24px] md:rounded-[32px]">
              <RiDoubleQuotesL className="text-primary/10 absolute top-4 right-6 md:top-6 md:right-8 size-10 md:size-12" />
              <div className="space-y-5 md:space-y-6 relative z-10">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">"{item.content}"</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm md:text-base">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm">{item.name}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
