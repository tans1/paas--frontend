import React from 'react'
import Topic from '../topic/topic'
import migrateImage from "../../../assets/migrate.jpg";

const Info = () => {
    return (
        <div className=''>
            <div className='max-w-screen-lg mx-auto mt-10 grid md:grid-cols-2 sm:grid-cols-1'>
                <div className={`p-20 max-md:bg-migrateImage bg-contain bg-no-repeat bg-center`}>
                    <div className='backdrop-blur-sm -mx-10'>
                        <Topic orangeTitle={'Moving From Another Host?'} title={'Its easy to migrate your site for FREE!'} text={'Our platform provides free and quick migration. You can have your site migrated and deployed immediately within a few button clicks. Have any questions, then click below to speak to our team.'} />
                    </div>
                </div>
                <img className='w-50 h-50 m-auto hidden md:block' src={migrateImage} alt="Support" />
            </div>
        </div>
    )
}
export default Info