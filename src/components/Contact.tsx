import { useState } from "react"
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
import { submitContact } from "@/lib/cms"

export default function Contact() {
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await submitContact({ data })
      setSuccess(true)
      e.currentTarget.reset()
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <section id="contact" className="border-t border-border px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">
        {/* Left Side */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-8 text-6xl leading-tight font-black tracking-tighter">
              Data Scientist <br />
              <span className="text-primary">who ships?</span>
            </h2>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Let's build something intelligent together. I'm always open to
              discussing new projects, partnerships, or opportunities to join
              innovative teams.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@abrarfahim.co.uk"
              className="text-lg font-bold transition-colors hover:text-primary"
            >
              hello@abrarfahim.co.uk
            </a>
            <a
              href="#"
              className="text-lg font-bold transition-colors hover:text-primary"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="rounded-[40px] border-border bg-secondary/30 p-10 shadow-none">
          {success ? (
            <div className="space-y-4 py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <RiMailLine size={32} />
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">
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
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Abrar Fahim"
                  required
                  className="h-12 rounded-xl border-border bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@abrarfahim.co.uk"
                  required
                  className="h-12 rounded-xl border-border bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  className="min-h-37.5 resize-none rounded-xl border-border bg-background/50"
                />
              </div>
              <Button
                type="submit"
                disabled={pending}
                className="text-md h-14 w-full rounded-2xl bg-primary font-bold shadow-[0_4px_20px_rgba(0,112,243,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {pending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </Card>
      </div>

      <div className="mx-auto max-w-7xl space-y-24">
        {/* Footer Grid */}
        <div className="mt-24 grid gap-12 border-t border-border pt-24 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tighter italic">
              AF
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Data Scientist specializing in Generative AI, RAG, and NLP. Based
              in London, UK.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-widest text-primary uppercase">
              Say Hello
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href="mailto:hello@abrarfahim.co.uk"
                className="text-sm font-bold transition-colors hover:text-primary"
              >
                hello@abrarfahim.co.uk
              </a>
              <a
                href="#"
                className="text-sm font-bold transition-colors hover:text-primary"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-widest text-primary uppercase">
              Elsewhere
            </h4>
            <div className="flex gap-4">
              <SocialIcon icon={<RiGithubFill />} />
              <SocialIcon icon={<RiLinkedinBoxFill />} />
              <SocialIcon icon={<RiTwitterXFill />} />
              <SocialIcon icon={<RiMailFill />} />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-widest text-primary uppercase">
              Availability
            </h4>
            <div className="space-y-1">
              <p className="text-sm font-bold">Open for Opportunities</p>
              <p className="text-xs text-muted-foreground">
                Full-time & Contract roles
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pb-8 text-[10px] font-bold tracking-widest text-muted-foreground/40 uppercase md:flex-row">
          <div>
            © {new Date().getFullYear()} Abrar Fahim. All Rights Reserved.
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

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-xl border border-border bg-secondary text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
    >
      {icon}
    </Button>
  )
}
