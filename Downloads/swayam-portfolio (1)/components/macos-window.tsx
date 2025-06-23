"use client"

import type React from "react"
import { useRef, useState } from "react"
import { useMinimize } from "@/components/minimize-provider"

interface MacOSWindowProps {
  children: React.ReactNode
  className?: string
  showTrafficLights?: boolean
  title?: string
  id: string
}

export function MacOSWindow({ children, className = "", showTrafficLights = true, title, id }: MacOSWindowProps) {
  const { minimizeCard, isMinimized } = useMinimize()
  const [isAnimating, setIsAnimating] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMinimize = () => {
    if (windowRef.current && !isAnimating) {
      setIsAnimating(true)

      // Get the current position of the window
      const rect = windowRef.current.getBoundingClientRect()

      // Add minimize animation class
      windowRef.current.classList.add("minimize-animation")

      // After animation completes, add to minimized cards
      setTimeout(() => {
        minimizeCard({
          id,
          title: title || "Window",
          component: children,
          position: { x: rect.left, y: rect.top },
        })
        setIsAnimating(false)
      }, 800)
    }
  }

  if (isMinimized(id)) {
    return null
  }

  return (
    <div ref={windowRef} className={`macos-window rounded-2xl overflow-hidden ${className}`}>
      {showTrafficLights && (
        <div className="traffic-lights border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="traffic-light traffic-light-red" />
              <div className="traffic-light traffic-light-yellow" onClick={handleMinimize} />
              <div className="traffic-light traffic-light-green" />
            </div>
            {title && <div className="text-white/60 text-xs font-medium sf-pro mr-4">{title}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
