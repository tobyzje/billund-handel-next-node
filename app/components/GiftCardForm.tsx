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
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function GiftCardForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    // Køber information
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    
    // Modtager information
    recipientName: "",
    recipientEmail: "",
    
    // Gavekort detaljer
    amount: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/submit-giftcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Kunne ikke sende anmodning")
      }

      toast({
        title: "Bestilling modtaget",
        description: "Vi har modtaget din gavekort bestilling og vender tilbage hurtigst muligt.",
      })

      // Reset form
      setFormData({
        buyerName: "",
        buyerEmail: "",
        buyerPhone: "",
        recipientName: "",
        recipientEmail: "",
        amount: "",
        message: "",
      })

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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Bestil Gavekort</CardTitle>
        <CardDescription>Udfyld venligst nedenstående oplysninger for at bestille et gavekort</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Køber information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Køber Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Navn</label>
                <Input
                  required
                  value={formData.buyerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyerName: e.target.value }))}
                  placeholder="Dit navn"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.buyerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyerEmail: e.target.value }))}
                  placeholder="din@email.dk"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefon</label>
                <Input
                  required
                  type="tel"
                  value={formData.buyerPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyerPhone: e.target.value }))}
                  placeholder="12345678"
                />
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
                  required
                  value={formData.recipientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                  placeholder="Modtagers navn"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientEmail: e.target.value }))}
                  placeholder="modtager@email.dk"
                />
              </div>
            </div>
          </div>

          {/* Gavekort detaljer */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Gavekort Detaljer</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Beløb</label>
                <Input
                  type="number"
                  min="100"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Indtast beløb (min. 100 DKK)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Personlig hilsen (valgfrit)</label>
                <Input
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Skriv en personlig hilsen til modtageren"
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
            {isLoading ? "Sender..." : "Send bestilling"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
} 