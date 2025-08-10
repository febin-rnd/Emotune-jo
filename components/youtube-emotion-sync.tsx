"use client"

import { useEffect, useState, useCallback } from "react"

interface YoutubeEmotionSyncProps {
  emotionData: any[]
  onEmotionChange: (emotion: any) => void
  isPlaying?: boolean
  youtubeUrl: string
}

export default function YoutubeEmotionSync({
  emotionData,
  onEmotionChange,
  isPlaying = true,
  youtubeUrl,
}: YoutubeEmotionSyncProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [trackDuration, setTrackDuration] = useState(180) // Default 3 minutes for videos

  const handleEmotionUpdate = useCallback(
    (time: number) => {
      const currentEmotionData = emotionData.find((emotion, index) => {
        const nextEmotion = emotionData[index + 1]
        return time >= emotion.time && (!nextEmotion || time < nextEmotion.time)
      })

      if (currentEmotionData) {
        onEmotionChange(currentEmotionData)
      }
    },
    [emotionData, onEmotionChange],
  )

  // Reset timer when new video loads
  useEffect(() => {
    setCurrentTime(0)
    // Estimate video duration based on emotion data
    if (emotionData.length > 0) {
      const lastEmotion = emotionData[emotionData.length - 1]
      setTrackDuration(lastEmotion.time + 30) // Add 30 seconds buffer
    }
  }, [youtubeUrl, emotionData])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1

        // Schedule emotion update for next tick to avoid render conflicts
        setTimeout(() => {
          handleEmotionUpdate(newTime)
        }, 0)

        // Reset when video ends
        if (newTime >= trackDuration) {
          return 0
        }

        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, handleEmotionUpdate, trackDuration])

  // Initialize with first emotion
  useEffect(() => {
    if (emotionData.length > 0) {
      setTimeout(() => {
        onEmotionChange(emotionData[0])
      }, 100)
    }
  }, [emotionData, onEmotionChange])

  return (
    <div className="text-center text-sm text-gray-500 mb-2">
      <div className="flex items-center justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-400"}`}></div>
        <span>Emotion sync: {isPlaying ? "Active" : "Paused"}</span>
        <span className="text-xs">
          ({Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")})
        </span>
      </div>
    </div>
  )
}
