import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.json()
    
    // Her kan du implementere:
    // 1. Gem bestilling i database
    // 2. Send email til admin
    // 3. Send bekræftelsesmail til køber
    // 4. Send gavekort til modtager (hvis ønsket)
    
    console.log('Ny gavekort bestilling:', formData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke behandle bestillingen' },
      { status: 500 }
    )
  }
} 