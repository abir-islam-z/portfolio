import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  deleteCertification,
  getCertifications,
  updateCertification,
} from "@/lib/cms"
import { toast } from "sonner"

interface CertificationItem {
  id?: number
  title: string
  issuer: string
  date: string
  link?: string | null
  order: number
}

function AdminCertificationsComponent() {
  const [certs, setCerts] = useState<CertificationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getCertifications()
      setCerts(data as CertificationItem[])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleSave = async (item: CertificationItem) => {
    await updateCertification({ data: item })
    const updated = await getCertifications()
    setCerts(updated as CertificationItem[])
    toast.success("Certification saved!")
  }

  const handleDelete = async (id?: number) => {
    if (id) {
      await deleteCertification({ data: id })
      const updated = await getCertifications()
      setCerts(updated as CertificationItem[])
      toast.error("Certification removed.")
    } else {
      setCerts(certs.filter((c) => c.id !== undefined))
    }
  }

  const handleAdd = () => {
    setCerts([
      {
        title: "New Certification",
        issuer: "Issuing Organization",
        date: "Month, Year",
        order: certs.length,
      },
      ...certs,
    ])
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Certifications
          </h1>
          <p className="text-muted-foreground">
            Manage your professional credentials.
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <RiAddLine size={20} />
          Add Certification
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {certs.length > 0 ? (
          certs.map((item, i) => (
            <Card key={i} className="border-border bg-card/30 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-2 lg:col-span-2">
                  <Label>Certification Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => {
                      const next = [...certs]
                      next[i].title = e.target.value
                      setCerts(next)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuer</Label>
                  <Input
                    value={item.issuer}
                    onChange={(e) => {
                      const next = [...certs]
                      next[i].issuer = e.target.value
                      setCerts(next)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={item.date}
                    onChange={(e) => {
                      const next = [...certs]
                      next[i].date = e.target.value
                      setCerts(next)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={item.order}
                    onChange={(e) => {
                      const next = [...certs]
                      next[i].order = parseInt(e.target.value) || 0
                      setCerts(next)
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <RiDeleteBinLine size={20} className="mr-2" />
                  Remove
                </Button>
                <Button onClick={() => handleSave(item)} className="gap-2 px-8">
                  <RiSaveLine size={20} />
                  Save Certification
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No certifications found. Add your first one.
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/admin/certifications")({
  component: AdminCertificationsComponent,
})
