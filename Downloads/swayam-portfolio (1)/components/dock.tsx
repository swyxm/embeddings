"use client"

import { useMinimize } from "@/components/minimize-provider"

export function Dock() {
  const { minimizedCards, restoreCard } = useMinimize()

  if (minimizedCards.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="dock rounded-2xl px-4 py-3">
        <div className="flex items-center gap-3">
          {minimizedCards.map((card) => (
            <div
              key={card.id}
              className="dock-item w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 border border-white/20 flex items-center justify-center"
              onClick={() => restoreCard(card.id)}
              title={`Restore ${card.title}`}
            >
              <div className="w-6 h-6 bg-white/30 rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-white/60 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
