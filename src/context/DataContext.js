import { createContext, useEffect, useState } from "react";
import { getChars, getProfile, postLogin } from "../utils/apiClient";

const DataContext = createContext()

const DataProvider = ({ children }) => {
    const [chars, setChars] = useState({})
    const [token, setToken] = useState(null)
    const [profile, setProfile] = useState({})
    console.log('token:', token)
    console.log(profile)

    const refreshChars = () => {
        setChars(() => {
            getChars().then(setChars)
            return {}
        })
    }

    const handleLogin = (username, password) => {
        postLogin(username, password)
            .then((jwt) => {
                setToken(() => {
                    getProfile(jwt).then((res) => setProfile(res.profile))
                    return jwt
                })
            })
    }

    const handleLogout = () => {
        setToken(null)
        setProfile({})
    }

    useEffect(() => {
        refreshChars()
    }, [])

    const value = {
        chars,
        token,
        profile,
        refreshChars,
        handleLogin,
        handleLogout
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export {
    DataContext,
    DataProvider
}