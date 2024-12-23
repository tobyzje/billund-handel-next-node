import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('Received payment data:', { 
      registrationId: data.registrationId,
      amount: data.amount 
    })

    const { registrationId, amount } = data

    // Find registreringen
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { 
        event: true,
      }
    })

    if (!registration) {
      return new NextResponse(
        JSON.stringify({ error: "Tilmelding ikke fundet" }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Verificer beløb
    const eventPrice = registration.event.price || 0
    if (eventPrice !== amount) {
      return new NextResponse(
        JSON.stringify({ error: "Ugyldigt beløb" }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Opdater registrering
    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: { 
        status: "confirmed",
        paymentDate: new Date(),
        paymentReference: `PAY-${Date.now()}`
      }
    })

    return new NextResponse(
      JSON.stringify({
        success: true,
        registration: {
          id: updatedRegistration.id,
          status: updatedRegistration.status
        }
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error("Payment error:", error)
    return new NextResponse(
      JSON.stringify({ error: "Betalingsfejl" }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 