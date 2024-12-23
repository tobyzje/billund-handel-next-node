"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSetup = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/setup", {
        method: "GET",
      })
      const data = await response.json()
      
      if (response.ok) {
        setMessage(`Success! ${data.email} er nu admin`)
        setTimeout(() => router.push("/admin"), 2000)
      } else {
        setMessage(data.error || "Der skete en fejl")
      }
    } catch (error) {
      setMessage("Der skete en fejl")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Admin Setup</h1>
        <p className="text-gray-600">
          Klik på knappen nedenfor for at gøre den første bruger til administrator
        </p>
        <Button 
          onClick={handleSetup} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Arbejder..." : "Opret Admin"}
        </Button>
        {message && (
          <p className={message.includes("Success") ? "text-green-600" : "text-red-600"}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
} 