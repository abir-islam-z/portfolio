import {
  RiBriefcaseLine,
  RiCodeBoxLine,
  RiDashboardLine,
  RiLogoutBoxLine,
  RiMessageLine,
} from "@remixicon/react"
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import { getUser, logout } from "@/lib/cms"
import { Button } from "@/components/ui/button"

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate({ to: "/login" })
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 border-r border-border bg-card/50 p-6 backdrop-blur-xl">
        <div className="mb-12 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
            AF
          </div>
          <span className="font-bold tracking-tight">Admin Portal</span>
        </div>

        <nav className="space-y-1">
          <Link
            to="/admin"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <RiDashboardLine size={20} />
            Overview
          </Link>
          <Link
            to="/admin/experience"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <RiBriefcaseLine size={20} />
            Experience
          </Link>
          <Link
            to="/admin/projects"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <RiCodeBoxLine size={20} />
            Projects
          </Link>
          <Link
            to="/admin/messages"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <RiMessageLine size={20} />
            Messages
          </Link>
          <Link
            to="/admin/testimonials"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <RiDashboardLine size={20} />
            Testimonials
          </Link>
          <Link
            to="/admin/certifications"
            activeProps={{ className: "bg-primary/10 text-primary" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <RiBriefcaseLine size={20} />
            Certifications
          </Link>
        </nav>

        <div className="absolute right-6 bottom-8 left-6 space-y-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex w-full items-center justify-start gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <RiLogoutBoxLine size={20} />
            Logout
          </Button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-secondary"
          >
            Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({
        to: "/login",
      })
    }
    return { user }
  },
  component: AdminLayout,
})
