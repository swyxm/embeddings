"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type MinimizedCard = {
  id: string
  title: string
  component: React.ReactNode
  position: { x: number; y: number }
}

type MinimizeContextType = {
  minimizedCards: MinimizedCard[]
  minimizeCard: (card: MinimizedCard) => void
  restoreCard: (id: string) => void
  isMinimized: (id: string) => boolean
}

const MinimizeContext = createContext<MinimizeContextType | undefined>(undefined)

export function MinimizeProvider({ children }: { children: React.ReactNode }) {
  const [minimizedCards, setMinimizedCards] = useState<MinimizedCard[]>([])

  const minimizeCard = (card: MinimizedCard) => {
    setMinimizedCards((prev) => [...prev.filter((c) => c.id !== card.id), card])
  }

  const restoreCard = (id: string) => {
    setMinimizedCards((prev) => prev.filter((c) => c.id !== id))
  }

  const isMinimized = (id: string) => {
    return minimizedCards.some((card) => card.id === id)
  }

  return (
    <MinimizeContext.Provider value={{ minimizedCards, minimizeCard, restoreCard, isMinimized }}>
      {children}
    </MinimizeContext.Provider>
  )
}

export function useMinimize() {
  const context = useContext(MinimizeContext)
  if (!context) {
    throw new Error("useMinimize must be used within MinimizeProvider")
  }
  return context
}
