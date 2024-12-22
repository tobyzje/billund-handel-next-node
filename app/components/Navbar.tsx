"use client";

import Link from "next/link";
import Logo from "@/public/logo.png";
import GrindstedLogo from "@/public/grindsted-logo.png";
import { CalendarIcon, HomeIcon, LogInIcon, MailIcon, UsersIcon, MenuIcon, GiftIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import LoginForm from "./LoginForm";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (loginFormRef.current && !loginFormRef.current.contains(event.target as Node)) {
        setShowLoginForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="hover:cursor-pointer hover:scale-110 transition-transform duration-300">
              <img src={Logo.src} alt="Billund Handelsforening" className="w-auto h-16 md:h-28" />
            </div>
          </Link>
          <Link href="https://www.grindstedhandel.dk/">    
            <div className="hover:cursor-pointer hover:scale-110 transition-transform duration-300">
              <img src={GrindstedLogo.src} alt="Grindsted Handelsforening" className="w-auto h-12 md:h-16" />
            </div>
          </Link>
        </div>
        


        {/* Hamburger menu til mobil */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-500 transition-all duration-200">
            <HomeIcon className="w-5 h-5" />
            <p>Hjem</p>
          </Link>
          <span className="h-5 w-0.5 bg-blue-700"></span>
          <Link href="/events" className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-500 transition-all duration-200">
            <CalendarIcon className="w-5 h-5" />
            <p>Kalender</p>
          </Link>
          <span className="h-5 w-0.5 bg-blue-700"></span>
          <Link href="/giftcards" className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-500 transition-all duration-200">
            <GiftIcon className="w-5 h-5" />
            <p>Gavekort</p>
          </Link>
          <span className="h-5 w-0.5 bg-blue-700"></span>
          <Link href="/members" className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-500 transition-all duration-200">
            <UsersIcon className="w-5 h-5" />
            <p>Medlemmer</p>
          </Link>
          <span className="h-5 w-0.5 bg-blue-700"></span>
          <Link href="/contact" className="flex items-center gap-2 hover:cursor-pointer hover:text-blue-500 transition-all duration-200">
            <MailIcon className="w-5 h-5" />
            <p>Kontakt</p>
          </Link>
          <span className="h-5 w-0.5 bg-blue-700"></span>
          <div className="relative" ref={loginFormRef}>
            <Button
              variant="outline"
              className="flex items-center bg-blue-400 text-white rounded-md p-2 gap-2 hover:cursor-pointer hover:bg-blue-500 transition-all duration-200"
              onClick={() => setShowLoginForm(!showLoginForm)}
            >
              <LogInIcon className="w-5 h-5" />
              <p>Log ind</p>
            </Button>
            
            {showLoginForm && (
              <div className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2">
                <LoginForm />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobil menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-200">
              <HomeIcon className="w-5 h-5" />
              <p>Hjem</p>
            </Link>
            <Link href="/events" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-200">
              <CalendarIcon className="w-5 h-5" />
              <p>Kalender</p>
            </Link>
            <Link href="/giftcards" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-200">
              <GiftIcon className="w-5 h-5" />
              <p>Gavekort</p>
            </Link>
            <Link href="/members" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-200">
              <UsersIcon className="w-5 h-5" />
              <p>Medlemmer</p>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-200">
              <MailIcon className="w-5 h-5" />
              <p>Kontakt</p>
            </Link>
            <Link href="/login" className="flex items-center bg-blue-600 text-white rounded-md p-2 gap-2 hover:bg-blue-700 transition-all duration-200">
              <LogInIcon className="w-5 h-5" />
              <p>Log ind</p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
