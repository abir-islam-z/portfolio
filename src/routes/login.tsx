import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import PasswordField from "@/components/ui/password-field"
import { login, loginSchema } from "@/lib/cms"
import { RiLockPasswordLine, RiUser3Line } from "@remixicon/react"
import { useForm } from "@tanstack/react-form"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

function LoginPage() {
  const navigate = useNavigate()

  const form = useForm({
    validators: {
      onChange: loginSchema,
    },
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await login({
          data: { username: value.username, password: value.password },
        })
        toast.success("Logged in successfully")
        navigate({
          to: "/admin",
        })
      } catch (error) {
        toast.error("Login failed. Please try again.")
      }
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <RiLockPasswordLine size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Log in to manage your portfolio
          </p>
        </div>

        <Card className="border-border bg-secondary/30 p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="space-y-2">
                      <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                      <div className="relative">
                        <RiUser3Line
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="username"
                          autoComplete="off"
                          className="bg-background/50 pl-10"
                        />
                      </div>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="space-y-2">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <div className="relative">
                        <RiLockPasswordLine
                          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <PasswordField
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="••••••••"
                          autoComplete="off"
                          className="bg-background/50 pl-10"
                        />
                      </div>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <Button
              type="submit"
              // disabled={loading}
              className="text-md h-12 w-full font-bold"
            >
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/login")({
  component: LoginPage,
})
