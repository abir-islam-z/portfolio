import tailwindcss from "@tailwindcss/vite"
// import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    // devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
     nitro({
      preset: 'vercel' // Often optional as Vercel detects this
    })
  ],
  ssr: {
    external: [
      "@prisma/client",
      "@prisma/adapter-better-sqlite3",
      "better-sqlite3",
    ],
  },
})

export default config
