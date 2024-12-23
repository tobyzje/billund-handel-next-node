"use client"

import { useState } from "react"
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
import { useRouter } from "next/navigation"

const formSchema = z.object({
  cardNumber: z.string().min(16, "Ugyldigt kortnummer"),
  expiryDate: z.string().min(5, "Ugyldig udløbsdato"),
  cvv: z.string().min(3, "Ugyldig CVV"),
  cardholderName: z.string().min(2, "Indtast kortholder navn"),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: FormValues = {
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardholderName: ""
}

interface PaymentFormProps {
  registrationId: string
  amount: number
}

export function PaymentForm({ registrationId, amount }: PaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange"
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          amount,
          ...data
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Betalingsfejl")
      }

      toast({
        title: "Betaling gennemført!",
        description: "Din tilmelding er nu bekræftet",
      })

      router.push("/profile/events")
    } catch (error) {
      toast({
        title: "Fejl",
        description: error instanceof Error ? error.message : "Kunne ikke gennemføre betalingen",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kortnummer</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Udløbsdato</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="MM/YY"
                    maxLength={5}
                    value={field.value}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '')
                      if (value.length > 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2)
                      }
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kortholder</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Navn på kort"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? "Behandler..." : `Betal ${amount} kr`}
        </Button>
      </form>
    </Form>
  )
}