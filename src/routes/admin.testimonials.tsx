import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "@/lib/cms"

interface TestimonialItem {
  id?: number
  name: string
  role: string
  content: string
  image?: string | null
  order: number
}

function AdminTestimonialsComponent() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getTestimonials()
      setTestimonials(data as TestimonialItem[])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleSave = async (item: TestimonialItem) => {
    await updateTestimonial({ data: item })
    const updated = await getTestimonials()
    setTestimonials(updated as TestimonialItem[])
    alert("Testimonial saved!")
  }

  const handleDelete = async (id?: number) => {
    if (id) {
      if (confirm("Delete this testimonial?")) {
        await deleteTestimonial({ data: id })
        const updated = await getTestimonials()
        setTestimonials(updated as TestimonialItem[])
      }
    } else {
      setTestimonials(testimonials.filter((t) => t.id !== undefined))
    }
  }

  const handleAdd = () => {
    setTestimonials([
      {
        name: "Client Name",
        role: "Position, Company",
        content: "Kind words...",
        order: testimonials.length,
      },
      ...testimonials,
    ])
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Testimonials
          </h1>
          <p className="text-muted-foreground">
            Manage client feedback and reviews.
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <RiAddLine size={20} />
          Add Testimonial
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {testimonials.length > 0 ? (
          testimonials.map((item, i) => (
            <Card key={i} className="border-border bg-card/30 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const next = [...testimonials]
                        next[i].name = e.target.value
                        setTestimonials(next)
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Position / Role</Label>
                      <Input
                        value={item.role}
                        onChange={(e) => {
                          const next = [...testimonials]
                          next[i].role = e.target.value
                          setTestimonials(next)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Order</Label>
                      <Input
                        type="number"
                        value={item.order}
                        onChange={(e) => {
                          const next = [...testimonials]
                          next[i].order = parseInt(e.target.value) || 0
                          setTestimonials(next)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    rows={4}
                    value={item.content}
                    onChange={(e) => {
                      const next = [...testimonials]
                      next[i].content = e.target.value
                      setTestimonials(next)
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
                  Save Testimonial
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No testimonials found. Add your first one.
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonialsComponent,
})
