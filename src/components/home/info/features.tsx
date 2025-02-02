import React from 'react'
import Topic from '../topic/topic'

const Features = () => {
    return (
        <div>
            <InfoTemplate data={InfoData1} />
            <InfoTemplate data={InfoData2} />
            <InfoTemplate data={InfoData3} />
            <InfoTemplate data={InfoData4} />
            <div className='shadow-md mx-auto p-14 bg-white rounded-2xl max-w-2xl grid sm:grid-cols-1'>
                <p className='col-start-1 font-bold text-5xl'>Ready to get started? <br />
                    <span className='font-light text-lg'>we're confident you'll be 100% satisfied.</span>
                </p>
                <a href='/login' className='md:col-start-2 m-auto p-5 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-full bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Get Started Now!</a>
            </div>
        </div>
    )
}
type data = {
    orange: string;
    title: string;
    text: string;
    imgUrl: string;
    side: boolean;
}

// A component that uses the Topic component and puts it either left or right of an image in desktop view
// or makes the background an image on smaller devices

const InfoTemplate: React.FC<{
    data: data;
}> = ({ data }) => {
    return (
        <div className='max-w-screen-lg mx-auto mt-10 grid md:grid-cols-2 sm:grid-cols-1'>
            <div className={`${data.side ? 'col-start-1' : 'col-start-2'} p-20 ${data.imgUrl} bg-contain bg-no-repeat bg-center max-md:max-w-sm content-center`}>
                <div className='backdrop-blur-sm -mx-10 md:max-md:items-center'>
                    <Topic orangeTitle={data.orange} title={data.title} text={data.text} action={<a href='/#' className='font-medium pt-3'>Learn More</a>} />
                </div>
            </div>
            <img className={`${data.side ? 'col-start-2' : 'col-start-1 row-start-1'} w-50 h-50 m-auto hidden md:block`} src='./logo192.png' alt="Support" />
        </div>
    )
}

const InfoData1: data = {
    orange: 'Simple and Intuitive',
    title: 'Easy to setup',
    text: 'Getting your website live is as simple as a click of a button. Everything you need - provided in a clear way',
    side: false,
    imgUrl: 'max-md:bg-reactLogo'
}
const InfoData2: data = {
    orange: 'Performance and Speed',
    title: 'Simply fast websites',
    text: 'Website speed slow or want to grow your business? Delight your visitors with a lightning fast website.',
    side: true,
    imgUrl: 'max-md:bg-reactLogo'
}
const InfoData3: data = {
    orange: 'Security on Every Step',
    title: 'DNS and DDoS',
    text: 'Our team of experts up an running. Anytime',
    side: false,
    imgUrl: 'max-md:bg-reactLogo'
}
const InfoData4: data = {
    orange: 'Professional and hands-on',
    title: '24/7 Chat Support',
    text: 'Our team of experts will solve techncal issues to get your website up and running. Anytime.',
    side: true,
    imgUrl: 'max-md:bg-reactLogo'
}
export default Features