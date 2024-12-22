import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Her skal du implementere database kald
    // Dette er dummy data
    const giftCards = [
      {
        id: "GC-001",
        date: "2024-03-20",
        amount: 500,
        status: "pending",
        buyerName: "John Doe",
        buyerEmail: "john@example.com",
        recipientName: "Jane Doe",
        recipientEmail: "jane@example.com"
      },
      // Tilføj flere...
    ]

    return NextResponse.json(giftCards)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke hente gavekort' },
      { status: 500 }
    )
  }
} 