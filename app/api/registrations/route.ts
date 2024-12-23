import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { eventId, name, email, phone, company } = data

    // Tjek om event eksisterer og har ledige pladser
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          where: { status: "confirmed" }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event ikke fundet" },
        { status: 404 }
      )
    }

    // Tjek for ledige pladser hvis der er et max antal
    if (event.maxSeats && event.registrations.length >= event.maxSeats) {
      return NextResponse.json(
        { error: "Eventet er fuldt booket" },
        { status: 400 }
      )
    }

    // Find eller opret bruger baseret på email
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: "USER",
          password: "temp-password" // TODO: Implementer ordentlig bruger registrering
        }
      })
    }

    // Opret registrering
    const registration = await prisma.registration.create({
      data: {
        event: { connect: { id: eventId } },
        user: { connect: { id: user.id } },
        name,
        email,
        phone,
        company,
        status: event.price ? "pending" : "confirmed"
      }
    })

    return NextResponse.json(registration)
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Kunne ikke gennemføre tilmeldingen" },
      { status: 500 }
    )
  }
} 