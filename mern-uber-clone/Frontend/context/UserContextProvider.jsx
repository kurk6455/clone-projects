import { createContext, useState } from "react";


export const userContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: ''
    })

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider;