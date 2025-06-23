import { ArrowUpRight } from "lucide-react"
import { MacOSWindow } from "@/components/macos-window"

export function MapCard() {
  return (
    <MacOSWindow className="h-full" title="Travel" id="map">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white sf-pro">Countries I visited</h3>
          <ArrowUpRight className="h-5 w-5 text-white/60 hover:text-[var(--accent-color)] transition-colors cursor-pointer" />
        </div>
        <div className="macos-button rounded-xl h-24 flex items-center justify-center border border-white/20">
          <span className="text-white/50 text-sm sf-pro">🗺️ World Map</span>
        </div>
      </div>
    </MacOSWindow>
  )
}
