import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const today = new Date()
    const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

    // Hent brugere oprettet denne måned
    const thisMonthUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: firstDayThisMonth
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Hent brugere oprettet sidste måned
    const lastMonthUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: firstDayLastMonth,
          lt: firstDayThisMonth
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Generer labels (dage i måneden)
    const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString())

    // Tæl brugere per dag
    const thisMonth = new Array(31).fill(0)
    const lastMonth = new Array(31).fill(0)

    thisMonthUsers.forEach((user: { createdAt: Date }) => {
      const day = user.createdAt.getDate() - 1
      thisMonth[day]++
    })

    lastMonthUsers.forEach((user: { createdAt: Date }) => {
      const day = user.createdAt.getDate() - 1
      lastMonth[day]++
    })

    return NextResponse.json({
      labels,
      thisMonth,
      lastMonth
    })
  } catch (error) {
    console.error("Fejl ved hentning af brugerstatistik:", error)
    return NextResponse.json(
      { error: "Kunne ikke hente brugerstatistik" },
      { status: 500 }
    )
  }
} 