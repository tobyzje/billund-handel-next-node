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

interface PaymentFormProps {
  amount: number
  description: string
}

export default function PaymentForm({ amount, description }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    cvr: "",
    address: "",
    city: "",
    zipCode: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/submit-membership", {
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
        title: "Anmodning modtaget",
        description: "Vi har modtaget din medlemsanmodning og vender tilbage hurtigst muligt.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        cvr: "",
        address: "",
        city: "",
        zipCode: "",
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
        <CardTitle>Medlemskab af Billund Handelsforening</CardTitle>
        <CardDescription>Udfyld venligst dine oplysninger for at ansøge om medlemskab</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Kontaktperson</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Fulde navn"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="firma@email.dk"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Virksomhed</label>
              <Input
                required
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Firmanavn"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CVR-nummer</label>
              <Input
                required
                value={formData.cvr}
                onChange={(e) => setFormData(prev => ({ ...prev, cvr: e.target.value }))}
                placeholder="12345678"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <Input
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Gade og husnummer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">By</label>
              <Input
                required
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Billund"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Postnummer</label>
              <Input
                required
                value={formData.zipCode}
                onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                placeholder="7190"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Sender..." : "Send medlemsanmodning"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
} 