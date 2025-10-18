import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContextProvider';
import axios from 'axios';

// This is a fallback component
// If someone tries to visit /home without token
// redirect to login page
export const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const { user, setUser } = useContext(userContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/users/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data.user);
            setIsLoading(false);
        }).catch( e => {
            localStorage.removeItem('token');
            navigate('/users/login');
        })
    }, [token]);

    if(isLoading){
        return(
            <>IS loading .....</>
        )
    }

    return (
        <>
            {children}
        </>
    )
}
