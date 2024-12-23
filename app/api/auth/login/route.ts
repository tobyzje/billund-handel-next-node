import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Valider input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email og adgangskode er påkrævet' },
        { status: 400 }
      )
    }

    // Find bruger
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Forkert email eller adgangskode' },
        { status: 401 }
      )
    }

    // Verificer password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Forkert email eller adgangskode' },
        { status: 401 }
      )
    }

    // Generer JWT token
    const token = sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    // Returner bruger data (uden password)
    const { password: _, ...userWithoutPassword } = user
    const response = NextResponse.json({
      message: 'Login succesfuldt',
      user: userWithoutPassword
    })

    // Sæt cookie på response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 dage
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Der skete en fejl under login' },
      { status: 500 }
    )
  }
}
