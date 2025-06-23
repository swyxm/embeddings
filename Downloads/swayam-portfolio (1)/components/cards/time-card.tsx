"use client"

import { useEffect, useState } from "react"
import { MacOSWindow } from "@/components/macos-window"

export function TimeCard() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MacOSWindow className="h-full" showTrafficLights={false} id="time">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-2xl font-bold text-white sf-pro tabular-nums">{time}</div>
        </div>
      </div>
    </MacOSWindow>
  )
}
