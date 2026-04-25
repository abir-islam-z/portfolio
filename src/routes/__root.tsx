import { TanStackDevtools } from "@tanstack/react-devtools"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import appCss from "../styles.css?url"
import { Navbar } from "@/components/Navbar"
import { getUser } from "@/lib/cms"
import { Toaster } from "sonner"

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await getUser()
    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Abrar Fahim | Data Scientist",
      },
      {
        name: "description",
        content: "Data Scientist | LLMs, RAG & NLP | London, UK",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground">The requested page could not be found.</p>
    </main>
  ),
  component: RootDocument,
})

function RootDocument() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          {!isAdmin && <Navbar />}
          <main className={isAdmin ? "flex-1" : "flex-1"}>
            <Outlet />
          </main>
          <Toaster position="top-center" richColors />
        </div>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
