"use client"

import Image from 'next/image'
import { CalendarIcon, MapPinIcon, Clock, Users, DollarSignIcon, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDate } from '../lib/utils'
import { useState } from 'react'

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string | Date
    time: string
    location: string
    price: number
    imageUrl?: string | null
    maxSeats?: number | null
    registrations?: any[]
    city: {
      id: string
      name: string
    }
  }
}

export function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)
  const registeredCount = event.registrations?.length || 0
  const availableSeats = event.maxSeats ? event.maxSeats - registeredCount : null

  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          {event.imageUrl && !imageError ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
              onError={() => {
                console.log('Image error for:', event.imageUrl)
                setImageError(true)
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <CalendarIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{event.title}</h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <div>
                <span>{event.location}</span>
                {event.city && (
                  <span className="text-sm text-gray-500 block">
                    {event.city.name}
                  </span>
                )}
              </div>
            </div>

            {event.maxSeats && (
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {availableSeats} ledige pladser af {event.maxSeats}
                </span>
              </div>
            )}

            {event.price && (
              <div className="flex items-center text-gray-600">
                <Wallet className="h-4 w-4 mr-2" />
                <span>
                  {event.price} kr.
                </span>
              </div>
            )}
          </div>

          <Button className="w-full">Se mere & tilmeld</Button>
        </div>
      </div>
    </Link>
  )
} 