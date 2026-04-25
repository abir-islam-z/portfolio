import { createServerFn } from "@tanstack/react-start"
import bcrypt from "bcryptjs"
import { z } from "zod"
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server"
import { decrypt, encrypt } from "./auth"
import { db } from "./db"

// --- SCHEMAS ---
const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

const heroSchema = z.object({
  introBadge: z.string().optional(),
  videoDuration: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  sponsorshipInfo: z.string().optional(),
})

const statSchema = z.object({
  id: z.number().optional(),
  value: z.string(),
  label: z.string(),
  order: z.number().default(0),
})

const experienceSchema = z.object({
  id: z.number().optional(),
  role: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  skills: z.string(),
  order: z.number().default(0),
})

const projectSchema = z.object({
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

const testimonialSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  role: z.string(),
  content: z.string(),
  image: z.string().nullable().optional(),
  order: z.number().default(0),
})

const certificationSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  link: z.string().nullable().optional(),
  order: z.number().default(0),
})

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

// --- AUTH ---
export const login = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const { username, password } = data
    const user = await db.user.findUnique({ where: { username } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials")
    }

    const session = await encrypt({ userId: user.id, username: user.username })
    setCookie("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    })

    return { success: true }
  })

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  await deleteCookie("session")
  return { success: true }
})

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = getCookie("session")
  if (!session) return null
  try {
    const payload = await decrypt(session)
    return payload
  } catch (e) {
    return null
  }
})

// Temporary seed function - ONLY run once
export const seedAdmin = createServerFn({ method: "POST" }).handler(
  async () => {
    const existing = await db.user.findFirst()
    if (existing) return { message: "Admin already exists" }

    const hashedPassword = await bcrypt.hash("admin", 10)
    await db.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
      },
    })
    return { message: "Admin created (admin/admin). Change this immediately!" }
  }
)

async function checkAuth() {
  const user = await getUser()
  if (!user) throw new Error("Unauthorized")
  return user
}

// --- HERO & GLOBAL ---
export const getHero = createServerFn({ method: "GET" }).handler(async () => {
  let hero = await db.hero.findUnique({
    where: { id: "singleton" },
  })
  if (!hero) {
    hero = {
      id: "singleton",
      introBadge: "INTRO",
      title: "Meet Abrar",
      description: "60 second intro",
      videoDuration: "0:60",
      location: "London, UK",
      sponsorshipInfo: "No sponsorship needed",
      openToWork: true,
      updatedAt: new Date(),
    }
  }
  return hero
})

export const updateHero = createServerFn({ method: "POST" })
  .inputValidator(heroSchema)
  .handler(async ({ data }) => {
    await checkAuth()
    return await db.hero.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    })
  })

// --- STATS ---
export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  return await db.stat.findMany({
    orderBy: { order: "asc" },
  })
})

export const updateStat = createServerFn({ method: "POST" })
  .inputValidator(statSchema)
  .handler(async ({ data }) => {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await db.stat.update({ where: { id }, data: rest })
    }
    return await db.stat.create({ data: rest })
  })

export const deleteStat = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    await checkAuth()
    return await db.stat.delete({ where: { id } })
  })

// --- EXPERIENCE ---
export const getExperience = createServerFn({ method: "GET" }).handler(
  async () => {
    return await db.experience.findMany({
      orderBy: { order: "asc" },
    })
  }
)

export const updateExperience = createServerFn({ method: "POST" })
  .inputValidator(experienceSchema)
  .handler(async ({ data }) => {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await db.experience.update({ where: { id }, data: rest })
    }
    return await db.experience.create({ data: rest })
  })

export const deleteExperience = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    await checkAuth()
    return await db.experience.delete({ where: { id } })
  })

// --- PROJECTS ---
export const getProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    return await db.project.findMany({
      orderBy: { order: "asc" },
    })
  }
)

export const updateProject = createServerFn({ method: "POST" })
  .inputValidator(projectSchema)
  .handler(async ({ data }) => {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await db.project.update({ where: { id }, data: rest })
    }
    return await db.project.create({ data: rest })
  })

export const deleteProject = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    await checkAuth()
    return await db.project.delete({ where: { id } })
  })

// --- CONTACT MESSAGES ---
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    return await db.contactMessage.create({ data })
  })

export const getContactMessages = createServerFn({ method: "GET" }).handler(
  async () => {
    await checkAuth()
    return await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    })
  }
)

// --- TESTIMONIALS ---
export const getTestimonials = createServerFn({ method: "GET" }).handler(
  async () => {
    return await db.testimonial.findMany({
      orderBy: { order: "asc" },
    })
  }
)

export const updateTestimonial = createServerFn({ method: "POST" })
  .inputValidator(testimonialSchema)
  .handler(async ({ data }) => {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await db.testimonial.update({ where: { id }, data: rest })
    }
    return await db.testimonial.create({ data: rest })
  })

export const deleteTestimonial = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    await checkAuth()
    return await db.testimonial.delete({ where: { id } })
  })

// --- CERTIFICATIONS ---
export const getCertifications = createServerFn({ method: "GET" }).handler(
  async () => {
    return await db.certification.findMany({
      orderBy: { order: "asc" },
    })
  }
)

export const updateCertification = createServerFn({ method: "POST" })
  .inputValidator(certificationSchema)
  .handler(async ({ data }) => {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await db.certification.update({ where: { id }, data: rest })
    }
    return await db.certification.create({ data: rest })
  })

export const deleteCertification = createServerFn({ method: "POST" })
  .inputValidator(z.number())
  .handler(async ({ data: id }) => {
    await checkAuth()
    return await db.certification.delete({ where: { id } })
  })
