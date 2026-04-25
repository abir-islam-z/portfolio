import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { getCertifications } from "@/lib/cms"
import { RiAwardLine } from "@remixicon/react"

export default function Certifications() {
  const [certs, setCerts] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await getCertifications()
      if (data && data.length > 0) setCerts(data)
    }
    loadData()
  }, [])

  if (certs.length === 0) return null

  return (
    <section id="certifications" className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <RiAwardLine size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
            <p className="text-muted-foreground text-sm">Professional credentials and recognitions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {certs.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 border border-border group hover:border-primary/20 transition-all">
              <div className="space-y-1">
                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.issuer}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="bg-background">{item.date}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
