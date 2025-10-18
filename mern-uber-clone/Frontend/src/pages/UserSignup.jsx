import { useContext, useState } from 'react';
import uberLogo from '../assets/uberLogo.svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../../context/UserContextProvider';

const UserSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname, lastname
            },
            email,
            password
        }

        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
            const data = response.data;

            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }catch(e){
            console.log(e);
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='h-screen w-full flex flex-col justify-between'>
            <div className='px-5'>
                <img src={uberLogo} className='w-20' />
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className='text-lg font-medium antialiased my-1 mt-5'>What's your name</div>
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
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
                </form>
                <p className='text-center'>Already have an account? <Link to='/users/login' className='text-blue-600'>Login here</Link></p>
            </div>
            <p className='text-slate-600 text-[11px] my-5 mx-5 '>
                This site is protected by reCaptch and the <span className='underline'>Google Policy</span> <span>Terms of Service apply</span>.
            </p>
        </div>
    )
}

export default UserSignup