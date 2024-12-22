import { NextResponse } from 'next/server'

export async function POST() {
  try {
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
            name: 'Medlemskab af Billund Handelsforening',
            quantity: 1,
            unit: 'stk',
            unitPrice: 240000, // 2400 kr i øre
            taxRate: 0,
            taxAmount: 0,
            grossTotalAmount: 240000,
            netTotalAmount: 240000
          }],
          amount: 240000,
          currency: 'DKK',
          reference: `order-${Date.now()}`
        },
        checkout: {
          integrationType: 'HostedPaymentPage',
          returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/members`,
          termsUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/terms`,
          merchantHandlesConsumerData: false,
          consumer: {
            reference: `consumer-${Date.now()}`,
            email: '',
            shippingAddress: {
              country: 'DNK'
            }
          },
          merchantHandlesShippingCost: false,
          charge: true
        }
      })
    })

    const data = await response.json()

    return NextResponse.json({
      paymentId: data.paymentId,
      hostedPaymentPageUrl: data.hostedPaymentPageUrl
    })
  } catch (error) {
    console.error('Nets error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    )
  }
} 