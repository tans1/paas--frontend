import Topic from '../atoms/topic'
import migrateImage from "../../assets/migrate.jpg";

const Info = () => {
    return (
        <div className=''>
            <div className='p-20 max-w-screen-lg mx-auto mt-10 grid md:grid-cols-2 sm:grid-cols-1'>
                    <div className='backdrop-blur-sm -mx-10'>
                        <Topic orangeTitle={'Moving From Another Host?'} 
                        title={'Its easy to migrate your site for FREE!'} 
                        text={'Our platform provides free and quick migration. You can have your site migrated and deployed immediately within a few button clicks. Have any questions, then click below to contact our team.'}
                        action={<a href='/#contact' className='font-semibold text-sm'>Contact us</a>}
                        />
                    </div>
                <img className='max-w-60 m-auto hidden md:block aspect-video' src={migrateImage} alt="Support" />
            </div>
        </div>
    )
}
export default Info