import { Github, Linkedin, Mail, Calendar } from "lucide-react"
import { MacOSWindow } from "@/components/macos-window"

export function HeroCard() {
  return (
    <MacOSWindow className="h-full" title="Welcome" id="hero">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-sm text-white/60 font-medium tracking-wide uppercase sf-pro">Welcome</h1>
            <div className="space-y-3">
              <p className="text-white/90 leading-relaxed sf-pro">
                Hi, I'm{" "}
                <span className="font-semibold bg-gradient-to-r from-[var(--accent-color)] to-white bg-clip-text text-transparent">
                  Swayam Parekh
                </span>
                , a passionate developer with a strong focus on creating exceptional digital experiences and innovative
                solutions.
              </p>
              <p className="text-white/60 text-sm sf-pro">
                Feel free to reach out to me if you have any projects in mind, or just to say hello.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="macos-button rounded-xl p-3 text-white/80 hover:text-white">
              <Github className="h-4 w-4" />
            </button>
            <button className="macos-button rounded-xl p-3 text-white/80 hover:text-white">
              <Linkedin className="h-4 w-4" />
            </button>
            <button className="macos-button rounded-xl p-3 text-white/80 hover:text-white">
              <Mail className="h-4 w-4" />
            </button>
            <button
              className="px-4 py-3 rounded-xl text-white font-medium sf-pro transition-all duration-200 hover:scale-105 accent-glow"
              style={{
                background: `linear-gradient(135deg, var(--accent-color), rgba(var(--accent-glow), 0.8))`,
              }}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              Book a call
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="w-48 h-48 macos-button rounded-3xl flex items-center justify-center border-2 border-dashed border-white/20 animate-float">
            <span className="text-white/50 text-sm sf-pro">Your Image Here</span>
          </div>
        </div>
      </div>
    </MacOSWindow>
  )
}
