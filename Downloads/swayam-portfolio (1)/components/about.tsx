export function About() {
  const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB"]

  return (
    <div className="space-y-6 pt-16">
      <h2 className="text-xl font-semibold text-white">About me</h2>

      <div className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          Hi, I'm Swayam, a full-stack developer passionate about building scalable applications and exploring new
          technologies.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-200">My primary tools of choice include:</h3>
          <ul className="space-y-1">
            {skills.map((skill) => (
              <li key={skill} className="text-gray-400 text-sm flex items-center">
                <span className="w-1 h-1 bg-green-400 rounded-full mr-3"></span>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          Beyond coding, I'm passionate about problem-solving, continuous learning, and contributing to open-source
          projects. I enjoy exploring the intersection of technology and creativity to build meaningful digital
          experiences.
        </p>
      </div>
    </div>
  )
}
