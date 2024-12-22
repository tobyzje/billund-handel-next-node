"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { useState } from "react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementer login logik her
    console.log("Login attempt:", { email, password })
  }

  return (
    <Card className="w-full border-t-4 border-t-blue-500">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log ind</CardTitle>
        <CardDescription>
          Log ind for at få adgang til din profil
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="navn@firma.dk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded border-gray-300" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Husk mig
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Log ind
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Eller
              </span>
            </div>
          </div>
          <div className="grid gap-2 w-full">
            <Button variant="outline" className="w-full">
              Opret ny konto
            </Button>
            <Button variant="link" className="text-sm text-blue-500">
              Glemt adgangskode?
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}