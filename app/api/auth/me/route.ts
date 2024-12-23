import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verify } from "jsonwebtoken"

export async function GET(req: Request) {
  try {
    // Hent token fra cookies
    const token = req.headers.get("cookie")?.split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 })
    }

    // Verificer token
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      id: string
      email: string
      role: string
    }

    // Hent bruger fra database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: "Bruger ikke fundet" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 })
  }
} 