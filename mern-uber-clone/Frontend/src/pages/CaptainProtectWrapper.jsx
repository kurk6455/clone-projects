import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { captainContext } from './CaptainContextProvider';
import axios from 'axios';

export const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const {captain, setCaptain} = useContext(captainContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        if (!token) {
            navigate('/captains/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then( (response) => {
            setCaptain(response.data.captain);
            setIsLoading(false);
        }).catch( e => {
            localStorage.removeItem('token');
            navigate('/captains/login');
        })
    }, [token])

    if(isLoading){
        return(
            <>Is loading ...</>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}