export function Contact() {
  return (
    <div className="mt-24 grid md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Let's start building something amazing together!</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Contact Details</h3>
            <p className="text-green-400 text-sm">contact@swayamparekh.com</p>
            <p className="text-gray-400 text-sm">Available worldwide</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Socials</h3>
            <div className="space-y-1">
              <p className="text-gray-300 text-sm hover:text-green-400 cursor-pointer transition-colors">LinkedIn</p>
              <p className="text-gray-300 text-sm hover:text-green-400 cursor-pointer transition-colors">GitHub</p>
              <p className="text-gray-300 text-sm hover:text-green-400 cursor-pointer transition-colors">Twitter</p>
              <p className="text-gray-300 text-sm hover:text-green-400 cursor-pointer transition-colors">Medium</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-green-400">Journey</h4>
              <p className="text-xs text-gray-400">My professional path and experiences</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-green-400">Projects</h4>
              <p className="text-xs text-gray-400">Showcase of my latest work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
