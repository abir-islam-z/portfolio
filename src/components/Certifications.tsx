import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { getCertifications } from "@/lib/cms"
import { RiAwardLine } from "@remixicon/react"

interface CertificationItem {
  title: string
  issuer: string
  date: string
}

export default function Certifications() {
  const [certs, setCerts] = useState<CertificationItem[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCertifications()
        if (data && data.length > 0) setCerts(data as CertificationItem[])
      } catch (error) {
        console.error("Failed to fetch certifications.", error)
      }
    }
    loadData()
  }, [])

  if (certs.length === 0) return null

  return (
    <section id="certifications" className="py-16 md:py-24 px-4 md:px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <RiAwardLine className="size-5 md:size-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Certifications</h2>
            <p className="text-muted-foreground text-xs md:text-sm">Professional credentials and recognitions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {certs.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 rounded-xl md:rounded-2xl bg-secondary/30 border border-border group hover:border-primary/20 transition-all gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base md:text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{item.issuer}</p>
              </div>
              <div className="sm:text-right">
                <Badge variant="secondary" className="bg-background text-[10px] md:text-xs">{item.date}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
