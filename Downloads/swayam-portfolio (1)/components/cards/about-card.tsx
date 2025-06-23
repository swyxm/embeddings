import { MacOSWindow } from "@/components/macos-window"

export function AboutCard() {
  const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB"]

  return (
    <MacOSWindow className="h-full" title="About" id="about">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white sf-pro">About me</h2>

        <div className="space-y-4">
          <p className="text-white/70 text-sm leading-relaxed sf-pro">
            Hi, I'm Swayam, a full-stack developer passionate about building scalable applications and exploring new
            technologies.
          </p>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white/80 sf-pro">My primary tools of choice include:</h3>
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li key={skill} className="text-white/60 text-sm flex items-center sf-pro">
                  <span
                    className="w-1.5 h-1.5 rounded-full mr-3"
                    style={{
                      backgroundColor: `var(--accent-color)`,
                      boxShadow: `0 0 4px rgba(var(--accent-glow), 0.5)`,
                    }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white/60 text-sm leading-relaxed sf-pro">
            Beyond coding, I'm passionate about problem-solving, continuous learning, and contributing to open-source
            projects.
          </p>
        </div>
      </div>
    </MacOSWindow>
  )
}
