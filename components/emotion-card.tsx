"use client"
import { Heart, Clock } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface EmotionData {
  timestamp: string
  time: number
  lyric: string
  emotion: string
  emoji: string
  quote: string
}

interface EmotionCardProps {
  emotion: EmotionData | null
  isStatic?: boolean
}

export default function EmotionCard({ emotion, isStatic }: EmotionCardProps) {
  if (!emotion) return null

  const getEmotionClasses = (emotionName: string) => {
    const classes = {
      joy: "from-rose-200 to-yellow-200 text-yellow-800",
      happy: "from-rose-200 to-yellow-200 text-yellow-800",
      sad: "from-indigo-200 to-blue-200 text-blue-800",
      lonely: "from-gray-300 to-slate-400 text-slate-800",
      angry: "from-red-300 to-orange-300 text-orange-800",
      peaceful: "from-green-200 to-teal-200 text-green-800",
      nostalgic: "from-purple-200 to-pink-200 text-purple-800",
      hopeful: "from-amber-200 to-orange-200 text-orange-800",
      love: "from-pink-200 to-rose-200 text-rose-800",
      determined: "from-orange-200 to-red-200 text-red-800",
      strong: "from-gray-200 to-slate-300 text-slate-800",
      confident: "from-yellow-200 to-amber-200 text-amber-800",
      triumphant: "from-purple-200 to-indigo-200 text-indigo-800",
      powerful: "from-red-200 to-pink-200 text-pink-800",
      content: "from-green-200 to-emerald-200 text-emerald-800",
      dreamy: "from-purple-200 to-violet-200 text-violet-800",
      serene: "from-blue-200 to-cyan-200 text-cyan-800",
      free: "from-sky-200 to-blue-200 text-blue-800",
      thoughtful: "from-indigo-200 to-purple-200 text-purple-800",
      energetic: "from-orange-200 to-yellow-200 text-yellow-800",
      unity: "from-teal-200 to-green-200 text-green-800",
      timeless: "from-gray-200 to-blue-200 text-blue-800",
    }
    return classes[emotionName.toLowerCase() as keyof typeof classes] || "from-purple-200 to-pink-200 text-purple-800"
  }

  const cardKey = isStatic ? "static-card" : emotion.lyric

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={cardKey}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-morphism-light rounded-3xl p-6 sm:p-8 text-center"
        >
          {isStatic ? (
            <div className="text-center">
              <div className="text-6xl mb-4">🎶</div>
              <h3 className="text-xl font-semibold text-gray-700">Now Playing</h3>
              <p className="text-gray-500 mt-2">
                View the song&apos;s overall emotion profile above. <br />
                For line-by-line analysis, please upload an audio file.
              </p>
            </div>
          ) : (
            <>
              <div className="text-7xl sm:text-8xl mb-6 transition-transform duration-500 transform hover:scale-110">
                {emotion.emoji}
              </div>

              <div className="mb-6">
                <p className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed">
                  &quot;{emotion.lyric}&quot;
                </p>
                <div
                  className={`w-20 h-1 bg-gradient-to-r ${getEmotionClasses(
                    emotion.emotion,
                  )} rounded-full mx-auto mt-4 opacity-50`}
                ></div>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${getEmotionClasses(
                  emotion.emotion,
                )} font-semibold text-lg shadow-md mb-6 bg-opacity-50`}
              >
                <Heart className="w-5 h-5" />
                <span>{emotion.emotion}</span>
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-lg text-gray-600 italic font-light leading-relaxed">{emotion.quote}</p>
              </div>

              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-500/10 text-gray-500 text-sm font-medium">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {emotion.timestamp}
                </span>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
