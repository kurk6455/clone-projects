import { useContext, useState } from 'react';
import uberDriverLogo from '../assets/uberDriverLogo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { captainContext } from './CaptainContextProvider';
import axios from 'axios';

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const { captain, setCaptain } = useContext(captainContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname, lastname
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: Number(vehicleCapacity),
                vehicleType: vehicleType
            }
        }

        console.log(newCaptain);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        } catch (e) {
            console.log(e);
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity(1);
        setVehicleType('');
    }

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
                    <div className='text-lg font-medium antialiased my-1 mt-3'>What's our Captain's email</div>
                    <input
                        type="email"
                        placeholder='example@gmail.com'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] border-slate-300 text-sm my-1 mb-5 w-full h-10 p-3 rounded '
                    />
                    <div className='text-lg font-medium antialiased'>Enter Password</div>
                    <input
                        type="password"
                        placeholder='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] border-slate-300 text-sm my-1 mb-5 w-full h-10 p-3 rounded '
                    />
                    <div className='text-lg font-medium antialiased my-1'>Captain's vehicle details</div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder='vehicle color'
                            required
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className='bg-[#eeeeee] border-slate-300 text-sm my-1 w-1/2 h-10 p-3 rounded '
                        />
                        <input
                            type="text"
                            placeholder='vehicle plate'
                            required
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            className='bg-[#eeeeee] border-slate-300 text-sm my-1 w-1/2 h-10 p-3 rounded '
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder='vehicle capacity'
                            required
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            className='bg-[#eeeeee] border-slate-300 text-sm my-1 w-1/2 h-10 p-3 rounded '
                        />
                        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} 
                            className='bg-[#eeeeee] border-slate-300 text-sm my-1 w-1/2 h-10 p-3 rounded '>
                            <option value="motorcycle">MotorCycle</option>
                            <option value="auto">Auto</option>
                            <option value="car">Car</option>
                        </select>
                    </div>
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 mt-8 w-full text-lg placeholder:text-base'>Sign in</button>
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