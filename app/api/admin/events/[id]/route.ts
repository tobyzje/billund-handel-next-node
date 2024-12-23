import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke slette event' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json()
    const event = await prisma.event.update({
      where: {
        id: params.id
      },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time: data.time,
        location: data.location,
        maxSeats: data.maxSeats || null,
        price: data.price || null
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke opdatere event' },
      { status: 500 }
    )
  }
} 