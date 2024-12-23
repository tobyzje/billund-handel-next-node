import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date() // Kun fremtidige events
        },
        status: "upcoming"
      },
      orderBy: {
        date: 'asc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        time: true,
        location: true,
        status: true,
        maxSeats: true,
        price: true,
        _count: {
          select: {
            registrations: {
              where: {
                status: 'confirmed'
              }
            }
          }
        }
      }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke hente events' },
      { status: 500 }
    )
  }
} 