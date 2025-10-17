import { useEffect, useState } from 'react';
import uberLogo from '../assets/uberLogo.svg'
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);

        setUserData({
            email, password
        })
        setEmail('')
        setPassword('')
    }

    // useEffect(() => {
    //     console.log(userData);
    // }, [userData]);

    return (
        <div className='h-screen w-full flex flex-col justify-between'>
            <div className='px-5'>
                <img src={uberLogo} className='w-20' />
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className='text-lg font-medium antialiased my-1 mt-5'>What's your email</div>
                    <input
                        type="email"
                        placeholder='example@gmail.com'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] border-slate-300 text-sm my-1 mb-5 w-full h-10 p-3 rounded '
                    />
                    <div className='text-lg font-medium antialiased my-1'>Enter Password</div>
                    <input
                        type="password"
                        placeholder='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] border-slate-300 text-sm my-1 mb-5 w-full h-10 p-3 rounded '
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                </form>
                <p className='text-center'>New here? <Link to='/users/register' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <Link to='/captains/login' className='bg-[#32ac46] text-white font-medium flex justify-center rounded p-2.5 mt-2 mb-6 mx-5'>Sign in as Captain</Link>
        </div>
    )
}

export default UserLogin;