"use client"

import { useColor } from "@/components/color-provider"
import { MacOSWindow } from "@/components/macos-window"

const colors = [
  { name: "red", value: "#ef4444", label: "Red" },
  { name: "orange", value: "#f97316", label: "Orange" },
  { name: "yellow", value: "#eab308", label: "Yellow" },
  { name: "green", value: "#22c55e", label: "Green" },
  { name: "blue", value: "#3b82f6", label: "Blue" },
  { name: "indigo", value: "#6366f1", label: "Indigo" },
  { name: "purple", value: "#9333ea", label: "Purple" },
  { name: "pink", value: "#ec4899", label: "Pink" },
  { name: "cyan", value: "#06b6d4", label: "Cyan" },
  { name: "mint", value: "#34d399", label: "Mint" },
] as const

export function ColorPicker() {
  const { accentColor, setAccentColor } = useColor()

  return (
    <MacOSWindow className="h-full" showTrafficLights={false} id="colors">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white/80 sf-pro text-center">Accent Colors</h4>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setAccentColor(color.name)}
              className={`w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${
                accentColor === color.name
                  ? "ring-2 ring-offset-2 ring-offset-transparent ring-white/40 scale-110"
                  : "hover:shadow-lg"
              }`}
              style={{
                backgroundColor: color.value,
                boxShadow: accentColor === color.name ? `0 0 16px ${color.value}60` : `0 2px 8px ${color.value}30`,
              }}
              title={color.label}
            />
          ))}
        </div>
      </div>
    </MacOSWindow>
  )
}
