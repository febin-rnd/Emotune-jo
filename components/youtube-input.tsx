"use client"

import type React from "react"
import { useState } from "react"
import { LinkIcon, Youtube, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface YoutubeInputProps {
  onYoutubeSubmit: (url: string) => void
}

export default function YoutubeInput({ onYoutubeSubmit }: YoutubeInputProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setYoutubeUrl(url)
    setIsValidUrl(
      url.includes("youtube.com/watch?v=") ||
        url.includes("youtu.be/") ||
        url.includes("youtube.com/embed/") ||
        url.includes("m.youtube.com/watch?v="),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidUrl) {
      onYoutubeSubmit(youtubeUrl)
    }
  }

  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-white/50 rounded-2xl flex items-center justify-center shadow-inner">
        <Youtube className="w-10 h-10 text-red-500" />
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-3">Analyze from YouTube</h3>

      <p className="text-gray-500 mb-6 text-lg">Paste a YouTube video link to analyze its audio</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={handleInputChange}
            className="pl-12 pr-4 py-3 bg-white/70 border-border text-gray-700 placeholder-gray-400 rounded-xl text-lg focus:ring-2 focus:ring-highlight focus:border-highlight"
          />
        </div>

        <Button
          type="submit"
          disabled={!isValidUrl}
          className="bg-gradient-to-r from-red-400 to-red-500 hover:opacity-90 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Analyze
        </Button>
      </form>
    </div>
  )
}
