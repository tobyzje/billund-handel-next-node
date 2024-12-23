"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { User } from "../types"

interface UserNavProps {
  user: Pick<User, "name" | "email" | "role">
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Min Konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/account")}>
          Profil
        </DropdownMenuItem>
        {user.role === "ADMIN" && (
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            Admin Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.push("/account/events")}>
          Mine Events
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log ud
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 