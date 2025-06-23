import { MacOSWindow } from "@/components/macos-window"

export function WorksCard() {
  return (
    <MacOSWindow className="h-full" showTrafficLights={false} id="works">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white sf-pro">Works</h3>
        <div className="text-xs font-bold text-white/40 transform -rotate-12 sf-pro">
          WORK IN
          <br />
          PROGRESS
        </div>
      </div>
    </MacOSWindow>
  )
}
