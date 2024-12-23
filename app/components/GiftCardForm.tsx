"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface FormData {
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  recipientName: string
  recipientEmail: string
  amount: string
  message: string
}

export default function GiftCardForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/giftcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Kunne ikke oprette gavekort")

      toast({
        title: "Gavekort bestilt",
        description: "Vi har modtaget din bestilling og sender gavekortet hurtigst muligt.",
      })
      reset()
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der skete en fejl. Prøv igen senere.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bestil Gavekort</CardTitle>
        <CardDescription>
          Udfyld formularen nedenfor for at bestille et gavekort
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Køber information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Køber Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Navn</label>
                <Input
                  {...register("buyerName", { required: "Navn er påkrævet" })}
                  placeholder="Dit navn"
                  className={errors.buyerName ? "border-red-500" : ""}
                />
                {errors.buyerName && (
                  <p className="text-red-500 text-sm">{errors.buyerName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("buyerEmail", { 
                    required: "Email er påkrævet",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Ugyldig email adresse"
                    }
                  })}
                  type="email"
                  placeholder="din@email.dk"
                  className={errors.buyerEmail ? "border-red-500" : ""}
                />
                {errors.buyerEmail && (
                  <p className="text-red-500 text-sm">{errors.buyerEmail.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefon</label>
                <Input
                  {...register("buyerPhone", { required: "Telefon er påkrævet" })}
                  type="tel"
                  placeholder="12345678"
                  className={errors.buyerPhone ? "border-red-500" : ""}
                />
                {errors.buyerPhone && (
                  <p className="text-red-500 text-sm">{errors.buyerPhone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Modtager information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Modtager Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Navn</label>
                <Input
                  {...register("recipientName", { required: "Navn er påkrævet" })}
                  placeholder="Modtagers navn"
                  className={errors.recipientName ? "border-red-500" : ""}
                />
                {errors.recipientName && (
                  <p className="text-red-500 text-sm">{errors.recipientName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("recipientEmail", {
                    required: "Email er påkrævet",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Ugyldig email adresse"
                    }
                  })}
                  type="email"
                  placeholder="modtager@email.dk"
                  className={errors.recipientEmail ? "border-red-500" : ""}
                />
                {errors.recipientEmail && (
                  <p className="text-red-500 text-sm">{errors.recipientEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Gavekort detaljer */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Gavekort Detaljer</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Beløb (DKK)</label>
                <Input
                  {...register("amount", { 
                    required: "Beløb er påkrævet",
                    min: {
                      value: 100,
                      message: "Minimum beløb er 100 kr"
                    }
                  })}
                  type="number"
                  min="100"
                  placeholder="Indtast beløb"
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">{errors.amount.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Personlig hilsen (valgfrit)</label>
                <Textarea
                  {...register("message")}
                  placeholder="Skriv en personlig hilsen til modtageren"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sender..." : "Bestil Gavekort"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
