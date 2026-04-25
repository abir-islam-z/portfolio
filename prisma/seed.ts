import bcrypt from "bcryptjs"
import "dotenv/config"
import { db } from "../src/lib/db"

const prisma = db

async function main() {
  console.log("Seeding database...")

  // --- Clear existing data ---
  await prisma.user.deleteMany({})
  await prisma.hero.deleteMany({})
  await prisma.stat.deleteMany({})
  await prisma.experience.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.testimonial.deleteMany({})
  await prisma.certification.deleteMany({})

  // --- User ---
  const hashedPassword = await bcrypt.hash("admin", 10)
  await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword
    }
  })
  console.log("User 'admin' with password 'admin' created.")

  // --- Hero ---
  await prisma.hero.create({
    data: {
      id: "singleton",
      introBadge: "DATA SCIENTIST & AI ENGINEER",
      title: "I build intelligent systems that turn data into impact.",
      description: "Specializing in LLMs, RAG, and NLP. I bridge the gap between complex research and scalable production applications.",
      videoDuration: "0:45",
      location: "London, UK",
      sponsorshipInfo: "British Citizen (No sponsorship required)",
      openToWork: true
    }
  })

  // --- Stats ---
  const stats = [
    { label: "Years Experience", value: "4+", order: 1 },
    { label: "Projects Completed", value: "25+", order: 2 },
    { label: "LLM Models Deployed", value: "10+", order: 3 },
    { label: "Code Quality", value: "99%", order: 4 }
  ]
  for (const stat of stats) {
    await prisma.stat.create({ data: stat })
  }

  // --- Experience ---
  const experiences = [
    {
      company: "Periscope",
      role: "Senior AI Engineer",
      period: "2023 - Present",
      description: "Leading the development of agentic coding systems and custom RAG architectures for enterprise clients.",
      skills: "Python, PyTorch, LangChain, OpenAI, Pinecone",
      order: 1
    },
    {
      company: "TechNexus",
      role: "Data Scientist",
      period: "2021 - 2023",
      description: "Developed predictive models for financial risk assessment and automated NLP pipelines for document processing.",
      skills: "Python, Scikit-learn, BERT, SQL, AWS",
      order: 2
    },
    {
      company: "London School of Economics",
      role: "Research Assistant",
      period: "2020 - 2021",
      description: "Conducted statistical analysis on large-scale socioeconomic datasets using Python and R.",
      skills: "R, Python, Stata, Econometrics",
      order: 3
    }
  ]
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }

  // --- Projects ---
  const projects = [
    {
      title: "RAG Optimizer",
      description: "A tool to optimize vector database retrieval using reranking and hybrid search methods.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      tags: "NLP, LangChain, Pinecone",
      isFeatured: true,
      link: "https://github.com/abir-islam-z/rag-optimizer",
      github: "https://github.com/abir-islam-z/rag-optimizer",
      order: 1
    },
    {
      title: "Enterprise Data Bot",
      description: "Custom AI agent for querying internal company documentation with high precision.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
      tags: "Enterprise, OpenAI, Python",
      isFeatured: true,
      link: "https://github.com/abir-islam-z/data-bot",
      github: "https://github.com/abir-islam-z/data-bot",
      order: 2
    },
    {
      title: "Sentiment Pulse",
      description: "Real-time sentiment analysis dashboard for tracking brand perception across social media.",
      image: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=800",
      tags: "Dashboard, React, FastAPI",
      isFeatured: false,
      link: "https://github.com/abir-islam-z/sentiment-pulse",
      github: "https://github.com/abir-islam-z/sentiment-pulse",
      order: 3
    }
  ]
  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  // --- Testimonials ---
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at FinTech Corp",
      content: "Abrar's ability to translate complex AI concepts into working products is unmatched. He delivered our RAG system ahead of schedule.",
      order: 1
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      content: "Excellent communication and technical skills. The data bot he built has saved our team hundreds of hours of manual research.",
      order: 2
    }
  ]
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
  }

  // --- Certifications ---
  const certifications = [
    {
      title: "AWS Certified Machine Learning - Specialty",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
      order: 1
    },
    {
      title: "Natural Language Processing Specialization",
      issuer: "DeepLearning.AI",
      date: "2022",
      link: "https://www.coursera.org/specializations/natural-language-processing",
      order: 2
    }
  ]
  for (const cert of certifications) {
    await prisma.certification.create({ data: cert })
  }

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
