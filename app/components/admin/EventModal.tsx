"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { EventForm } from "./EventForm"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

interface EventModalProps {
  isOpen?: boolean
  onClose?: () => void
  onSubmit?: (data: any) => void
  onEventAdded: () => Promise<void>
}

export function EventModal({ onEventAdded }: EventModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (data: any) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("date", data.date)
      formData.append("time", data.time)
      formData.append("location", data.location)
      formData.append("maxSeats", data.maxSeats || "")
      formData.append("price", data.price || "Gratis")
      formData.append("cityName", data.cityName || "")
      
      if (data.image?.[0]) {
        formData.append("image", data.image[0])
      }

      const response = await fetch("/api/admin/events", {
        method: "POST",
        body: formData
      })

      if (!response.ok) throw new Error("Kunne ikke oprette event")
      
      await onEventAdded()
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke oprette event",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Opret Event</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>Opret Event</DialogTitle>
        <div className="py-4">
          <EventForm 
            onSubmit={handleSubmit} 
            onCancel={() => setIsOpen(false)}
            showImageUpload={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
