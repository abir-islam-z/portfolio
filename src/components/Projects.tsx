import { RiArrowRightUpLine, RiGithubFill } from "@remixicon/react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { Button } from "./ui/button"

export default function Projects() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
      {/* Featured Project */}
      <Card className="group relative grid lg:grid-cols-2 gap-12 items-center bg-secondary/50 rounded-[40px] p-8 md:p-12 border-border overflow-hidden shadow-none">
        <div className="relative z-10 space-y-8">
          <Badge variant="default" className="text-[10px] font-bold tracking-widest uppercase">
            Featured Project
          </Badge>
          <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter">EcoSense AI <br /> Sustainability</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              A production-ready RAG system analyzing enterprise climate impact data to generate 
              automated ESG compliance reports.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Llama-3", "Pinecone", "Azure"].map((tag) => (
              <Badge key={tag} variant="outline" className="px-4 py-2 rounded-full border-border bg-background/50 text-xs font-semibold text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-6 pt-4">
            <Button variant="link" className="flex items-center gap-2 p-0 text-foreground font-bold hover:text-primary transition-colors no-underline">
              Case Study <RiArrowRightUpLine size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-colors">
              <RiGithubFill size={24} />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border group-hover:scale-[1.02] transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
              alt="Project" 
              className="w-full h-full object-cover"
            />
            {/* Glowing Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <ProjectCard 
          title="MarketFlow Predictive" 
          desc="Real-time sentiment analysis for stock market movements using fine-tuned BERT models."
          tags={["PyTorch", "HuggingFace"]}
          image="https://images.unsplash.com/photo-1611974717482-583006626656?auto=format&fit=crop&q=80&w=800"
        />
        <ProjectCard 
          title="NeuroDoc Assistant" 
          desc="AI-powered medical documentation and clinical trial matching system for oncology."
          tags={["FastAPI", "React"]}
          image="https://images.unsplash.com/photo-1576091160550-2173bdb999ef?auto=format&fit=crop&q=80&w=800"
        />
      </div>
    </section>
  )
}

function ProjectCard({ title, desc, tags, image }: { title: string; desc: string; tags: string[]; image: string }) {
  return (
    <Card className="group bg-secondary/50 rounded-[32px] p-6 border-border hover:border-primary/20 transition-all shadow-none">
      <div className="aspect-video rounded-2xl overflow-hidden mb-6 border border-border">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="space-y-4 px-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {tag}
            </span>
          ))}
        </div>
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        <Button variant="link" className="flex items-center gap-2 p-0 text-sm font-bold text-foreground group-hover:text-primary transition-colors no-underline">
          View Project <RiArrowRightUpLine size={16} />
        </Button>
      </div>
    </Card>
  )
}
