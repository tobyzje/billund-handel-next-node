import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('Received data:', data) // Debug log

    // Valider input
    if (!data.name || !data.email || !data.password) {
      console.log('Missing required fields:', { 
        hasName: !!data.name, 
        hasEmail: !!data.email, 
        hasPassword: !!data.password 
      })
      return NextResponse.json(
        { error: 'Alle påkrævede felter skal udfyldes' },
        { status: 400 }
      )
    }

    // Check om email allerede er i brug
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email er allerede i brug' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Opret bruger
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      message: 'Bruger oprettet succesfuldt',
      user
    })
  } catch (error) {
    console.error('Detailed signup error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Kunne ikke oprette bruger' },
      { status: 500 }
    )
  }
} 