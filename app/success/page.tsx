import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center space-y-6 p-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900">Tak for din tilmelding!</h1>
        <p className="text-gray-600 max-w-md">
          Vi har modtaget din betaling og du er nu medlem af Billund Handelsforening. 
          Du vil modtage en bekræftelsesmail inden for kort tid.
        </p>
        <Link href="/">
          <Button>
            Tilbage til forsiden
          </Button>
        </Link>
      </div>
    </div>
  )
} 