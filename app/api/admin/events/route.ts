import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: true
      },
      orderBy: {
        date: 'asc'
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

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    let imageUrl = null

    // Håndter billede upload
    const imageFile = formData.get("image") as File | null
    if (imageFile) {
      const { url } = await put(imageFile.name, imageFile, {
        access: 'public',
      })
      imageUrl = url
    }

    // Find city først
    const cityName = formData.get("cityName") as string
    const city = await prisma.city.findFirst({
      where: { name: cityName }
    })

    if (!city) {
      return NextResponse.json(
        { error: `By '${cityName}' findes ikke` },
        { status: 400 }
      )
    }

    // Opret event i databasen
    const event = await prisma.event.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: new Date(formData.get("date") as string),
        time: formData.get("time") as string,
        location: formData.get("location") as string,
        maxSeats: formData.get("maxSeats") ? parseInt(formData.get("maxSeats") as string) : null,
        price: formData.get("price") ? parseFloat(formData.get("price") as string) : null,
        imageUrl,
        cityId: city.id  // Brug city ID direkte
      }
    })

    revalidatePath('/admin/events')
    revalidatePath('/events')
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Failed to create event:', error)
    return NextResponse.json(
      { error: "Kunne ikke oprette event" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData()
    const id = formData.get("id") as string
    let imageUrl = null

    // Håndter billede upload hvis der er et nyt billede
    const imageFile = formData.get("image") as File | null
    if (imageFile) {
      const { url } = await put(imageFile.name, imageFile, {
        access: 'public',
      })
      imageUrl = url
    }

    // Find city først
    const cityName = formData.get("cityName") as string
    const city = await prisma.city.findFirst({
      where: { name: cityName }
    })

    if (!city) {
      return NextResponse.json(
        { error: `By '${cityName}' findes ikke` },
        { status: 400 }
      )
    }

    // Opdater event i databasen
    const event = await prisma.event.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: new Date(formData.get("date") as string),
        time: formData.get("time") as string,
        location: formData.get("location") as string,
        maxSeats: formData.get("maxSeats") ? parseInt(formData.get("maxSeats") as string) : null,
        price: formData.get("price") ? parseFloat(formData.get("price") as string) : null,
        ...(imageUrl && { imageUrl }),
        cityId: city.id  // Brug city ID direkte
      }
    })

    revalidatePath('/admin/events')
    revalidatePath('/events')
    
    return NextResponse.json(event)
  } catch (error) {
    console.error('Failed to update event:', error)
    return NextResponse.json(
      { error: "Kunne ikke opdatere event" },
      { status: 500 }
    )
  }
} 