"use client";

import Link from "next/link";
import { FacebookIcon, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                <p>+45 12 34 56 78</p>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="w-5 h-5" />
                <p>kontakt@billundhandels-forening.dk</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <p>Byens Plads 1, 7190 Billund</p>
              </div>
            </div>
          </div>

          {/* Hurtige links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hurtige Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="hover:text-blue-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-blue-400 transition-colors">
                  Gavekort
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-blue-400 transition-colors">
                  Medlemmer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Sociale medier */}
          <div>
            <h3 className="text-xl font-bold mb-4">Følg Os</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/billundhandel" target="_blank" className="hover:text-blue-400 transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Billund Handelsforening. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>
  );
}
