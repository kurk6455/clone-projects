import { createContext, useState } from "react";


export const captainContext = createContext();

const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: '',
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            type: ''
        }
    })

    return (
        <captainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </captainContext.Provider>
    )
}

export default CaptainContextProvider;