'use client'

import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

export function AddToCalendarButton() {
  const handleAddToCalendar = () => {
    // Implementer kalender-logik her
    console.log("Tilføjer til kalender...")
  }

  return (
    <Button 
      className="w-full hover:scale-105 transition-transform duration-300"
      variant="default"
      onClick={handleAddToCalendar}
    >
      <CalendarIcon className="w-4 h-4 mr-2" />
      Tilføj Til Kalender
    </Button>
  )
} 