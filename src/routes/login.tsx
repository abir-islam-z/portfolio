import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { RiLockPasswordLine, RiUser3Line } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { login, seedAdmin } from "@/lib/cms"
import { toast } from "sonner"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await login({ data: { username, password } })
      navigate({ to: "/admin" })
    } catch (err) {
      setError("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  const handleSeed = async () => {
    try {
      const res = await seedAdmin()
      toast.success(res.message)
    } catch (err) {
      toast.error("Failed to seed admin user.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <RiLockPasswordLine size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Log in to manage your portfolio
          </p>
        </div>

        <Card className="border-border bg-secondary/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <RiUser3Line
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="bg-background/50 pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <RiLockPasswordLine
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-background/50 pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="text-md h-12 w-full font-bold"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-8 border-t border-border/50 pt-8">
            <Button
              variant="ghost"
              type="button"
              onClick={handleSeed}
              className="w-full text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
            >
              Initial Setup (Seed Admin)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/login")({
  component: LoginPage,
})
