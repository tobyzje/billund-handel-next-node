import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.giftCard.delete({
      where: {
        id: params.id
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke slette gavekort' },
      { status: 500 }
    )
  }
} 