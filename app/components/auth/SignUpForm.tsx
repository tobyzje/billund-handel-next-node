"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SignUpFormData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>()
  const router = useRouter()
  
  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Fejl",
        description: "Passwords matcher ikke",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Kunne ikke oprette bruger")
      }

      toast({
        title: "Success",
        description: "Din konto er blevet oprettet",
      })
      
      router.push("/login") // Redirect til login side
    } catch (error) {
      toast({
        title: "Fejl",
        description: error instanceof Error ? error.message : "Kunne ikke oprette bruger",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Fulde navn</label>
        <Input
          {...register("name", { required: "Navn er påkrævet" })}
          placeholder="John Doe"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          {...register("email", {
            required: "Email er påkrævet",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Ugyldig email adresse"
            }
          })}
          type="email"
          placeholder="john@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Telefon</label>
        <Input
          {...register("phone")}
          type="tel"
          placeholder="12345678"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          {...register("password", { 
            required: "Password er påkrævet",
            minLength: {
              value: 8,
              message: "Password skal være mindst 8 tegn"
            }
          })}
          type="password"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bekræft password</label>
        <Input
          {...register("confirmPassword", {
            required: "Bekræft password er påkrævet"
          })}
          type="password"
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Opretter..." : "Opret Konto"}
      </Button>
    </form>
  )
} 