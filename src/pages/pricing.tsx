import React from 'react'
import Footer from '../components/home/footer/footer'
import Navbar from '../components/home/header/navbar'

const PricingPage = () => {
    window.scrollTo(0, 0);
    return (
        <div className="bg-gradient-to-tr from-indigo-100 to-white min-h-dvh">
            <Navbar />

            <div className="overflow-x-auto justify-items-center my-20">
                <table className="max-w-lg text-sm text-left shadow-lg">
                    <thead className="text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Feature
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Basic Plan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pro Plan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Enterprise Plan
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Storage Space</td>
                            <td className="px-6 py-4 whitespace-nowrap">10GB</td>
                            <td className="px-6 py-4 whitespace-nowrap">50GB</td>
                            <td className="px-6 py-4 whitespace-nowrap">100GB</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Bandwidth</td>
                            <td className="px-6 py-4 whitespace-nowrap">100GB/month</td>
                            <td className="px-6 py-4 whitespace-nowrap">500GB/month</td>
                            <td className="px-6 py-4 whitespace-nowrap">1TB/month</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Domains</td>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                            <td className="px-6 py-4 whitespace-nowrap">Unlimited</td>
                            <td className="px-6 py-4 whitespace-nowrap">Unlimited</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Email Accounts</td>
                            <td className="px-6 py-4 whitespace-nowrap">5</td>
                            <td className="px-6 py-4 whitespace-nowrap">20</td>
                            <td className="px-6 py-4 whitespace-nowrap">50</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">MySQL Databases</td>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                            <td className="px-6 py-4 whitespace-nowrap">5</td>
                            <td className="px-6 py-4 whitespace-nowrap">10</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Support Level</td>
                            <td className="px-6 py-4 whitespace-nowrap">Limited Community Support</td>
                            <td className="px-6 py-4 whitespace-nowrap">Priority Support</td>
                            <td className="px-6 py-4 whitespace-nowrap">Dedicated Account Manager</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-bold">Price</td>
                            <td className="px-6 py-4 whitespace-nowrap">1000 birr</td>
                            <td className="px-6 py-4 whitespace-nowrap">2500 birr</td>
                            <td className="px-6 py-4 whitespace-nowrap">2900 birr</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mx-auto p-14 bg-transparent rounded-2xl max-w-2xl text-center'>
                <a href='/login' className='p-5 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-full bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Get Started Now!</a>
            </div>

            <Footer />
        </div>
    )
}

export default PricingPage