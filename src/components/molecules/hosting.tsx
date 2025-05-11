import ScrollFade from "../ui/scroll-fade";

const Hosting = () => {
  return (
    <ScrollFade>
      <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg hover:shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Reliable and Secure Hosting</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">99.9% uptime guarantee for uninterrupted access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">Advanced security measures to protect against threats</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">Regular backups to safeguard your data</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">Automatic updates to keep your site optimized</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg hover:shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Easy Management</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">User-friendly control panel for effortless updates</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">One-click installations for popular apps and scripts</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">24/7 support to assist with any issues</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg hover:shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Affordable Pricing</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">Competitive pricing across all plan tiers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">No hidden fees or surprise charges</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-700">Transparent billing to help you budget effectively</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </ScrollFade>
  )
}

export default Hosting