import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verify } from "jsonwebtoken"

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Verificer admin token
    const token = req.headers.get("cookie")?.split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 })
    }

    const decoded = verify(token, process.env.JWT_SECRET || '') as {
      id: string
      role: string
    }

    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Kun administratorer har adgang" }, { status: 403 })
    }

    const { role } = await req.json()

    // Opdater brugerens rolle
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Role update error:", error)
    return NextResponse.json(
      { error: "Kunne ikke opdatere brugerrolle" },
      { status: 500 }
    )
  }
} 