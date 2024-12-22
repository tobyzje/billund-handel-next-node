'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NavigationButtonProps {
  href: string
  variant?: "default" | "outline"
  children: React.ReactNode
  className?: string
}

export function NavigationButton({ href, variant = "default", children, className }: NavigationButtonProps) {
  const router = useRouter()
  
  return (
    <Button 
      variant={variant} 
      className={className}
      onClick={() => router.push(href)}
    >
      {children}
    </Button>
  )
}