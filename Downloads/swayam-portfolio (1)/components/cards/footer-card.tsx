import { MacOSWindow } from "@/components/macos-window"

export function FooterCard() {
  return (
    <MacOSWindow className="h-full" showTrafficLights={false} id="footer">
      <div className="text-xs text-white/50 space-y-1 sf-pro">
        <p>© 2024 • Crafted with ❤️</p>
        <p>using Next.js by Swayam.</p>
      </div>
    </MacOSWindow>
  )
}
