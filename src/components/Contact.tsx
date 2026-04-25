import { RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill, RiMailFill } from "@remixicon/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

export default function Contact() {
  return (
    <section id="contact" className="pt-24 pb-12 px-6 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Contact Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Badge variant="outline" className="px-3 py-1.5 border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2" />
              Currently Available
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Looking for a <br />
              <span className="text-primary">Data Scientist</span> <br />
              who ships?
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Let&apos;s build something intelligent together. I&apos;m always open to discussing new projects, 
              partnerships, or opportunities to join innovative teams.
            </p>
          </div>

          <Card className="p-8 md:p-10 bg-background border-border space-y-6 shadow-none rounded-[40px]">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Name</Label>
              <Input 
                type="text" 
                placeholder="Abrar Fahim"
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
              <Input 
                type="email" 
                placeholder="hello@abrarfahim.co.uk"
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</Label>
              <Textarea 
                placeholder="Tell me about your project..."
                className="bg-secondary/50 border-border min-h-[120px] resize-none"
              />
            </div>
            <Button className="w-full font-bold h-12 rounded-2xl shadow-[0_10px_30px_rgba(0,112,243,0.2)] active:scale-[0.98]">
              Send Message
            </Button>
          </Card>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pt-24 border-t border-border">
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tighter italic">AF</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Data Scientist specializing in Generative AI, RAG, and NLP. Based in London, UK.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Say Hello</h4>
            <div className="space-y-2 flex flex-col">
              <a href="mailto:hello@abrarfahim.co.uk" className="text-sm font-bold hover:text-primary transition-colors">hello@abrarfahim.co.uk</a>
              <a href="#" className="text-sm font-bold hover:text-primary transition-colors">LinkedIn Profile</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Elsewhere</h4>
            <div className="flex gap-4">
              <SocialIcon icon={<RiGithubFill />} />
              <SocialIcon icon={<RiLinkedinBoxFill />} />
              <SocialIcon icon={<RiTwitterXFill />} />
              <SocialIcon icon={<RiMailFill />} />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Availability</h4>
            <div className="space-y-1">
              <p className="text-sm font-bold">Open for Opportunities</p>
              <p className="text-xs text-muted-foreground">Full-time & Contract roles</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 pb-8">
          <div>© {new Date().getFullYear()} Abrar Fahim. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
      {icon}
    </Button>
  )
}
