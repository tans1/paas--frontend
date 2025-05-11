import { Check, X } from 'lucide-react'
import ScrollFade from '../ui/scroll-fade'

const Prices = () => {
    return (
        <ScrollFade>
            <section id="pricing" className="my- 10 py-20 bg-gray-50 fade-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the perfect plan for your needs. No hidden fees, cancel anytime.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Basic</h3>
                                <p className="text-gray-600 mb-6">Perfect for individuals getting started</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">1000<span className='text-xl'>birr</span></span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>10 Projects</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>5GB Storage</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>Basic Analytics</span>
                                    </li>
                                    <li className="flex items-center text-gray-400">
                                        <i className="mr-2"><X /></i>
                                        <span>Priority Support</span>
                                    </li>
                                </ul>
                                <a href="/register">
                                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                                        Get Started
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* Popular Plan */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform scale-105 border-2 border-indigo-500">
                            <div className="bg-indigo-500 text-white text-center py-2">
                                <span className="text-sm font-semibold">MOST POPULAR</span>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Pro</h3>
                                <p className="text-gray-600 mb-6">For growing businesses and teams</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">2500<span className='text-xl'>birr</span></span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>Unlimited Projects</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>50GB Storage</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>Advanced Analytics</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>Priority Support</span>
                                    </li>
                                </ul>
                                <a href="/register">
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 btn-glow">
                                        Get Started
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Enterprise</h3>
                                <p className="text-gray-600 mb-6">For large organizations, starting price at</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">2900<span className='text-xl'>birr</span></span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>Unlimited Projects</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>1TB Storage</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>Advanced Analytics</span>
                                    </li>
                                    <li className="flex items-center">
                                        <i className="text-green-500 mr-2"><Check /></i>
                                        <span>24/7 Dedicated Support</span>
                                    </li>
                                </ul>
                                <a href="/#contact">
                                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                                        Contact Sales
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ScrollFade>
    )
}

export default Prices