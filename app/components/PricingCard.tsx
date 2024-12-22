"use client"

import { useState } from 'react'
import PaymentForm from './PaymentForm'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card"
import { Check } from "lucide-react"

const membershipFeatures = [
  "Adgang til alle netværksarrangementer",
  "Synlighed på vores hjemmeside",
  "Stemmeret til generalforsamling",
  "Deltagelse i fælles markedsføring",
  "Rabatter hos andre medlemmer",
  "Månedligt nyhedsbrev"
]

export default function PricingCard() {
  const [showForm, setShowForm] = useState(false)

  if (showForm) {
    return <PaymentForm amount={2400} description="Årligt medlemskab" />
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg border-2 hover:border-blue-500 transition-all duration-200">
        <CardHeader className="text-center">
          <CardDescription>Bliv en del af Billund Handelsforening</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold">2.400 kr</span>
            <span className="text-gray-500 ml-2">/år</span>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <ul className="space-y-4">
            {membershipFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full text-lg py-6"
            onClick={() => setShowForm(true)}
          >
            Bliv Medlem Nu
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 