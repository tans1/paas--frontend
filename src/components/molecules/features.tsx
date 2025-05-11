import ScrollFade from '../ui/scroll-fade'

const Features = () => {
    return (
        <ScrollFade threshold={0.1}>
            <div>
                <section id="features" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Amazing Features</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover what makes our product stand out from the crowd with these incredible features.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                                    <i className="fas fa-bolt text-indigo-600 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                                <p className="text-gray-600">Optimized for performance with minimal loading times and smooth animations.</p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                    <i className="fas fa-mobile-alt text-purple-600 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsive Design</h3>
                                <p className="text-gray-600">Looks perfect on all devices from smartphones to large desktop screens.</p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <i className="fas fa-cog text-blue-600 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Customization</h3>
                                <p className="text-gray-600">Simple to customize with our intuitive settings panel and documentation.</p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                    <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
                                <p className="text-gray-600">Enterprise-grade security to keep your data safe and protected.</p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                                    <i className="fas fa-chart-line text-yellow-600 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
                                <p className="text-gray-600">Track your performance with our comprehensive analytics dashboard.</p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                    <i className="fas fa-headset text-red-600 text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
                                <p className="text-gray-600">Our dedicated support team is always ready to help you with any issues.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='shadow-md mx-auto my-10 p-14 bg-white rounded-2xl max-w-2xl grid sm:grid-cols-1'>
                    <p className='col-start-1 font-bold text-5xl'>Ready to get started? <br />
                        <span className='font-light text-lg'>we're confident you'll be 100% satisfied.</span>
                    </p>
                    <a href='/register' className='md:col-start-2 m-auto p-5 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-full bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Get Started Now!</a>
                </div>
            </div>
        </ScrollFade>
    )
}
export default Features