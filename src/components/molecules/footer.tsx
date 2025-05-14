const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mb-8 md:mb-0">
                <div className="flex items-center mb-4">
                    <i className="fas fa-cube text-indigo-500 text-2xl mr-2"></i>
                    <span className="text-xl font-bold">PaaS</span>
                </div>
                <p className="text-gray-400 mb-4">Simplified Deployment Platform.</p>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Web Hosting</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Domains</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">SSL Certificates</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cloud Hosting</a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Legal Information</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Press</a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Service Status</a></li>
                </ul>
            </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 PaaS. All rights reserved.</p>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
            </div>
        </div>
    </div>
</footer>

  )
}

export default Footer