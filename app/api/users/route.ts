import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Hent alle brugere
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Fejl i /api/users:", error)
    return NextResponse.json(
      { error: "Der skete en fejl ved hentning af brugere" },
      { status: 500 }
    )
  }
}

// Tilføj endpoint til at opdatere brugerroller
export async function PATCH(req: Request) {
  try {
    const { userId, role } = await req.json()
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Fejl ved opdatering af bruger:", error)
    return NextResponse.json(
      { error: "Kunne ikke opdatere bruger" },
      { status: 500 }
    )
  }
} 