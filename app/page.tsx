import { CalendarIcon, FileTextIcon, ClockIcon, MapPinIcon, Link } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { redirect } from "next/dist/server/api-utils";
import { RedirectType } from "next/navigation";
import { NavigationButton } from "./components/NavigationButton";
import { AddToCalendarButton } from "./components/AddToCalendarButton";

let latestEvents = [
  {
    id: 1,
    title: "Event #1", 
    description: "Event #1",
    date: "01/01/2025",
    time: "Kl.10:00",
    location: "Billund, 7190",
  },
  {
    id: 2,
    title: "Event #2",
    description: "Event #2", 
    date: "02/01/2025",
    time: "Kl. 10:00",
    location: "Grindsted, 7200",
  },
  {
    id: 3,
    title: "Event #3",
    description: "Event #3",
    date: "03/01/2025",
    time: "Kl. 18:00",
    location: "Billund, 7190",
  },
];

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
        {latestEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                {event.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <FileTextIcon className="w-4 h-4" />
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-gray-500">
                <ClockIcon className="w-4 h-4" />
                <p>{event.date} - {event.time}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPinIcon className="w-4 h-4" />
                <p>{event.location}</p>
              </div>
            </CardContent>
            <CardFooter>
              <AddToCalendarButton />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
