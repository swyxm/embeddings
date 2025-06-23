import { Github, Linkedin, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="space-y-8 pt-16">
      <div className="space-y-4">
        <h1 className="text-sm text-green-400 font-medium">Welcome</h1>
        <div className="space-y-2">
          <p className="text-gray-300 leading-relaxed">
            Hi, I'm <span className="text-white font-semibold">Swayam Parekh</span>, a passionate developer with a
            strong focus on creating exceptional digital experiences and innovative solutions.
          </p>
          <p className="text-gray-400 text-sm">
            Feel free to reach out to me if you have any projects in mind, or just to say hello.
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10"
        >
          <Github className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10"
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10"
        >
          <Mail className="h-4 w-4" />
        </Button>
      </div>

      <Button className="bg-green-600 hover:bg-green-700 text-white">
        <Calendar className="h-4 w-4 mr-2" />
        Schedule a call
      </Button>
    </div>
  )
}
