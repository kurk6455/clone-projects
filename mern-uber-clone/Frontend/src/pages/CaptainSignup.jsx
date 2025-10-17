import { useEffect, useState } from 'react';
import uberDriverLogo from '../assets/uberDriverLogo.svg'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(firstname, lastname, email, password);

        setCaptainData({
            fullname: {
                firstname, lastname
            },
            email,
            password
        })
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        console.log(captainData);
    }, [captainData]);

    return (
        <div className='h-screen w-full flex flex-col justify-between'>
            <div className='px-5'>
                <img src={uberDriverLogo} className='w-20 mt-4' />
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className='text-lg font-medium antialiased my-1 mt-3'>What's our Captain's name</div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder='First name'
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className='bg-[#eeeeee] border-slate-300 text-sm my-1 w-1/2 h-10 p-3 rounded '
                        />
                        <input
                            type="text"
                            placeholder='Last name'
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className='bg-[#eeeeee] border-slate-300 text-sm my-1 w-1/2 h-10 p-3 rounded '
                        />
                    </div>
                    <div className='text-lg font-medium antialiased my-1 mt-5'>What's our Captain's email</div>
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
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Sign in</button>
                </form>
                <p className='text-center'>Already have an account? <Link to='/captains/login' className='text-blue-600'>Login here</Link></p>
            </div>
            <p className='text-slate-600 text-[11px] my-5 mx-5 '>
                This site is protected by reCaptch and the <span className='underline'>Google Policy</span> <span>Terms of Service apply</span>.
            </p>
        </div>
    )
}

export default CaptainSignup