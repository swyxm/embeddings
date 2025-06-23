"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type AccentColor = "red" | "orange" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink" | "cyan" | "mint"

type ColorContextType = {
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

const colorMap = {
  red: "rgb(239 68 68)",
  orange: "rgb(249 115 22)",
  yellow: "rgb(234 179 8)",
  green: "rgb(34 197 94)",
  blue: "rgb(59 130 246)",
  indigo: "rgb(99 102 241)",
  purple: "rgb(147 51 234)",
  pink: "rgb(236 72 153)",
  cyan: "rgb(6 182 212)",
  mint: "rgb(52 211 153)",
}

const glowMap = {
  red: "239 68 68",
  orange: "249 115 22",
  yellow: "234 179 8",
  green: "34 197 94",
  blue: "59 130 246",
  indigo: "99 102 241",
  purple: "147 51 234",
  pink: "236 72 153",
  cyan: "6 182 212",
  mint: "52 211 153",
}

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState<AccentColor>("indigo")

  useEffect(() => {
    const savedColor = localStorage.getItem("accentColor") as AccentColor
    if (savedColor) {
      setAccentColor(savedColor)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", colorMap[accentColor])
    document.documentElement.style.setProperty("--accent-glow", glowMap[accentColor])
    localStorage.setItem("accentColor", accentColor)
  }, [accentColor])

  return <ColorContext.Provider value={{ accentColor, setAccentColor }}>{children}</ColorContext.Provider>
}

export function useColor() {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error("useColor must be used within ColorProvider")
  }
  return context
}
