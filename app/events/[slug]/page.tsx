// Server Component
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { EventDetails } from "./EventDetails"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  
  const event = await prisma.event.findUnique({
    where: { id: slug },
    include: {
      city: true,
      registrations: {
        where: { status: "confirmed" }
      }
    }
  })

  if (!event) {
    notFound()
  }

  return <EventDetails event={event} />
} 