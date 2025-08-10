"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createPageUrl } from "@/utils"
import { Youtube, Upload, Headphones } from "lucide-react"
import LayoutWrapper from "@/components/layout-wrapper"
import FileUploadZone from "@/components/file-upload-zone"
import YoutubeInput from "@/components/youtube-input"

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")

  useEffect(() => {
    return () => {
      // Cleanup blob URLs when component unmounts
      const fileData = sessionStorage.getItem("uploadedFile")
      if (fileData) {
        const file = JSON.parse(fileData)
        if (file.blobUrl) {
          URL.revokeObjectURL(file.blobUrl)
        }
      }
    }
  }, [])

  const handleFileUpload = (file: File) => {
    // Create blob URL and store both file data and the actual file
    const blobUrl = URL.createObjectURL(file)
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      blobUrl: blobUrl,
    }

    // Store file data in sessionStorage
    sessionStorage.setItem("uploadedFile", JSON.stringify(fileData))

    // Store the actual file object (for this session)
    if (typeof window !== "undefined") {
      ;(window as any).uploadedFileBlob = file
    }

    router.push(createPageUrl("Player") + "?mode=upload")
  }

  const handleYoutubeSubmit = (youtubeUrl: string) => {
    sessionStorage.setItem("youtubeUrl", youtubeUrl)
    router.push(createPageUrl("Player") + "?mode=youtube")
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden">
        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200 rounded-full blur-3xl breathing-animation"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-200 rounded-full blur-3xl breathing-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-200 rounded-full blur-3xl breathing-animation"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="w-full max-w-2xl mx-auto relative z-10 mt-16 sm:mt-0">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 glass-morphism-light rounded-2xl">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Emotune
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-2 font-light">Discover the feelings hidden in your favorite music</p>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center justify-center mb-8">
            <div className="glass-morphism-light rounded-full p-1 flex gap-1">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
                  activeTab === "upload" ? "bg-white/80 text-gray-800 shadow-md" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Upload className="w-5 h-5 text-primary" />
                Upload Audio
              </button>
              <button
                onClick={() => setActiveTab("youtube")}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
                  activeTab === "youtube" ? "bg-white/80 text-gray-800 shadow-md" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Youtube className="w-5 h-5 text-red-500" />
                YouTube Link
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="glass-morphism-light rounded-3xl p-6 sm:p-8">
            {activeTab === "upload" ? (
              <FileUploadZone onFileUpload={handleFileUpload} />
            ) : (
              <YoutubeInput onYoutubeSubmit={handleYoutubeSubmit} />
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">Experience your music in a whole new dimension</p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
