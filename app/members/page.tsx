import PricingCard from "../components/PricingCard"
import { MapPin, Phone, Mail } from "lucide-react"
import Sport24Logo from "@/public/sport24-logo.png"
import BillundCafeLogo from "@/public/billund-bageri-logo.png"
import Image from 'next/image'


export default function MembersPage() {

  // Dummy data for medlemmer - skal erstattes med rigtig data senere
  const members = [
    {
      id: 1,
      name: "Sport24 - Billund",
      description: "Sport24 er en butik der sælger sportsudstyr til både amatører og professionelle. Vi har alt fra fodbold til håndbold, og vi har altid høj kvalitet til en god pris.",
      address: "Gammelbro 38, 7190 Billund",
      phone: "23 81 44 47", 
      email: "vsp@sport24.dk",
      logo: Sport24Logo.src
    },
    {
        id: 2,
        name: "Billund Café & Bageri",
        description: "Billund Café & Bageri er en lokal butik der sælger kaffe, snacks og brød til både lokale og gæster. Vi har altid høj kvalitet til en god pris.",
        address: "Hovedgaden 20, 7190 Billund",
        phone: "75 33 10 28", 
        email: "mail@billundbageri.dk",
        logo: BillundCafeLogo.src
      },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Medlemmer af Billund Handelsforening</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Se vores fantastiske medlemmer og bliv en del af vores fællesskab</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {members.map(member => (
            <div key={member.id} className="bg-white hover:scale-105 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                {member.logo && (
                  <div className="flex justify-center mb-6">
                    <Image 
                      src={member.logo}
                      alt={`${member.name} logo`}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{member.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{member.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>{member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vil du være medlem af Billund Handelsforening?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Bliv en del af vores netværk og få adgang til eksklusive fordele</p>
          </div>
          <PricingCard />
        </div>
      </div>
    </main>
  )
}
