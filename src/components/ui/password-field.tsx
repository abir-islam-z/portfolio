import { cn } from "@/lib/utils"
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import React, { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"

interface Props extends React.ComponentProps<"input"> {
  className?: string
}

export default function PasswordField({ className, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="relative">
      <Input
        className={cn(className, "pr-12")}
        {...props}
        type={showPassword ? "text" : "password"}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={togglePassword}
        className="absolute top-1/2 right-3 -translate-y-1/2"
      >
        {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
      </Button>
    </div>
  )
}
