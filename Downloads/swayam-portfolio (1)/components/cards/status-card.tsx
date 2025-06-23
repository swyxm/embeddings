import { MacOSWindow } from "@/components/macos-window"

export function StatusCard() {
  return (
    <MacOSWindow className="h-full" showTrafficLights={false} id="status">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white sf-pro">Now</span>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: `var(--accent-color)`,
              boxShadow: `0 0 8px rgba(var(--accent-glow), 0.6)`,
            }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-white/50 sf-pro">{"what's that ?"}</p>
          <p className="text-sm text-white/80 sf-pro">Currently working fulltime</p>
        </div>
      </div>
    </MacOSWindow>
  )
}
