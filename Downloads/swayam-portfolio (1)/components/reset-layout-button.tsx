"use client"

import { useState } from "react"
import { RotateCcw, Check, X } from "lucide-react"
import { useDragDrop } from "@/components/drag-drop-provider"

export function ResetLayoutButton() {
  const { resetLayout, isDefaultLayout } = useDragDrop()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = async () => {
    setIsResetting(true)

    // Add a small delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 300))

    resetLayout()
    setShowConfirmation(false)
    setIsResetting(false)
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  if (isDefaultLayout()) {
    return null // Don't show button if already in default layout
  }

  if (showConfirmation) {
    return (
      <div className="fixed top-6 right-20 z-50 flex gap-2">
        <button
          onClick={handleReset}
          disabled={isResetting}
          className="macos-button rounded-xl px-3 py-2 text-white/80 hover:text-white flex items-center gap-2 text-sm sf-pro disabled:opacity-50"
        >
          {isResetting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
              Resetting...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Confirm
            </>
          )}
        </button>
        <button
          onClick={handleCancel}
          disabled={isResetting}
          className="macos-button rounded-xl px-3 py-2 text-white/80 hover:text-white flex items-center gap-2 text-sm sf-pro disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirmation(true)}
      className="fixed top-6 right-20 z-50 macos-button rounded-xl px-3 py-2 text-white/80 hover:text-white flex items-center gap-2 text-sm sf-pro transition-all duration-200 hover:scale-105"
      title="Reset to default layout"
    >
      <RotateCcw className="h-4 w-4" />
      Reset Layout
    </button>
  )
}
