import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

// --- SCHEMAS (Shared) ---
export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const heroSchema = z.object({
  introBadge: z.string().optional(),
  videoDuration: z.string().optional(),
  videoUrl: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  sponsorshipInfo: z.string().optional(),
  openToWork: z.boolean().optional(),
})

export const statSchema = z.object({
  id: z.number().optional(),
  value: z.string(),
  label: z.string(),
  order: z.number().default(0),
})

export const experienceSchema = z.object({
  id: z.number().optional(),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  skills: z.string(),
  order: z.number().default(0),
})

export const projectSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  tags: z.string(),
  isFeatured: z.boolean().default(false),
  link: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  order: z.number().default(0),
})

export const testimonialSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  role: z.string(),
  content: z.string(),
  image: z.string().nullable().optional(),
  order: z.number().default(0),
})

export const certificationSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  link: z.string().nullable().optional(),
  order: z.number().default(0),
})

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  message: z.string().min(1, "Message cannot be empty").trim(),
})

export const footerSchema = z.object({
  id: z.string().optional(),
  bio: z.string().default(""),
  email: z.string().email("Invalid email address").or(z.literal("")).default(""),
  linkedin: z.string().default(""),
  github: z.string().default(""),
  twitter: z.string().default(""),
  availability: z.string().default(""),
})

// --- AUTH ---
export const login = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const { loginServer } = await import("./cms.server")
    return loginServer(data)
  })

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutServer } = await import("./cms.server")
  return logoutServer()
})

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getUserServer } = await import("./cms.server")
  return getUserServer()
})

export const seedAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { seedAdminServer } = await import("./cms.server")
  return seedAdminServer()
})

// --- HERO & GLOBAL ---
export const getHero = createServerFn({ method: "GET" }).handler(async () => {
  const { getHeroServer } = await import("./cms.server")
  return getHeroServer()
})

export const updateHero = createServerFn({ method: "POST" })
  .inputValidator(heroSchema)
  .handler(async ({ data }) => {
    const { updateHeroServer } = await import("./cms.server")
    return updateHeroServer(data)
  })

export const getFooter = createServerFn({ method: "GET" }).handler(async () => {
  const { getFooterServer } = await import("./cms.server")
  return getFooterServer()
})

export const updateFooter = createServerFn({ method: "POST" })
  .inputValidator(footerSchema)
  .handler(async ({ data }) => {
    const { updateFooterServer } = await import("./cms.server")
    return updateFooterServer(data)
  })

// --- STATS ---
export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  const { getStatsServer } = await import("./cms.server")
  return getStatsServer()
})

export const updateStat = createServerFn({ method: "POST" })
  .inputValidator(statSchema)
  .handler(async ({ data }) => {
    const { updateStatServer } = await import("./cms.server")
    return updateStatServer(data)
  })

export const deleteStat = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    const { deleteStatServer } = await import("./cms.server")
    return deleteStatServer(id)
  })

// --- EXPERIENCE ---
export const getExperience = createServerFn({ method: "GET" }).handler(async () => {
  const { getExperienceServer } = await import("./cms.server")
  return getExperienceServer()
})

export const updateExperience = createServerFn({ method: "POST" })
  .inputValidator(experienceSchema)
  .handler(async ({ data }) => {
    const { updateExperienceServer } = await import("./cms.server")
    return updateExperienceServer(data)
  })

export const deleteExperience = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    const { deleteExperienceServer } = await import("./cms.server")
    return deleteExperienceServer(id)
  })

// --- PROJECTS ---
export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { getProjectsServer } = await import("./cms.server")
  return getProjectsServer()
})

export const updateProject = createServerFn({ method: "POST" })
  .inputValidator(projectSchema)
  .handler(async ({ data }) => {
    const { updateProjectServer } = await import("./cms.server")
    return updateProjectServer(data)
  })

export const deleteProject = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    const { deleteProjectServer } = await import("./cms.server")
    return deleteProjectServer(id)
  })

// --- CONTACT MESSAGES ---
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const { submitContactServer } = await import("./cms.server")
    return submitContactServer(data)
  })

export const getContactMessages = createServerFn({ method: "GET" }).handler(async () => {
  const { getContactMessagesServer } = await import("./cms.server")
  return getContactMessagesServer()
})

// --- TESTIMONIALS ---
export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { getTestimonialsServer } = await import("./cms.server")
  return getTestimonialsServer()
})

export const updateTestimonial = createServerFn({ method: "POST" })
  .inputValidator(testimonialSchema)
  .handler(async ({ data }) => {
    const { updateTestimonialServer } = await import("./cms.server")
    return updateTestimonialServer(data)
  })

export const deleteTestimonial = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    const { deleteTestimonialServer } = await import("./cms.server")
    return deleteTestimonialServer(id)
  })

// --- CERTIFICATIONS ---
export const getCertifications = createServerFn({ method: "GET" }).handler(async () => {
  const { getCertificationsServer } = await import("./cms.server")
  return getCertificationsServer()
})

export const updateCertification = createServerFn({ method: "POST" })
  .inputValidator(certificationSchema)
  .handler(async ({ data }) => {
    const { updateCertificationServer } = await import("./cms.server")
    return updateCertificationServer(data)
  })

export const deleteCertification = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    const { deleteCertificationServer } = await import("./cms.server")
    return deleteCertificationServer(id)
  })
