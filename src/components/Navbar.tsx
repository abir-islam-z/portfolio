import { Link } from "@tanstack/react-router"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          <span className="text-primary italic">AF</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">About</Link>
          <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#" className="hover:text-foreground transition-colors">Case Studies</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:flex font-bold rounded-full px-6">
            Resume
          </Button>
        </div>
      </div>
    </nav>
  )
}
