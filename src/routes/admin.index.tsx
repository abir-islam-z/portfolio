import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  deleteStat,
  getFooter,
  getHero,
  getStats,
  updateFooter,
  updateHero,
  updateStat,
} from "@/lib/cms"

interface FooterData {
  id?: string
  bio: string
  email: string
  linkedin: string
  github: string
  twitter: string
  availability: string
}

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
    videoUrl: "",
    location: "London, UK",
    sponsorshipInfo: "No sponsorship needed",
    openToWork: true,
  })
  const [stats, setStats] = useState<Array<StatItem>>([])
  const [footer, setFooter] = useState<FooterData>({
    bio: "",
    email: "",
    linkedin: "",
    github: "",
    twitter: "",
    availability: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setError(null)
      try {
        const h = await getHero()
        if (h) setHero(h as HeroData)

        const s = await getStats()
        if (s) setStats(s as Array<StatItem>)

        const f = await getFooter()
        if (f) setFooter(f as FooterData)
      } catch (err: any) {
        console.error("Dashboard load error:", err)
        setError(
          err?.message ||
            "Failed to load dashboard data. Please check your connection."
        )
        toast.error("Error loading dashboard data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSaveHero = async () => {
    try {
      await updateHero({ data: hero })
      toast.success("Hero updated successfully!")
    } catch (error: any) {
      console.error("Hero update failed:", error)
      toast.error(error?.message || "Failed to update Hero section")
    }
  }

  const handleSaveFooter = async () => {
    try {
      await updateFooter({ data: footer })
      toast.success("Footer updated successfully!")
    } catch (error: any) {
      console.error("Footer update failed:", error)
      toast.error(
        error?.message || "Failed to update Footer (Check if email is valid)"
      )
    }
  }

  const handleSaveStat = async (stat: StatItem) => {
    try {
      await updateStat({ data: stat })
      const updatedStats = await getStats()
      setStats(updatedStats as Array<StatItem>)
      toast.success("Stat saved successfully!")
    } catch (error: any) {
      console.error("Stat save failed:", error)
      toast.error(error?.message || "Failed to save stat")
    }
  }

  const handleAddStat = () => {
    setStats([...stats, { value: "0", label: "New Stat", order: stats.length }])
  }

  const handleDeleteStat = async (id?: number) => {
    if (id) {
      await deleteStat({ data: id })
      const updatedStats = await getStats()
      setStats(updatedStats as Array<StatItem>)
    } else {
      setStats(stats.filter((s) => s.id !== undefined))
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading dashboard data...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Card className="max-w-md space-y-4 border-destructive/50 bg-secondary/30 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-destructive">
            <RiDeleteBinLine size={24} />
          </div>
          <h2 className="text-xl font-bold text-destructive">Failed to Load</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry Loading
          </Button>
        </Card>
      </div>
    )
  }

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
            <div className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-4 md:col-span-2">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold tracking-tight">
                  Open to Work
                </Label>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Show availability badge on landing page
                </p>
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
                onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
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

      {/* Footer Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Footer & Socials</h2>
          <Button onClick={handleSaveFooter} className="gap-2">
            <RiSaveLine size={18} />
            Save Footer
          </Button>
        </div>

        <Card className="space-y-6 border-border bg-card/30 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>Footer Bio</Label>
              <Textarea
                value={footer.bio}
                onChange={(e) => setFooter({ ...footer, bio: e.target.value })}
                rows={3}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Public Email</Label>
              <Input
                type="email"
                value={footer.email}
                onChange={(e) =>
                  setFooter({ ...footer, email: e.target.value })
                }
                className="bg-background/50"
                placeholder="hello@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Availability Status</Label>
              <Input
                value={footer.availability}
                onChange={(e) =>
                  setFooter({ ...footer, availability: e.target.value })
                }
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input
                value={footer.linkedin}
                onChange={(e) =>
                  setFooter({ ...footer, linkedin: e.target.value })
                }
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input
                value={footer.github}
                onChange={(e) =>
                  setFooter({ ...footer, github: e.target.value })
                }
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Twitter URL</Label>
              <Input
                value={footer.twitter}
                onChange={(e) =>
                  setFooter({ ...footer, twitter: e.target.value })
                }
                className="bg-background/50"
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
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Order
                    </Label>
                    <Input
                      type="number"
                      className="h-8 w-16 text-xs"
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
