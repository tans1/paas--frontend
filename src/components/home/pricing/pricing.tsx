import React from 'react'
import Topic from '../topic/topic'

const pricingData = {
    orange: 'Find Your Perfect Solution',
    title: 'Pricing Plans',
    text: 'We provide flexible, scalable, and robust platform.'
}



const Pricing = () => {
    return (
        // Pricing information
        <div className='pricing max-w-screen-lg mx-auto grid md:grid-cols-2'>
            {/* left side text using Topic function */}
            <div className='p-20'>
                <Topic orangeTitle={pricingData.orange} title={pricingData.title} text={pricingData.text}></Topic>
            </div>
            {/* boxes showing prices right side, can be on the right or below using grid*/}
            <div className='grid sm:grid-cols-3  gap-4 max-w-lg mx-auto'>
                <div className='shadow sm:text-sm rounded-2xl hover:shadow-sky-600 justify-items-center p-10 text-center text-nowrap'>
                    <p className='font-bold'>BASIC</p>
                    <p className='font-light'>As low as</p>
                    <p className='text-blue-600 text-5xl font-semibold'>1000<span className='text-sm font-bold '>birr</span></p>
                    <p className='font-light'>Per Month</p>
                    <p className='rounded-full w-fit min-w-fit p-2 mt-5 mx-auto border-2 border-blue-200'>See Details</p>
                </div>
                <div className='shadow sm:text-sm rounded-2xl hover:shadow-sky-600 justify-items-center p-10 text-center text-nowrap bg-gradient-to-b from-blue-500 to-blue-600 text-white'>
                    <p className='font-bold'>PRO</p>
                    <p className='font-light'>As low as</p>
                    <p className='text-transparent text-5xl font-semibold bg-gradient-to-tr from-red-500 to-orange-400 bg-clip-text'>2500<span className='text-sm font-bold'>birr</span></p>
                    <p className='font-light'>Per Month</p>
                    <p className='rounded-full w-fit shadow min-w-fit p-2 mt-5 mx-auto shadow-slate-500 text-white bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>See Details</p>
                </div>
                <div className='shadow sm:text-sm rounded-2xl hover:shadow-sky-600 justify-items-center p-10 text-center text-nowrap'>
                    <p className='font-bold'>ENTERPRISE</p>
                    <p className='font-light'>As low as</p>
                    <p className=' text-blue-600 text-5xl font-semibold'>2900<span className='text-sm font-bold'>birr</span></p>
                    <p className='font-light'>Per Month</p>
                    <p className='rounded-full w-fit min-w-fit p-2 mt-5 mx-auto border-2 border-blue-200'>See Details</p>
                </div>
            </div>
        </div>
    )
}

export default Pricing