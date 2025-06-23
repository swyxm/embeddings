"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export type CardConfig = {
  id: string
  component: React.ComponentType
  gridClass: string
  minHeight: string
  title?: string
}

type DragDropContextType = {
  cards: CardConfig[]
  draggedCard: string | null
  dragOverCard: string | null
  handleDragStart: (cardId: string) => void
  handleDragEnd: () => void
  handleDragOver: (cardId: string) => void
  handleDragLeave: () => void
  handleDrop: (targetCardId: string) => void
  reorderCards: (sourceId: string, targetId: string) => void
  resetLayout: () => void
  isDefaultLayout: () => boolean
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined)

const defaultCards: CardConfig[] = [
  {
    id: "hero",
    component: () => import("@/components/cards/hero-card").then((m) => m.HeroCard),
    gridClass: "lg:col-span-4 xl:col-span-4",
    minHeight: "min-h-[300px]",
    title: "Welcome",
  },
  {
    id: "about",
    component: () => import("@/components/cards/about-card").then((m) => m.AboutCard),
    gridClass: "lg:col-span-2 xl:col-span-2",
    minHeight: "min-h-[300px]",
    title: "About",
  },
  {
    id: "contact",
    component: () => import("@/components/cards/contact-card").then((m) => m.ContactCard),
    gridClass: "lg:col-span-2 xl:col-span-2 lg:row-span-2",
    minHeight: "min-h-[250px]",
    title: "Contact",
  },
  {
    id: "time",
    component: () => import("@/components/cards/time-card").then((m) => m.TimeCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[120px]",
  },
  {
    id: "journey",
    component: () => import("@/components/cards/journey-card").then((m) => m.JourneyCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[120px]",
  },
  {
    id: "status",
    component: () => import("@/components/cards/status-card").then((m) => m.StatusCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[120px]",
  },
  {
    id: "projects",
    component: () => import("@/components/cards/projects-card").then((m) => m.ProjectsCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[120px]",
  },
  {
    id: "blog",
    component: () => import("@/components/cards/blog-card").then((m) => m.BlogCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[120px]",
  },
  {
    id: "works",
    component: () => import("@/components/cards/works-card").then((m) => m.WorksCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[120px]",
  },
  {
    id: "map",
    component: () => import("@/components/cards/map-card").then((m) => m.MapCard),
    gridClass: "lg:col-span-2 xl:col-span-2",
    minHeight: "min-h-[180px]",
    title: "Travel",
  },
  {
    id: "colors",
    component: () => import("@/components/color-picker").then((m) => m.ColorPicker),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[140px]",
  },
  {
    id: "footer",
    component: () => import("@/components/cards/footer-card").then((m) => m.FooterCard),
    gridClass: "lg:col-span-1 xl:col-span-1",
    minHeight: "min-h-[100px]",
  },
]

export function DragDropProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<CardConfig[]>(defaultCards)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [dragOverCard, setDragOverCard] = useState<string | null>(null)

  // Load saved layout from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem("bentoLayout")
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout)
        setCards(parsedLayout)
      } catch (error) {
        console.error("Failed to parse saved layout:", error)
      }
    }
  }, [])

  // Save layout to localStorage whenever cards change
  useEffect(() => {
    localStorage.setItem("bentoLayout", JSON.stringify(cards))
  }, [cards])

  const handleDragStart = (cardId: string) => {
    setDraggedCard(cardId)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
    setDragOverCard(null)
  }

  const handleDragOver = (cardId: string) => {
    if (cardId !== draggedCard) {
      setDragOverCard(cardId)
    }
  }

  const handleDragLeave = () => {
    setDragOverCard(null)
  }

  const handleDrop = (targetCardId: string) => {
    if (draggedCard && draggedCard !== targetCardId) {
      reorderCards(draggedCard, targetCardId)
    }
    handleDragEnd()
  }

  const reorderCards = (sourceId: string, targetId: string) => {
    setCards((prevCards) => {
      const newCards = [...prevCards]
      const sourceIndex = newCards.findIndex((card) => card.id === sourceId)
      const targetIndex = newCards.findIndex((card) => card.id === targetId)

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const [movedCard] = newCards.splice(sourceIndex, 1)
        newCards.splice(targetIndex, 0, movedCard)
      }

      return newCards
    })
  }

  const resetLayout = () => {
    setCards([...defaultCards])
    localStorage.removeItem("bentoLayout")
  }

  const isDefaultLayout = () => {
    return JSON.stringify(cards.map((c) => c.id)) === JSON.stringify(defaultCards.map((c) => c.id))
  }

  return (
    <DragDropContext.Provider
      value={{
        cards,
        draggedCard,
        dragOverCard,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        reorderCards,
        resetLayout,
        isDefaultLayout,
      }}
    >
      {children}
    </DragDropContext.Provider>
  )
}

export function useDragDrop() {
  const context = useContext(DragDropContext)
  if (!context) {
    throw new Error("useDragDrop must be used within DragDropProvider")
  }
  return context
}
