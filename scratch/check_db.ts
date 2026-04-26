import { db } from "../src/lib/db"

async function check() {
  console.log("Checking DB...")
  const hero = await db.hero.findUnique({ where: { id: "singleton" } })
  const footer = await db.footer.findUnique({ where: { id: "singleton" } })
  const stats = await db.stat.findMany()
  
  console.log("Hero exists:", !!hero)
  console.log("Footer exists:", !!footer)
  console.log("Stats count:", stats.length)
  
  if (hero) console.log("Hero title:", hero.title)
  if (footer) console.log("Footer bio:", footer.bio.substring(0, 20) + "...")
}

check().catch(console.error)
