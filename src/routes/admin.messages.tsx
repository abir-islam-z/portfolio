import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { RiMailLine, RiTimeLine, RiUserLine } from "@remixicon/react"
import { Card } from "@/components/ui/card"
import { getContactMessages } from "@/lib/cms"

interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  createdAt: string | Date
}

function AdminMessagesComponent() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getContactMessages()
      setMessages(data as ContactMessage[])
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      <header>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Inquiries from your portfolio contact form.
        </p>
      </header>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-border py-20 text-center">
            <RiMailLine
              size={48}
              className="mx-auto mb-4 text-muted-foreground opacity-20"
            />
            <p className="text-muted-foreground">No messages yet.</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <Card key={i} className="border-border bg-card/30 p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <RiUserLine size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">{msg.name}</h3>
                    <p className="text-xs text-muted-foreground">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  <RiTimeLine size={14} />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              <p className="rounded-xl border border-border/50 bg-background/50 p-4 text-sm leading-relaxed text-foreground/80">
                {msg.message}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessagesComponent,
})
