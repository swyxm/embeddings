import { ArrowUpRight } from "lucide-react"
import { MacOSWindow } from "@/components/macos-window"

export function JourneyCard() {
  return (
    <MacOSWindow className="h-full" showTrafficLights={false} id="journey">
      <div className="flex items-center justify-between h-full group cursor-pointer">
        <h3 className="text-lg font-semibold text-white sf-pro">Journey</h3>
        <ArrowUpRight className="h-5 w-5 text-white/60 group-hover:text-[var(--accent-color)] transition-colors duration-200" />
      </div>
    </MacOSWindow>
  )
}
