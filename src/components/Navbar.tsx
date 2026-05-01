import { Link, useRouterState } from "@tanstack/react-router"
import { useState } from "react"
import { RiMenuLine, RiCloseLine } from "@remixicon/react"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const state = useRouterState()
  const user = state.matches.find((m) => m.routeId === "__root__")?.context?.user
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/40 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          <span className="text-primary italic">JD</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          {user && (
            <Link to="/admin" className="text-primary font-bold hover:text-primary/80 transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:flex font-bold rounded-full px-6">
            Resume
          </Button>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-[73px] z-40 bg-background/95 backdrop-blur-xl md:hidden transition-all duration-300",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 p-6">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          {user && (
            <Link 
              to="/admin" 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold text-primary"
            >
              Dashboard
            </Link>
          )}
          <Button className="w-full max-w-xs font-bold rounded-full h-14 text-lg">
            Resume
          </Button>
        </nav>
      </div>
    </nav>
  )
}
