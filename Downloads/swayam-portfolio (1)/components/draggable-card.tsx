"use client"

import type React from "react"
import { useDragDrop } from "@/components/drag-drop-provider"

interface DraggableCardProps {
  cardId: string
  children: React.ReactNode
  className?: string
}

export function DraggableCard({ cardId, children, className = "" }: DraggableCardProps) {
  const { draggedCard, dragOverCard, handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop } =
    useDragDrop()

  const isDragging = draggedCard === cardId
  const isDragOver = dragOverCard === cardId

  const handleDragStartEvent = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", cardId)
    handleDragStart(cardId)
  }

  const handleDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    handleDragOver(cardId)
  }

  const handleDropEvent = (e: React.DragEvent) => {
    e.preventDefault()
    const sourceCardId = e.dataTransfer.getData("text/html")
    if (sourceCardId !== cardId) {
      handleDrop(cardId)
    }
  }

  return (
    <div
      className={`
        ${className}
        transition-all duration-300 ease-out
        ${isDragging ? "opacity-50 scale-95 rotate-2 z-50" : ""}
        ${isDragOver ? "scale-105 ring-2 ring-[var(--accent-color)]/50 ring-offset-2 ring-offset-transparent" : ""}
        ${!isDragging && !isDragOver ? "hover:scale-[1.02]" : ""}
        cursor-grab active:cursor-grabbing
      `}
      draggable
      onDragStart={handleDragStartEvent}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOverEvent}
      onDragLeave={handleDragLeave}
      onDrop={handleDropEvent}
    >
      {children}
    </div>
  )
}
