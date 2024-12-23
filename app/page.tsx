import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { redirect } from "next/dist/server/api-utils";
import { RedirectType } from "next/navigation";
import { NavigationButton } from "./components/NavigationButton";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero/CTA Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vær Med i Fællesskabet
            </h1>
            <p className="text-xl mb-6">
              Deltag i spændende events og netværk med andre erhvervsdrivende i Billund Kommune
            </p>
          <div className="flex items-center gap-2">
            <NavigationButton 
              href="/members/priser"
              className="font-bold bg-black hover:bg-blue-50 hover:text-black hover:scale-105 transition-transform duration-300"
            >
              Bliv Medlem
            </NavigationButton>
            <NavigationButton 
              href="/events"
              variant="outline"
              className="font-bold text-black hover:scale-105 transition-transform duration-300"
            >
              Se Alle Events
            </NavigationButton>
          </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <h1 className="text-2xl font-bold mt-16 mb-10 text-center">Kommende Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        
      </div>
    </div>
  );
}
