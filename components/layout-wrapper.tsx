"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Home, GalleryVerticalEnd } from 'lucide-react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === createPageUrl("Home");

  return (
    <div className="min-h-screen bg-lavender-mist text-dark-gray">
      <div className="relative z-10">
        <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50">
          <Link 
            href={createPageUrl("Home")} 
            className="flex items-center gap-2 font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-80 transition-opacity"
          >
            <Home className="w-6 h-6 text-indigo-400" />
            Emotune
          </Link>
          
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Link 
                href={createPageUrl("Home")} 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300 glass-morphism-light px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">Back</span>
              </Link>
            )}
             <Link 
                href={createPageUrl("Gallery")} 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-all duration-300 glass-morphism-light px-4 py-2 rounded-full"
              >
                <GalleryVerticalEnd className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">My Gallery</span>
              </Link>
          </div>
        </header>
        
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
