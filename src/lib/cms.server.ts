import bcrypt from "bcryptjs"
import { ZodError, z } from "zod"
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server"
import { decrypt, encrypt } from "./auth"
import { getDb } from "./db.server"

// --- UTILS ---
const formatZodError = (err: any) => {
  if (err instanceof ZodError) {
    return err.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")
  }
  return err?.message || "An unexpected error occurred"
}

export async function checkAuth() {
  const session = getCookie("session")
  if (!session) throw new Error("Unauthorized")
  try {
    const payload = await decrypt(session)
    return payload
  } catch (e) {
    throw new Error("Unauthorized")
  }
}

// --- AUTH ---
export async function loginServer(data: any) {
  const { username, password } = data
  const user = await (await getDb()).user.findUnique({ where: { username } })

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
}

export async function logoutServer() {
  await deleteCookie("session")
  return { success: true }
}

export async function getUserServer() {
  const session = getCookie("session")
  if (!session) return null
  try {
    const payload = await decrypt(session)
    return payload
  } catch (e) {
    return null
  }
}

export async function seedAdminServer() {
  const existing = await (await getDb()).user.findFirst()
  if (existing) return { message: "Admin already exists" }

  const hashedPassword = await bcrypt.hash("admin", 10)
  await (await getDb()).user.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  })
  return { message: "Admin created (admin/admin). Change this immediately!" }
}

// --- HERO ---
export async function getHeroServer() {
  console.log("[CMS.SERVER] getHeroServer calling.")
  let hero = await (await getDb()).hero.findUnique({
    where: { id: "singleton" },
  })
  if (!hero) {
    hero = {
      id: "singleton",
      introBadge: "INTRO",
      title: "Meet Abrar",
      description: "60 second intro",
      videoDuration: "0:60",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      location: "London, UK",
      sponsorshipInfo: "No sponsorship needed",
      openToWork: true,
      updatedAt: new Date(),
    }
  }
  return hero
}

export async function updateHeroServer(data: any) {
  try {
    await checkAuth()
    return await (await getDb()).hero.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

// --- FOOTER ---
export async function getFooterServer() {
  console.log("[CMS.SERVER] getFooterServer calling.")
  let footer = await (await getDb()).footer.findUnique({
    where: { id: "singleton" },
  })
  if (!footer) {
    footer = {
      id: "singleton",
      bio: "Data Scientist specializing in Generative AI, RAG, and NLP. Based in London, UK.",
      email: "hello@abrarfahim.co.uk",
      linkedin: "#",
      github: "#",
      twitter: "#",
      availability: "Open for Opportunities",
      updatedAt: new Date(),
    }
  }
  return footer
}

export async function updateFooterServer(data: any) {
  try {
    await checkAuth()
    const { id, ...rest } = data
    return await (await getDb()).footer.upsert({
      where: { id: "singleton" },
      update: rest,
      create: { id: "singleton", ...rest },
    })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

// --- STATS ---
export async function getStatsServer() {
  console.log("[CMS.SERVER] getStatsServer calling.")
  return await (await getDb()).stat.findMany({
    orderBy: { order: "asc" },
  })
}

export async function updateStatServer(data: any) {
  try {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await (await getDb()).stat.update({ where: { id }, data: rest })
    }
    return await (await getDb()).stat.create({ data: rest })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

export async function deleteStatServer(id: number) {
  await checkAuth()
  return await (await getDb()).stat.delete({ where: { id } })
}

// --- EXPERIENCE ---
export async function getExperienceServer() {
  return await (await getDb()).experience.findMany({
    orderBy: { order: "asc" },
  })
}

export async function updateExperienceServer(data: any) {
  try {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await (await getDb()).experience.update({ where: { id }, data: rest })
    }
    return await (await getDb()).experience.create({ data: rest })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

export async function deleteExperienceServer(id: number) {
  await checkAuth()
  return await (await getDb()).experience.delete({ where: { id } })
}

// --- PROJECTS ---
export async function getProjectsServer() {
  return await (await getDb()).project.findMany({
    orderBy: { order: "asc" },
  })
}

export async function updateProjectServer(data: any) {
  try {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await (await getDb()).project.update({ where: { id }, data: rest })
    }
    return await (await getDb()).project.create({ data: rest })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

export async function deleteProjectServer(id: number) {
  await checkAuth()
  return await (await getDb()).project.delete({ where: { id } })
}

// --- CONTACT ---
export async function submitContactServer(data: any) {
  try {
    return await (await getDb()).contactMessage.create({ data })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

export async function getContactMessagesServer() {
  await checkAuth()
  return await (await getDb()).contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })
}

// --- TESTIMONIALS ---
export async function getTestimonialsServer() {
  return await (await getDb()).testimonial.findMany({
    orderBy: { order: "asc" },
  })
}

export async function updateTestimonialServer(data: any) {
  try {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await (await getDb()).testimonial.update({ where: { id }, data: rest })
    }
    return await (await getDb()).testimonial.create({ data: rest })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

export async function deleteTestimonialServer(id: number) {
  await checkAuth()
  return await (await getDb()).testimonial.delete({ where: { id } })
}

// --- CERTIFICATIONS ---
export async function getCertificationsServer() {
  return await (await getDb()).certification.findMany({
    orderBy: { order: "asc" },
  })
}

export async function updateCertificationServer(data: any) {
  try {
    await checkAuth()
    const { id, ...rest } = data
    if (id) {
      return await (await getDb()).certification.update({ where: { id }, data: rest })
    }
    return await (await getDb()).certification.create({ data: rest })
  } catch (error: any) {
    throw new Error(formatZodError(error))
  }
}

export async function deleteCertificationServer(id: number) {
  await checkAuth()
  return await (await getDb()).certification.delete({ where: { id } })
}
