import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Find første bruger
    const firstUser = await prisma.user.findFirst({
      orderBy: {
        createdAt: 'asc'
      }
    })

    if (!firstUser) {
      return NextResponse.json({ error: "Ingen brugere fundet" }, { status: 404 })
    }

    // Opdater bruger til admin
    const admin = await prisma.user.update({
      where: { id: firstUser.id },
      data: { role: "ADMIN" }
    })

    return NextResponse.json({ 
      message: "Admin bruger oprettet",
      email: admin.email 
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { error: "Kunne ikke oprette admin bruger" },
      { status: 500 }
    )
  }
} 