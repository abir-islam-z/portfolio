import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
  RiAddLine,
  RiDeleteBinLine,
  RiSaveLine,
  RiStarFill,
  RiStarLine,
} from "@remixicon/react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { deleteProject, getProjects, updateProject } from "@/lib/cms"

interface ProjectItem {
  id?: number
  title: string
  description: string
  image: string
  tags: string
  isFeatured: boolean
  link?: string | null
  github?: string | null
  order: number
}

function AdminProjectsComponent() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getProjects()
      setProjects(data as ProjectItem[])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleSave = async (item: ProjectItem) => {
    await updateProject({ data: item })
    const updated = await getProjects()
    setProjects(updated as ProjectItem[])
    alert("Project saved!")
  }

  const handleDelete = async (id?: number) => {
    if (id) {
      if (confirm("Delete this project?")) {
        await deleteProject({ data: id })
        const updated = await getProjects()
        setProjects(updated as ProjectItem[])
      }
    } else {
      setProjects(projects.filter((p) => p.id !== undefined))
    }
  }

  const handleAdd = () => {
    setProjects([
      {
        title: "New Project",
        description: "Brief summary...",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        tags: "React, AI",
        isFeatured: false,
        order: projects.length,
      },
      ...projects,
    ])
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio showcase.
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <RiAddLine size={20} />
          Add Project
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {projects.length > 0 ? (
          projects.map((item, i) => (
            <Card key={i} className="border-border bg-card/30 p-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Preview & Basic Info */}
                <div className="space-y-4">
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No image
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => {
                        const next = [...projects]
                        next[i].image = e.target.value
                        setProjects(next)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Order (Lower = First)</Label>
                    <Input
                      type="number"
                      value={item.order}
                      onChange={(e) => {
                        const next = [...projects]
                        next[i].order = parseInt(e.target.value) || 0
                        setProjects(next)
                      }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Project Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const next = [...projects]
                          next[i].title = e.target.value
                          setProjects(next)
                        }}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={
                        item.isFeatured
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }
                      onClick={() => {
                        const next = [...projects]
                        next[i].isFeatured = !next[i].isFeatured
                        setProjects(next)
                      }}
                    >
                      {item.isFeatured ? (
                        <RiStarFill size={24} />
                      ) : (
                        <RiStarLine size={24} />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags (Comma separated)</Label>
                    <Input
                      value={item.tags}
                      onChange={(e) => {
                        const next = [...projects]
                        next[i].tags = e.target.value
                        setProjects(next)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={4}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...projects]
                        next[i].description = e.target.value
                        setProjects(next)
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Live Link (Optional)</Label>
                      <Input
                        value={item.link || ""}
                        onChange={(e) => {
                          const next = [...projects]
                          next[i].link = e.target.value
                          setProjects(next)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub Link (Optional)</Label>
                      <Input
                        value={item.github || ""}
                        onChange={(e) => {
                          const next = [...projects]
                          next[i].github = e.target.value
                          setProjects(next)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <RiDeleteBinLine size={20} className="mr-2" />
                  Delete Project
                </Button>
                <Button onClick={() => handleSave(item)} className="gap-2 px-8">
                  <RiSaveLine size={20} />
                  Save Project
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No projects found. Add your first project.
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjectsComponent,
})
