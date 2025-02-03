import React from 'react'
import Navbar from '../components/home/header/navbar'
import Footer from '../components/home/footer/footer'
import Topic from '../components/home/topic/topic'

const Domain = () => {
    window.scrollTo(0, 0);
    return (
        <div className="bg-gradient-to-tr from-indigo-100 to-white min-h-dvh">
            <div className='text-3xl md:text-5xl text-center py-20'>
                <Topic orangeTitle='Seamless Custom Domain Integration' title={''} text={'Connect your domain seamlessly and deploy with ease.'} />
            </div>
            <div className='mx-auto p-14 bg-transparent rounded-2xl max-w-2xl text-center'>
                <a href='/login' className='p-5 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-full bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Get Started Now!</a>
            </div>
            <Footer />
        </div>
    )
}

export default Domain