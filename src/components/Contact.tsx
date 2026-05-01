import { useEffect, useState } from "react"
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiMailLine,
  RiTwitterXFill,
} from "@remixicon/react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { getFooter, submitContact } from "@/lib/cms"
import { toast } from "sonner"

interface FooterData {
  bio: string
  email: string
  linkedin: string
  github: string
  twitter: string
  availability: string
}

const FALLBACK_FOOTER: FooterData = {
  bio: "Full Stack Developer specializing in modern web technologies. Based in Silicon Valley, CA.",
  email: "hello@johndoe.com",
  linkedin: "#",
  github: "#",
  twitter: "#",
  availability: "Open for Opportunities",
}

export default function Contact() {
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [footer, setFooter] = useState<FooterData>(FALLBACK_FOOTER)

  useEffect(() => {
    async function loadFooter() {
      try {
        const data = await getFooter()
        setFooter(data)
      } catch (err) {
        console.error("Failed to fetch footer data.", err)
      }
    }
    loadFooter()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const payload = {
        name: String(data.name || ""),
        email: String(data.email || ""),
        message: String(data.message || ""),
      }
      await submitContact({ data: payload })
      setSuccess(true)
      e.currentTarget.reset()
      toast.success("Message sent! I'll get back to you soon.")
    } catch (err: any) {
      console.error("Submission error:", err)
      const errorMessage = err?.message || "Something went wrong. Please try again later."
      toast.error(errorMessage)
    } finally {
      setPending(false)
    }
  }

  return (
    <section id="contact" className="border-t border-border px-4 md:px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:gap-16 lg:grid-cols-2">
        {/* Left Side */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div>
            <h2 className="mb-6 md:mb-8 text-4xl md:text-6xl leading-tight font-black tracking-tighter">
              Full Stack Developer <br />
              <span className="text-primary">who ships?</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Let's build something intelligent together. I'm always open to
              discussing new projects, partnerships, or opportunities to join
              innovative teams.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <a
              href={`mailto:${footer.email}`}
              className="text-base md:text-lg font-bold transition-colors hover:text-primary"
            >
              {footer.email}
            </a>
            <a
              href={footer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg font-bold transition-colors hover:text-primary"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="rounded-[24px] md:rounded-[40px] border-border bg-secondary/30 p-6 md:p-10 shadow-none">
          {success ? (
            <div className="space-y-4 py-8 md:py-12 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <RiMailLine size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">
                Thank you for reaching out. I'll get back to you as soon as
                possible.
              </p>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="mt-4"
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[9px] md:text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="h-12 rounded-xl border-border bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[9px] md:text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@johndoe.com"
                  required
                  className="h-12 rounded-xl border-border bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[9px] md:text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  className="min-h-32 md:min-h-37.5 resize-none rounded-xl border-border bg-background/50"
                />
              </div>
              <Button
                type="submit"
                disabled={pending}
                className="text-sm md:text-md h-12 md:h-14 w-full rounded-2xl bg-primary font-bold shadow-[0_4px_20px_rgba(0,112,243,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {pending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </Card>
      </div>

      <div className="mx-auto max-w-7xl mt-16 md:mt-24">
        {/* Footer Grid */}
        <div className="grid gap-12 border-t border-border pt-16 md:pt-24 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          <div className="space-y-4 md:space-y-6">
            <div className="text-2xl font-black tracking-tighter italic">
              JD
            </div>
            <p className="max-w-62.5 text-sm leading-relaxed text-muted-foreground mx-auto md:mx-0">
              {footer.bio}
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-primary uppercase">
              Say Hello
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href={`mailto:${footer.email}`}
                className="text-sm font-bold transition-colors hover:text-primary"
              >
                {footer.email}
              </a>
              <a
                href={footer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold transition-colors hover:text-primary"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-primary uppercase">
              Elsewhere
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <SocialIcon href={footer.github} icon={<RiGithubFill />} />
              <SocialIcon href={footer.linkedin} icon={<RiLinkedinBoxFill />} />
              <SocialIcon href={footer.twitter} icon={<RiTwitterXFill />} />
              <SocialIcon href={`mailto:${footer.email}`} icon={<RiMailFill />} />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-primary uppercase">
              Availability
            </h4>
            <div className="space-y-1">
              <p className="text-sm font-bold">{footer.availability}</p>
              {/* <p className="text-xs text-muted-foreground">
                Full-time & Contract roles
              </p> */}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 pb-8 text-[9px] md:text-[10px] font-bold tracking-widest text-muted-foreground/40 uppercase md:flex-row border-t border-border/20 pt-8">
          <div>
            © {new Date().getFullYear()} John Doe. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="h-10 w-10 rounded-xl border border-border bg-secondary text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </Button>
  )
}
