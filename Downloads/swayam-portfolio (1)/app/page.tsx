"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ColorProvider } from "@/components/color-provider"
import { MinimizeProvider } from "@/components/minimize-provider"
import { DragDropProvider } from "@/components/drag-drop-provider"
import { BentoGrid } from "@/components/bento-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResetLayoutButton } from "@/components/reset-layout-button"
import { Dock } from "@/components/dock"

export default function Portfolio() {
  return (
    <ThemeProvider>
      <ColorProvider>
        <MinimizeProvider>
          <DragDropProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-foreground transition-all duration-500 relative overflow-hidden">
              {/* Dynamic background gradients */}
              <div className="fixed inset-0 z-0">
                <div
                  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
                  style={{
                    background: `radial-gradient(circle, rgba(var(--accent-glow), 0.4) 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-pulse-glow"
                  style={{
                    background: `radial-gradient(circle, rgba(var(--accent-glow), 0.3) 0%, transparent 70%)`,
                    animationDelay: "2s",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 animate-pulse-glow"
                  style={{
                    background: `radial-gradient(circle, rgba(var(--accent-glow), 0.2) 0%, transparent 70%)`,
                    animationDelay: "4s",
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="fixed top-6 right-6 z-50">
                  <ThemeToggle />
                </div>

                <ResetLayoutButton />

                <div className="container mx-auto px-6 py-12 pb-32">
                  <BentoGrid />
                </div>

                <Dock />
              </div>
            </div>
          </DragDropProvider>
        </MinimizeProvider>
      </ColorProvider>
    </ThemeProvider>
  )
}
