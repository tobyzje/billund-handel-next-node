import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json({ cities })
  } catch (error) {
    console.error('Fejl ved hentning af byer:', error)
    return NextResponse.json(
      { error: 'Kunne ikke hente byer' },
      { status: 500 }
    )
  }
} 