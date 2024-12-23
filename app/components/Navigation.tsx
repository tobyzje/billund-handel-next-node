"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "../hooks/useAuth"
import { UserNav } from "./UserNav"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const { user, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Events', href: '/events' },
    { name: 'Medlemmer', href: '/members' },
    { name: 'Gavekort', href: '/giftcards' },
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-blue-600 hover:text-blue-700"
              >
                Billund Handel
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons / User Nav */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {!isLoading && (
              <>
                {user ? (
                  <UserNav user={user} />
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/account/register">Opret konto</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/login">Log ind</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {!isLoading && !user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-1">
                <Link
                  href="/account/register"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Opret konto
                </Link>
                <Link
                  href="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log ind
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
} 