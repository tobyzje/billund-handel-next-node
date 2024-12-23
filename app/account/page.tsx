"use client"

import { useEffect, useState } from "react"
import { User } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        
        if (data.user) {
          setUser(data.user)
          setName(data.user.name)
          setEmail(data.user.email)
        }
      } catch (error) {
        console.error("Fejl ved hentning af bruger:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })

      if (res.ok) {
        toast.success("Profil opdateret")
      } else {
        toast.error("Der skete en fejl ved opdatering af profilen")
      }
    } catch (error) {
      toast.error("Der skete en fejl ved opdatering af profilen")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Indlæser...</div>
  }

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Ikke autoriseret</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Min Profil</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Navn</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit">Gem ændringer</Button>
      </form>
    </div>
  )
}