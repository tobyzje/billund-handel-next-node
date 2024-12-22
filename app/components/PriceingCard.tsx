"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export default function PriceingCard() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Medlemskab Pris</h2>
          <p className="text-xl text-gray-600">Bliv medlem af Billund Handelsforening</p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="flex flex-col hover:shadow-lg transition-shadow border-blue-500 border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Medlemskab</CardTitle>
              <CardDescription className="text-center text-lg">
                <span className="text-3xl font-bold">??? kr</span> / år
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Adgang til netværksarrangementer</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Synlighed på foreningens hjemmeside</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Deltagelse i gavekortordning</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>Prioriteret kundeservice</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Bliv Medlem</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}