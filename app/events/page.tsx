import { EventCard } from "../components/EventCard"
import { prisma } from "@/lib/db"

type EventWithRegistrations = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  cityName: string
  price: number
  imageUrl?: string | null
  maxSeats?: number | null
  registrations: { id: string; status: string }[]
  city: {
    id: string
    name: string
  }
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      time: true,
      location: true,
      price: true,
      imageUrl: true,
      maxSeats: true,
      registrations: {
        select: {
          id: true,
          status: true
        }
      },
      city: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  })

  console.log('Antal events:', events.length)
  events.forEach((event: EventWithRegistrations, index: number) => {
    console.log(`Event ${index + 1}:`, {
      id: event.id,
      title: event.title,
      date: event.date,
      price: event.price,
      imageUrl: event.imageUrl
    })
  })

  const futureEvents = events.filter((event: EventWithRegistrations) => new Date(event.date) >= new Date())
  console.log('Antal fremtidige events:', futureEvents.length)

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Kommende Events</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {futureEvents.map((event: EventWithRegistrations) => (
          <EventCard 
            key={event.id} 
            event={{
              ...event,
              date: new Date(event.date)
            }} 
          />
        ))}
      </div>

      {futureEvents.length === 0 && (
        <p className="text-center text-gray-500">
          Der er ingen kommende events på nuværende tidspunkt.
        </p>
      )}
    </div>
  )
}