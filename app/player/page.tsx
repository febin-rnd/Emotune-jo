import { Suspense } from "react"
import PlayerClient from "./PlayerClient"

function PlayerContent() {
  return <PlayerClient />
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading player...</p>
          </div>
        </div>
      }
    >
      <PlayerContent />
    </Suspense>
  )
}
