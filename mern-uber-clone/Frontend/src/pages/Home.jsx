import { Link } from 'react-router-dom'
import uberLogo from '../assets/uberLogo.svg'
import homeBackgroundImage from '../assets/homeBackgroundImage.png'

const Home = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-between' style={{backgroundImage : `url(${homeBackgroundImage})`, backgroundPosition: 'center', backgroundSize : 'cover'}}>
            <div className='px-4'>
            <img src={uberLogo} className='w-20'/>
            </div>
            <div className='bg-white p-3 rounded'>
                <div className='text-3xl font-bold mt-1 mb-5'>Get Started with Uber</div>
                <Link to='/users/login' className='bg-black text-white flex justify-center rounded p-2.5 mt-2 mb-4'>Continue</Link>
            </div>
        </div>
    )
}

export default Home