import { MacOSWindow } from "@/components/macos-window"

export function ContactCard() {
  return (
    <MacOSWindow className="h-full" title="Contact" id="contact">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white sf-pro">{"Let's start working together!"}</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-white/50 mb-2 sf-pro">Contact Details</h3>
            <p className="text-[var(--accent-color)] text-sm sf-pro">contact@swayamparekh.com</p>
            <p className="text-white/60 text-sm sf-pro">Available worldwide</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white/50 mb-2 sf-pro">Socials</h3>
            <div className="space-y-1">
              <p className="text-white/70 text-sm hover:text-[var(--accent-color)] cursor-pointer transition-colors sf-pro">
                LinkedIn
              </p>
              <p className="text-white/70 text-sm hover:text-[var(--accent-color)] cursor-pointer transition-colors sf-pro">
                GitHub
              </p>
              <p className="text-white/70 text-sm hover:text-[var(--accent-color)] cursor-pointer transition-colors sf-pro">
                Medium
              </p>
              <p className="text-white/70 text-sm hover:text-[var(--accent-color)] cursor-pointer transition-colors sf-pro">
                Discord
              </p>
            </div>
          </div>
        </div>
      </div>
    </MacOSWindow>
  )
}
