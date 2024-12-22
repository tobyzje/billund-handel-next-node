"use client"

import { cn } from "@/lib/utils"
import { 
  CreditCard, 
  Users, 
  Calendar, 
  Settings,
  LayoutDashboard
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Gavekort",
    href: "/admin/giftcards",
    icon: CreditCard
  },
  {
    title: "Medlemmer",
    href: "/admin/members",
    icon: Users
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar
  },
  {
    title: "Indstillinger",
    href: "/admin/settings",
    icon: Settings
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              pathname === item.href 
                ? "bg-blue-50 text-blue-700" 
                : "hover:bg-gray-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 