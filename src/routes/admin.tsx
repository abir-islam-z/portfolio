import {
  RiBriefcaseLine,
  RiCodeBoxLine,
  RiDashboardLine,
  RiLogoutBoxLine,
  RiMessageLine,
  RiStarLine,
  RiAwardLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowLeftRightLine,
} from "@remixicon/react"
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router"
import { useState } from "react"
import { getUser, logout } from "@/lib/cms"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function AdminLayout() {
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate({ to: "/login" })
  }

  const navItems = [
    { to: "/admin", label: "Overview", icon: RiDashboardLine },
    { to: "/admin/experience", label: "Experience", icon: RiBriefcaseLine },
    { to: "/admin/projects", label: "Projects", icon: RiCodeBoxLine },
    { to: "/admin/messages", label: "Messages", icon: RiMessageLine },
    { to: "/admin/testimonials", label: "Testimonials", icon: RiStarLine },
    { to: "/admin/certifications", label: "Certifications", icon: RiAwardLine },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Toggle */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="rounded-full shadow-lg"
        >
          {isMobileOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 transition-all duration-300 md:sticky md:top-0 md:h-screen",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "border-r border-border bg-card/50 p-4 backdrop-blur-xl"
        )}
      >
        <div className="mb-10 flex items-center justify-between px-2">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
                AF
              </div>
              <span className="font-bold tracking-tight">Admin</span>
            </div>
          )}
          {isCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              AF
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex h-8 w-8 rounded-full"
          >
            <RiArrowLeftRightLine size={16} />
          </Button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileOpen(false)}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary",
                isCollapsed && "justify-center px-0"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute right-4 bottom-8 left-4 space-y-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive",
              isCollapsed ? "justify-center px-0" : "justify-start"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <RiLogoutBoxLine size={20} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
          {!isCollapsed && (
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-secondary"
            >
              Exit Dashboard
            </Link>
          )}
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-6 md:p-12">
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
