import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { deleteExperience, getExperience, updateExperience } from "@/lib/cms"

interface ExperienceItem {
  id?: number
  role: string
  company: string
  period: string
  description: string
  skills: string
  order: number
}

function AdminExperienceComponent() {
  const [experience, setExperience] = useState<Array<ExperienceItem>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getExperience()
      setExperience(data as Array<ExperienceItem>)
      setLoading(false)
    }
    loadData()
  }, [])

  const handleSave = async (item: ExperienceItem) => {
    try {
      await updateExperience({ data: item })
      const updated = await getExperience()
      setExperience(updated as Array<ExperienceItem>)
      toast.success("Experience saved!")
    } catch (error: any) {
      console.error("Experience save failed:", error)
      toast.error(error?.message || "Failed to save experience")
    }
  }

  const handleDelete = async (id?: number) => {
    try {
      if (id) {
        await deleteExperience({ data: id })
        const updated = await getExperience()
        setExperience(updated as Array<ExperienceItem>)
        toast.success("Experience entry removed.")
      } else {
        setExperience(experience.filter((e) => e.id !== undefined))
      }
    } catch (error: any) {
      console.error("Experience delete failed:", error)
      toast.error(error?.message || "Failed to remove experience")
    }
  }

  const handleAdd = () => {
    setExperience([
      {
        role: "New Role",
        company: "Company Name",
        period: "Year - Year",
        description: "Description...",
        skills: "Skill 1, Skill 2",
        order: experience.length,
      },
      ...experience,
    ])
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">
            Manage your professional timeline.
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <RiAddLine size={20} />
          Add Position
        </Button>
      </header>

      <div className="space-y-6">
        {experience.length > 0 ? (
          experience.map((item, i) => (
            <Card key={i} className="border-border bg-card/30 p-6">
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={item.role}
                    onChange={(e) => {
                      const next = [...experience]
                      next[i].role = e.target.value
                      setExperience(next)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={item.company}
                    onChange={(e) => {
                      const next = [...experience]
                      next[i].company = e.target.value
                      setExperience(next)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Input
                    value={item.period}
                    onChange={(e) => {
                      const next = [...experience]
                      next[i].period = e.target.value
                      setExperience(next)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order (Lower = First)</Label>
                  <Input
                    type="number"
                    value={item.order}
                    onChange={(e) => {
                      const next = [...experience]
                      next[i].order = parseInt(e.target.value) || 0
                      setExperience(next)
                    }}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Skills (Comma separated)</Label>
                  <Input
                    value={item.skills}
                    onChange={(e) => {
                      const next = [...experience]
                      next[i].skills = e.target.value
                      setExperience(next)
                    }}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const next = [...experience]
                      next[i].description = e.target.value
                      setExperience(next)
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <RiDeleteBinLine size={20} className="mr-2" />
                  Remove
                </Button>
                <Button onClick={() => handleSave(item)} className="gap-2">
                  <RiSaveLine size={20} />
                  Save Position
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No experience entries found. Add your first position.
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/admin/experience")({
  component: AdminExperienceComponent,
})
