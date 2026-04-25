import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { getExperience } from "@/lib/cms"

export default function Experience() {
  const [experience, setExperience] = useState<any[]>([
    {
      role: "Senior Data Scientist",
      company: "TechNova Solutions",
      period: "2022 - Present",
      description: "Leading the development of generative AI models and RAG pipelines for enterprise clients. Optimizing LLM performance and cost-efficiency.",
      skills: "Python, PyTorch, LangChain, Azure"
    },
    {
      role: "Data Scientist",
      company: "Insight Data Systems",
      period: "2020 - 2022",
      description: "Built predictive models for customer churn and demand forecasting. Implemented automated data pipelines using Airflow.",
      skills: "Pandas, Scikit-Learn, SQL, Airflow"
    },
    {
      role: "Junior Machine Learning Engineer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      description: "Assisted in training computer vision models for retail analytics. Developed REST APIs for model serving.",
      skills: "Flask, OpenCV, Docker"
    }
  ])

  useEffect(() => {
    async function loadData() {
      const data = await getExperience()
      if (data && data.length > 0) setExperience(data)
    }
    loadData()
  }, [])

  return (
    <section id="experience" className="py-24 px-6 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">Professional Journey</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
          {experience.map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background group-hover:border-primary group-hover:scale-125 transition-all md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              
              {/* Content */}
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-background/50 backdrop-blur-sm border-border hover:border-primary/20 transition-colors shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h3 className="font-bold text-lg">{item.role}</h3>
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tight">
                    {item.period}
                  </Badge>
                </div>
                <div className="text-sm font-medium text-primary mb-3">{item.company}</div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(item.skills || "").split(",").map((skill: string, j: number) => (
                    <Badge key={j} variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground border-border/50">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

