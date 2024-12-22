import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.json()
    
    // Her kan du implementere:
    // 1. Gem data i database
    // 2. Send email til admin
    // 3. Send bekræftelsesmail til ansøger
    
    console.log('Ny medlemsanmodning:', formData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke behandle anmodningen' },
      { status: 500 }
    )
  }
} 