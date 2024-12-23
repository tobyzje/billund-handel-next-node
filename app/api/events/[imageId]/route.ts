import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { imageId: string } }
) {
  try {
    const event = await prisma.event.findFirst({
      where: {
        imageUrl: {
          contains: params.imageId
        }
      },
      select: {
        imageData: true
      }
    })

    if (!event?.imageData) {
      return new NextResponse(null, { status: 404 })
    }

    // Returner billedet med korrekt Content-Type
    return new NextResponse(event.imageData, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    })
  } catch (error) {
    console.error("Error fetching image:", error)
    return new NextResponse(null, { status: 500 })
  }
} 