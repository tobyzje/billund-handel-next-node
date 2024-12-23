"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EventForm } from "./EventForm"

interface EditEventModalProps {
  isOpen?: boolean
  onClose?: () => void
  onSubmit?: (data: any) => void
  onEventUpdated: () => Promise<void>
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    maxSeats: number | null
    price: number | null
    city: {
      name: string
    } | null
    cityName?: string
  }
}

export function EditEventModal({ isOpen, onClose, onSubmit, onEventUpdated, event }: EditEventModalProps) {
  const defaultValues = {
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    maxSeats: event.maxSeats?.toString() || "",
    price: event.price?.toString() || "",
    cityName: event.city?.name || ""
  }

  const handleSubmit = async (data: any) => {
    if (onSubmit) {
      onSubmit({
        id: event.id,
        ...data
      })
    }
    await onEventUpdated()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose || (() => {})}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rediger Event</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <EventForm 
            onSubmit={handleSubmit}
            onCancel={onClose || (() => {})}
            defaultValues={defaultValues}
            submitButtonText="Gem ændringer"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
