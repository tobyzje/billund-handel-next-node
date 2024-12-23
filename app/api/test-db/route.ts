import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test database forbindelse
    await prisma.$connect()
    
    // Test at vi kan lave en simpel query
    const count = await prisma.giftCard.count()
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Database forbindelse OK',
      giftCardCount: count
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Database fejl'
    }, { 
      status: 500 
    })
  } finally {
    await prisma.$disconnect()
  }
} 