"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Play, Pause, Rewind, FastForward, Volume2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import LayoutWrapper from "@/components/layout-wrapper"
import EmotionCard from "@/components/emotion-card"
import BackgroundMorph from "@/components/background-morph"
import { Song } from "@/entities/song"
import YoutubeEmotionSync from "@/components/youtube-emotion-sync"
import { analyzeYoutubeTrack, analyzeUploadedFile } from "@/utils/emotion-analyzer"

// Helper function to extract YouTube video ID
function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}

export default function PlayerClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams?.get("mode") || "upload"

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentEmotion, setCurrentEmotion] = useState<any>(null)
  const [volume, setVolume] = useState([80])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [songData, setSongData] = useState<any>(null)
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null)
  const [youtubeIsPlaying, setYoutubeIsPlaying] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load song data
  useEffect(() => {
    if (!isClient) return

    async function loadSong() {
      if (mode === "upload") {
        const fileData = sessionStorage.getItem("uploadedFile")
        if (fileData) {
          const file = JSON.parse(fileData)

          // Get the actual file blob if available
          let audioUrl = null
          if (typeof window !== "undefined" && (window as any).uploadedFileBlob) {
            audioUrl = URL.createObjectURL((window as any).uploadedFileBlob)
          } else if (file.blobUrl) {
            audioUrl = file.blobUrl
          }

          // Analyze emotions based on filename
          const emotions = analyzeUploadedFile(file.name)

          setAudioUrl(audioUrl)
          setSongData({
            title: file.name,
            artist: "Uploaded",
            emotion_data: emotions,
          })

          // Set initial emotion
          if (emotions.length > 0) {
            setCurrentEmotion(emotions[0])
          }

          await Song.create({
            title: file.name,
            artist: "Uploaded",
            audio_url: audioUrl || "placeholder",
            emotion_data: emotions,
          })
        }
      } else if (mode === "youtube") {
        const url = sessionStorage.getItem("youtubeUrl")
        if (url) {
          setYoutubeUrl(url)

          // Analyze emotions based on YouTube URL
          const emotions = analyzeYoutubeTrack(url)

          setSongData({
            title: "YouTube Video",
            artist: "YouTube",
            youtube_url: url,
            emotion_data: emotions,
          })

          // Set initial emotion
          if (emotions.length > 0) {
            setCurrentEmotion(emotions[0])
          }

          await Song.create({
            title: "YouTube Video",
            artist: "YouTube",
            youtube_url: url,
            emotion_data: emotions,
          })
        }
      }
    }
    loadSong()
  }, [mode, isClient])

  // Update current emotion based on time for uploaded files
  useEffect(() => {
    if (mode !== "upload" || !songData || !audioRef.current) return

    const emotionData = songData.emotion_data || []
    const currentEmotionData = emotionData.find((emotion: any, index: number) => {
      const nextEmotion = emotionData[index + 1]
      return currentTime >= emotion.time && (!nextEmotion || currentTime < nextEmotion.time)
    })

    if (currentEmotionData && currentEmotionData.lyric !== currentEmotion?.lyric) {
      setCurrentEmotion(currentEmotionData)
    }
  }, [currentTime, mode, songData, currentEmotion])

  // Handle YouTube emotion changes
  const handleYoutubeEmotionChange = useCallback(
    (emotion: any) => {
      if (mode === "youtube" && emotion.lyric !== currentEmotion?.lyric) {
        setCurrentEmotion(emotion)
      }
    },
    [mode, currentEmotion],
  )

  // Audio event handlers
  const handleTimeUpdate = () => audioRef.current && setCurrentTime(audioRef.current.currentTime)
  const handleLoadedMetadata = () => audioRef.current && setDuration(audioRef.current.duration)
  const togglePlayPause = () => {
    if (!audioRef.current) return
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }
  const handleSeek = (value: number[]) => {
    const time = value[0]
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }
  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (audioRef.current) audioRef.current.volume = value[0] / 100
  }
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Show loading state while client-side hydration happens
  if (!isClient || !songData) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your music...</p>
          </div>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen relative overflow-hidden">
        <BackgroundMorph emotion={currentEmotion?.emotion?.toLowerCase()} />

        <div className="relative z-10 p-4 pt-24 sm:p-6 sm:pt-24 flex flex-col items-center justify-center min-h-screen">
          {mode === "upload" && audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          )}

          {mode === "youtube" && songData && youtubeUrl && (
            <YoutubeEmotionSync
              emotionData={songData.emotion_data || []}
              onEmotionChange={handleYoutubeEmotionChange}
              isPlaying={youtubeIsPlaying}
              youtubeUrl={youtubeUrl}
            />
          )}

          {mode === "youtube" && youtubeUrl && (
            <div className="mb-8 text-center">
              <div className="mb-4">
                <Button
                  onClick={() => setYoutubeIsPlaying(!youtubeIsPlaying)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                >
                  {youtubeIsPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {youtubeIsPlaying ? "Pause Emotion Sync" : "Start Emotion Sync"}
                </Button>
              </div>
              <iframe
                title="YouTube Player"
                src={`https://www.youtube.com/embed/${extractYouTubeId(youtubeUrl)}`}
                width="340"
                height="190"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl shadow-2xl glass-morphism-light"
              ></iframe>
            </div>
          )}

          {mode === "upload" ? (
            <div className="w-full max-w-md mb-8">
              <div className="glass-morphism-light rounded-3xl p-6 shadow-2xl">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">{songData.title}</h2>
                  <p className="text-gray-500">Real-time analysis active</p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-black"
                    onClick={() => handleSeek([Math.max(0, currentTime - 10)])}
                  >
                    <Rewind className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="w-14 h-14 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-black"
                    onClick={() => handleSeek([Math.min(duration, currentTime + 10)])}
                  >
                    <FastForward className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={handleSeek} />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-500" />
                  <Slider value={volume} max={100} step={1} onValueChange={handleVolumeChange} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mb-8 glass-morphism-light rounded-3xl p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Live Emotion Sync</h2>
              <p className="text-gray-500 mb-4 flex items-center justify-center gap-2">
                Emotions synced to playback timeline
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Emotions change automatically as the video progresses. Use the button above to control sync.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {(songData.emotion_data || []).map((e: any, index: number) => (
                  <span
                    key={`${e.emotion}-${index}`}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentEmotion?.lyric === e.lyric
                        ? "bg-primary/80 text-white shadow-lg scale-110 ring-2 ring-primary/50"
                        : "bg-white/70 text-gray-700"
                    }`}
                  >
                    {e.emoji} {e.emotion}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentEmotion && <EmotionCard emotion={currentEmotion} isStatic={false} />}
        </div>
      </div>
    </LayoutWrapper>
  )
}
