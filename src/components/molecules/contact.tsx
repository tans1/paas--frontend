const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-indigo-50 fade-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                        <p className="text-lg text-gray-600 mb-8">Have questions or want to learn more? Fill out the form and our team will get back to you within 24 hours.</p>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-map-marker-alt text-indigo-600"></i>
                                </div>
                                <p className="text-gray-700">123 Business Ave, Office 456<br />Addis Ababa, Ethiopia</p>
                            </div>

                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-phone-alt text-indigo-600"></i>
                                </div>
                                <p className="text-gray-700">+251 912345678</p>
                            </div>

                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-envelope text-indigo-600"></i>
                                </div>
                                <p className="text-gray-700">pass@email.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <form className="bg-white p-8 rounded-xl shadow-md">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                                <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300" placeholder="John Doe" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300" placeholder="john@example.com" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                                <input type="text" id="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300" placeholder="How can we help?" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300" placeholder="Your message here..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 btn-glow">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact