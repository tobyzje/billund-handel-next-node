"use client"

import { useEffect, useState } from "react"
import { EventModal } from "../../components/admin/EventModal"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { EditEventModal } from "../../components/admin/EditEventModal"


interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  status: string
  maxSeats: number | null
  price: number | null
  cityId: string | null
  city: {
    id: string
    name: string
  } | null
  registrations: { status: string }[]
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/events')
      if (!response.ok) throw new Error('Kunne ikke hente events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke hente events",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Er du sikker på at du vil slette dette event?')) return

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Kunne ikke slette event')
      
      await fetchEvents()
      toast({
        title: "Success",
        description: "Event blev slettet",
      })
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke slette event",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Events</h1>
          <p className="text-gray-500">Administrer kommende og tidligere events</p>
        </div>
        <EventModal onEventAdded={fetchEvents} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="min-w-full p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Ingen events fundet
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Titel</th>
                  <th className="text-left pb-4 hidden md:table-cell">Dato</th>
                  <th className="text-left pb-4 hidden lg:table-cell">Lokation</th>
                  <th className="text-left pb-4">Status</th>
                  <th className="text-left pb-4">Tilmeldte</th>
                  <th className="text-right pb-4">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <div>{event.title}</div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {new Date(event.date).toLocaleDateString('da-DK')}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {new Date(event.date).toLocaleDateString('da-DK')}
                    </td>
                    <td className="py-4 hidden lg:table-cell">
                      {event.location}
                      {event.city && <span className="text-sm text-gray-500 ml-1">({event.city.name})</span>}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        event.status === 'upcoming' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status === 'upcoming' ? 'Kommende' : 'Afholdt'}
                      </span>
                    </td>
                    <td className="py-4">
                      {event.registrations.filter(r => r.status === 'confirmed').length}
                      {event.maxSeats && 
                        <span className="text-sm text-gray-500">/{event.maxSeats}</span>
                      }
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <EditEventModal 
                        event={{
                          ...event,
                          cityName: event.city?.name || ''
                        }} 
                        onEventUpdated={fetchEvents} 
                      />
                      <Button 
                        variant="ghost"
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 bg-red-100 hover:text-red-800 hover:bg-red-200"
                      >
                        Slet
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}