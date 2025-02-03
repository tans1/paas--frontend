import React from 'react'
import Footer from '../components/home/footer/footer'
import Navbar from '../components/home/header/navbar'

const Contacts = () => {
    window.scrollTo(0, 0);
    return (
        <div className="bg-gradient-to-tr from-indigo-100 to-white min-h-dvh">
            <Navbar />
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
                    <div className="max-w-2xl mx-auto mb-12">
                        <p className="mb-6 text-lg">
                            We're here to help! Whether you have a question, need support, or want to learn more about our hosting services, please don't hesitate to reach out.
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-red-500 to-orange-400">
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-center">Contact Information</h2>
                        <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-4 md:space-y-0">
                            <div className="flex flex-col items-start">
                                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                                <p className="text-gray-600">+1 234 567 890</p>
                            </div>
                            <div className="flex flex-col items-start ml-8">
                                <h3 className="text-lg font-semibold mb-2">Email</h3>
                                <p className="text-gray-600">PaaS@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Contacts