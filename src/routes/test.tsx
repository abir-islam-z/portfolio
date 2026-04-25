import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"

const testFn = createServerFn({ method: "GET" }).handler(() => {
  return { message: "Server function working!" }
})

export const Route = createFileRoute("/test")({
  loader: async () => await testFn(),
  component: () => {
    const data = Route.useLoaderData()
    return <div>{data.message}</div>
  },
})
