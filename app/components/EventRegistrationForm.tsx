"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, "Navn skal være mindst 2 tegn"),
  email: z.string().email("Ugyldig email"),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
}

interface EventRegistrationFormProps {
  eventId: string
  price: number | null
  isOpen: boolean
  onClose: () => void
}

export function EventRegistrationForm({ 
  eventId, 
  price, 
  isOpen, 
  onClose 
}: EventRegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange"
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset(defaultValues)
    }
  }, [isOpen, form])

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          ...data,
          phone: data.phone || null,
          company: data.company || null
        }),
      })

      if (!response.ok) throw new Error()

      const result = await response.json()

      if (price) {
        window.location.href = `/payment/${result.id}`
      } else {
        toast({
          title: "Success!",
          description: "Du er nu tilmeldt eventet",
        })
        onClose()
      }
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke gennemføre tilmeldingen",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tilmeld Event</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn</FormLabel>
                  <FormControl>
                    <Input placeholder="Dit navn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="din@email.dk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon (valgfrit)</FormLabel>
                  <FormControl>
                    <Input placeholder="Dit telefonnummer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Virksomhed (valgfrit)</FormLabel>
                  <FormControl>
                    <Input placeholder="Din virksomhed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {price && (
              <div className="text-center py-4">
                <p className="text-lg font-semibold">Pris: {price} kr</p>
                <p className="text-sm text-gray-500">
                  Du vil blive viderestillet til betaling efter tilmelding
                </p>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuller
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Behandler..." : "Tilmeld"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 