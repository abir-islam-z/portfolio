import { createFileRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"

const Hero = lazy(() => import("@/components/Hero"))
const Stats = lazy(() => import("@/components/Stats"))
const Experience = lazy(() => import("@/components/Experience"))
const Projects = lazy(() => import("@/components/Projects"))
const Contact = lazy(() => import("@/components/Contact"))

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Contact />
      </Suspense>
    </div>
  )
}







