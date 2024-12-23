import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { PaymentForm } from "../../components/PaymentForm"

interface PageProps {
  params: Promise<{ registrationId: string }>
}

export default async function PaymentPage({ params }: PageProps) {
  const { registrationId } = await params
  
  const registration = await prisma.registration.findUnique({
    where: { id: registrationId },
    include: {
      event: true,
    }
  })

  if (!registration || !registration.event.price) {
    notFound()
  }

  return (
    <div className="container max-w-lg mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">Betal for event</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="font-semibold mb-4">{registration.event.title}</h2>
        <p className="text-gray-600 mb-2">Deltager: {registration.name}</p>
        <p className="text-gray-600 mb-4">Email: {registration.email}</p>
        <p className="text-xl font-semibold">Pris: {registration.event.price} kr</p>
      </div>

      <PaymentForm 
        registrationId={registration.id}
        amount={registration.event.price}
      />
    </div>
  )
} 