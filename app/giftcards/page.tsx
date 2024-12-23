import GiftCardForm from "../components/GiftCardForm"
import { Card } from "@/components/ui/card"

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gavekort</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Giv et gavekort til Billund Handelsforening - kan bruges i alle medlemsbutikker
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <GiftCardForm />
        </div>
      </div>
    </main>
  )
}