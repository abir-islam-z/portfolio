import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { RiGithubFill, RiExternalLinkLine } from "@remixicon/react"
import { getProjects } from "@/lib/cms"

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([
    {
      title: "Self-Correction in LLMs",
      description: "Researching and implementing iterative refinement techniques for large language models to improve factual accuracy and reasoning.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      tags: "Research, LLM, Python",
      isFeatured: true,
      link: "#",
      github: "#"
    },
    {
      title: "RAG Optimizer",
      description: "A tool to optimize vector database retrieval using reranking and hybrid search methods.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      tags: "NLP, LangChain, Pinecone",
      isFeatured: false,
      link: "#",
      github: "#"
    },
    {
      title: "Enterprise Data Bot",
      description: "Custom AI agent for querying internal company documentation with high precision.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
      tags: "Enterprise, OpenAI",
      isFeatured: false,
      link: "#",
      github: "#"
    }
  ])

  useEffect(() => {
    async function loadData() {
      const data = await getProjects()
      if (data && data.length > 0) setProjects(data)
    }
    loadData()
  }, [])

  const featuredProject = projects.find(p => p.isFeatured)
  const otherProjects = projects.filter(p => !p.isFeatured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5 px-3 py-1">MY WORK</Badge>
            <h2 className="text-4xl font-bold tracking-tight">Case Studies & Projects</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A selection of my recent work in data science, specializing in large language models and RAG systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Featured Project */}
          {featuredProject && (
            <div className="group relative grid md:grid-cols-2 gap-8 items-center bg-secondary/30 rounded-[40px] p-8 md:p-12 border border-border/50 hover:border-primary/20 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Badge className="bg-primary text-primary-foreground">FEATURED</Badge>
              </div>
              <div className="order-2 md:order-1 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {(featuredProject.tags || "").split(",").map((tag: string, i: number) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-primary/80">{tag.trim()}</span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold">{featuredProject.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="flex items-center gap-4">
                  <Button className="rounded-full px-8">View Case Study</Button>
                  <div className="flex items-center gap-2">
                    {featuredProject.github && (
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-background"><RiGithubFill size={20} /></Button>
                    )}
                    {featuredProject.link && (
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-background"><RiExternalLinkLine size={20} /></Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Other Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project, i) => (
              <Card key={i} className="p-4 bg-background/50 border-border group hover:border-primary/20 transition-all overflow-hidden">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 border border-border">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="px-2 pb-2 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(project.tags || "").split(",").map((tag: string, j: number) => (
                      <span key={j} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tag.trim()}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <Button variant="link" className="p-0 h-auto text-primary font-bold">Read More</Button>
                    <div className="flex items-center gap-1">
                      {project.github && <Button variant="ghost" size="icon" className="h-8 w-8"><RiGithubFill size={18} /></Button>}
                      {project.link && <Button variant="ghost" size="icon" className="h-8 w-8"><RiExternalLinkLine size={18} /></Button>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
