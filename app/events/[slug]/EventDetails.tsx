"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { da } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPinIcon, Wallet, Users } from "lucide-react"
import { EventRegistrationForm } from "../../components/EventRegistrationForm"

interface EventDetailsProps {
  event: {
    id: string
    title: string
    description: string
    date: Date
    time: string
    location: string
    imageUrl: string | null
    price: number | null
    maxSeats: number | null
    city: { name: string } | null
    registrations: { status: string }[]
  }
}

export function EventDetails({ event }: EventDetailsProps) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  
  const availableSeats = event.maxSeats 
    ? event.maxSeats - event.registrations.length 
    : null

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {event.imageUrl && (
            <div className="relative h-96 w-full">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span>{format(event.date, "d. MMMM yyyy", { locale: da })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
                <span>{event.location}{event.city?.name && `, ${event.city.name}`}</span>
              </div>
              
              {event.price !== null && (
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-gray-500" />
                  <span>{event.price} kr</span>
                </div>
              )}

              {availableSeats !== null && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>{availableSeats} ledige pladser</span>
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <p>{event.description}</p>
            </div>

            <Button 
              onClick={() => setShowRegistrationForm(true)}
              size="lg"
              className="w-full md:w-auto"
            >
              Tilmeld dig
            </Button>
          </div>
        </div>
      </div>

      <EventRegistrationForm 
        eventId={event.id}
        price={event.price}
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
      />
    </div>
  )
} 