import React from 'react'
import Navbar from '../components/home/header/navbar'
import Footer from '../components/home/footer/footer'
import Topic from '../components/home/topic/topic'

const Hosting = () => {
    window.scrollTo(0, 0);
    return (
        <div className="bg-gradient-to-tr from-indigo-100 to-white min-h-dvh">
            
            <div className='text-center py-10'>
                <Topic title={'Reliable and Secure Hosting'} text={'Our hosting service provides a robust foundation for your website, ensuring:'}
                    action={
                        <ul className='mt-1 mb-10'>
                            <li>99.9% uptime guarantee for uninterrupted access</li>
                            <li>Advanced security measures to protect against threats</li>
                            <li>Regular backups to safeguard your data</li>
                            <li>Automatic updates to keep your site optimized</li>
                        </ul>
                    }
                />

                <Topic title={'Easy Management'} text={'Streamline your website management with:'} action={
                    <ul className='mt-1 mb-10'>
                        <li>User-friendly control panel for effortless updates</li>
                        <li>One-click installations for popular apps and scripts</li>
                        <li>24/7 support to assist with any issues</li>
                    </ul>
                } />

                <Topic title={'Affordable Pricing'} text={'Enjoy competitive rates without compromising on quality:'} action={
                    <ul className='mt-1 mb-10'>
                        <li>Competitive pricing across all plan tiers</li>
                        <li>No hidden fees or surprise charges</li>
                        <li>Transparent billing to help you budget effectively</li>
                    </ul>
                } />
            </div>
            <div className='mx-auto p-14 bg-transparent rounded-2xl max-w-2xl text-center'>
                <a href='/login' className='p-5 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-full bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Get Started Now!</a>
            </div>
            <Footer />
        </div>
    )
}

export default Hosting