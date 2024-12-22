import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { amount, description, customer } = await req.json()

    // Her kan du tilføje validering af data
    // Gem kunde information i database
    // Opret faktura hvis nødvendigt

    // Opret betalingslink (eksempel med Nets Easy)
    const response = await fetch('https://test.api.dibspayment.eu/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETS_SECRET_KEY}`,
      },
      body: JSON.stringify({
        order: {
          items: [{
            reference: 'membership-yearly',
            name: description,
            quantity: 1,
            unit: 'stk',
            unitPrice: amount * 100, // Konverter til øre
            taxRate: 0,
            taxAmount: 0,
            grossTotalAmount: amount * 100,
            netTotalAmount: amount * 100
          }],
          amount: amount * 100,
          currency: 'DKK',
          reference: `order-${Date.now()}`
        },
        checkout: {
          integrationType: 'HostedPaymentPage',
          returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/members`,
          termsUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/terms`,
          merchantHandlesConsumerData: true,
          consumer: {
            reference: `consumer-${Date.now()}`,
            email: customer.email,
            shippingAddress: {
              addressLine1: customer.address,
              postalCode: customer.zipCode,
              city: customer.city,
              country: 'DNK'
            }
          },
          charge: true
        }
      })
    })

    const data = await response.json()

    return NextResponse.json({
      paymentUrl: data.hostedPaymentPageUrl
    })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Could not create payment' },
      { status: 500 }
    )
  }
} 