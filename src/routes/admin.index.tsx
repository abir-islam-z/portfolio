import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  deleteStat,
  getHero,
  getStats,
  updateHero,
  updateStat,
} from "@/lib/cms"
import { toast } from "sonner"

interface HeroData {
  id: string
  title: string
  description: string
  introBadge: string
  videoDuration: string
  videoUrl: string
  location: string
  sponsorshipInfo: string
  openToWork: boolean
}

interface StatItem {
  id?: number
  value: string
  label: string
  order: number
}

function AdminIndexComponent() {
  const [hero, setHero] = useState<HeroData>({
    id: "singleton",
    title: "Meet Abrar",
    description: "60 second intro",
    introBadge: "INTRO",
    videoDuration: "0:60",
    location: "London, UK",
    sponsorshipInfo: "No sponsorship needed",
    openToWork: true,
  })
  const [stats, setStats] = useState<StatItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const h = await getHero()
      if (h) setHero(h as HeroData)
      const s = await getStats()
      setStats(s as StatItem[])
      setLoading(false)
    }
    loadData()
  }, [])

  const handleSaveHero = async () => {
    await updateHero({ data: hero })
    toast.success("Hero updated successfully!")
  }

  const handleSaveStat = async (stat: StatItem) => {
    await updateStat({ data: stat })
    const updatedStats = await getStats()
    setStats(updatedStats as StatItem[])
  }

  const handleAddStat = () => {
    setStats([...stats, { value: "0", label: "New Stat", order: stats.length }])
  }

  const handleDeleteStat = async (id?: number) => {
    if (id) {
      await deleteStat({ data: id })
      const updatedStats = await getStats()
      setStats(updatedStats as StatItem[])
    } else {
      setStats(stats.filter((s) => s.id !== undefined))
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-12">
      <header>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Manage your hero section and key stats.
        </p>
      </header>

      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Hero Section</h2>
          <Button onClick={handleSaveHero} className="gap-2">
            <RiSaveLine size={18} />
            Save Changes
          </Button>
        </div>

        <Card className="space-y-6 border-border bg-card/30 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 md:col-span-2">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold tracking-tight">Open to Work</Label>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Show availability badge on landing page</p>
              </div>
              <Switch 
                checked={hero.openToWork} 
                onCheckedChange={(val) => setHero({ ...hero, openToWork: val })}
              />
            </div>
            <div className="space-y-2">
              <Label>Intro Badge Text</Label>
              <Input
                value={hero.introBadge}
                onChange={(e) =>
                  setHero({ ...hero, introBadge: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Video Duration Label</Label>
              <Input
                value={hero.videoDuration}
                onChange={(e) =>
                  setHero({ ...hero, videoDuration: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Video URL (YouTube/Vimeo/Direct Link)</Label>
              <Input
                value={hero.videoUrl}
                onChange={(e) =>
                  setHero({ ...hero, videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Main Title</Label>
              <Input
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={hero.description}
                onChange={(e) =>
                  setHero({ ...hero, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={hero.location}
                onChange={(e) => setHero({ ...hero, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Sponsorship Info</Label>
              <Input
                value={hero.sponsorshipInfo}
                onChange={(e) =>
                  setHero({ ...hero, sponsorshipInfo: e.target.value })
                }
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Stats</h2>
          <Button variant="outline" onClick={handleAddStat} className="gap-2">
            <RiAddLine size={18} />
            Add Stat
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {stats.length > 0 ? (
            stats.map((stat, i) => (
              <Card key={i} className="space-y-4 border-border bg-card/30 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Value
                    </Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...stats]
                        newStats[i].value = e.target.value
                        setStats(newStats)
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Label
                    </Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...stats]
                        newStats[i].label = e.target.value
                        setStats(newStats)
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Order</Label>
                    <Input 
                      type="number" 
                      className="w-16 h-8 text-xs" 
                      value={stat.order}
                      onChange={(e) => {
                        const newStats = [...stats]
                        newStats[i].order = parseInt(e.target.value) || 0
                        setStats(newStats)
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStat(stat.id)}
                      className="h-8 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSaveStat(stat)}
                      className="h-8 px-4"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
              No stats found. Add your first stat to get started.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export const Route = createFileRoute("/admin/")({
  component: AdminIndexComponent,
})
