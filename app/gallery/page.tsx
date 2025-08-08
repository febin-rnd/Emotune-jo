"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Song } from "@/entities/song";
import { Music, Upload, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/layout-wrapper";

export default function Gallery() {
  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      setIsLoading(true);
      const fetchedSongs = await Song.list("-created_date");
      setSongs(fetchedSongs);
      setIsLoading(false);
    }
    fetchSongs();
  }, []);

  const getDominantEmotion = (emotionData: any[]) => {
    if (!emotionData || emotionData.length === 0) return { emotion: "Mixed", emoji: "🎶" };
    const emotionCounts = emotionData.reduce((acc: any, curr: any) => {
      acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
      return acc;
    }, {});
    const dominant = Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b);
    const emoji = emotionData.find((e: any) => e.emotion === dominant)?.emoji || "🎶";
    return { emotion: dominant, emoji };
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen p-4 pt-24 sm:p-6 sm:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">
              Your Emotion Gallery
            </h1>
            <p className="text-lg text-gray-600">A collection of your musical journeys.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-morphism-light rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-24 mt-4"></div>
                </div>
              ))}
            </div>
          ) : songs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => {
                const { emotion, emoji } = getDominantEmotion(song.emotion_data);
                return (
                  <div
                    key={song.id}
                    className="block glass-morphism-light rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-3">
                           {song.spotify_url ? <Music className="w-6 h-6 text-green-500" /> : <Upload className="w-6 h-6 text-primary" />}
                          <h3 className="text-lg font-semibold text-gray-800 truncate" title={song.title}>
                            {song.title}
                          </h3>
                       </div>
                       <div className="text-3xl">{emoji}</div>
                    </div>
                    <p className="text-gray-500 mb-4">Artist: {song.artist}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 text-sm font-medium text-gray-700">
                      {emotion}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center glass-morphism-light rounded-2xl p-12">
               <Headphones className="w-16 h-16 mx-auto text-primary mb-4"/>
               <h2 className="text-2xl font-semibold text-gray-700">Your gallery is empty</h2>
               <p className="text-gray-500 mt-2">Analyze a song to start your collection!</p>
               <Link href={createPageUrl("Home")}>
                  <Button className="mt-6 bg-gradient-to-r from-primary to-highlight text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                      Analyze First Song
                  </Button>
               </Link>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
