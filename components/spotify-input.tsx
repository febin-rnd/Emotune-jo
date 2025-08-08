"use client"

import React, { useState } from "react";
import { LinkIcon, Music, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SpotifyInputProps {
  onSpotifySubmit: (url: string) => void;
}

export default function SpotifyInput({ onSpotifySubmit }: SpotifyInputProps) {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setSpotifyUrl(url);
    setIsValidUrl(url.includes("spotify.com/track/") || url.includes("open.spotify.com/track/"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUrl) {
      onSpotifySubmit(spotifyUrl);
    }
  };

  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-white/50 rounded-2xl flex items-center justify-center shadow-inner">
        <Music className="w-10 h-10 text-green-500" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        Play from Spotify
      </h3>
      
      <p className="text-gray-500 mb-6 text-lg">
        Paste a Spotify track link to start listening
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="url"
            placeholder="https://open.spotify.com/track/..."
            value={spotifyUrl}
            onChange={handleInputChange}
            className="pl-12 pr-4 py-3 bg-white/70 border-border text-gray-700 placeholder-gray-400 rounded-xl text-lg focus:ring-2 focus:ring-highlight focus:border-highlight"
          />
        </div>
        
        <Button 
          type="submit"
          disabled={!isValidUrl}
          className="bg-gradient-to-r from-green-400 to-teal-400 hover:opacity-90 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Analyze
        </Button>
      </form>
    </div>
  );
}
