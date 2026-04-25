import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { getTestimonials } from "@/lib/cms"
import { RiDoubleQuotesL } from "@remixicon/react"

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await getTestimonials()
      if (data && data.length > 0) setTestimonials(data)
    }
    loadData()
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-24 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1 uppercase tracking-widest text-[10px] font-bold">TESTIMONIALS</Badge>
          <h2 className="text-4xl font-bold tracking-tight">Kind words from partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <Card key={i} className="p-8 bg-background border-border relative group hover:border-primary/20 transition-all rounded-[32px]">
              <RiDoubleQuotesL className="text-primary/10 absolute top-6 right-8" size={48} />
              <div className="space-y-6 relative z-10">
                <p className="text-muted-foreground leading-relaxed italic">"{item.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
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
