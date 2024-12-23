import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const giftCards = await prisma.giftCard.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(giftCards)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke hente gavekort' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const giftCard = await prisma.giftCard.create({
      data: {
        amount: parseInt(data.amount),
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        message: data.message
      }
    })
    return NextResponse.json(giftCard)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke oprette gavekort' },
      { status: 500 }
    )
  }
} 