import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// This is a fallback component
// If someone tries to visit /home without token
// redirect to login page
export const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/users/login');
        }
    }, [token]);

    return (
        <>
            {children}
        </>
    )
}
