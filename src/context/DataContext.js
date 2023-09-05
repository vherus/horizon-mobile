import { createContext, useEffect, useState } from 'react'
import { getBalance, getChars, getDeliveries, getProfile, postLogin } from '../utils/apiClient'

const DataContext = createContext()

const DataProvider = ({ children }) => {
    const [chars, setChars] = useState({})
    const [token, setToken] = useState(null)
    const [profile, setProfile] = useState({})
    const [isRefreshing, setIsRefreshing] = useState(false)

    const refreshChars = () => {
        setIsRefreshing(() => {
            setChars(() => {
                getChars().then(data => {
                    setChars(() => {
                        setIsRefreshing(false)
                        return data
                    })
                })
                return {
                    chars: [
                        { charname: 1 },{ charname: 2 },{ charname: 3 },{ charname: 4 },
                    ]
                }
            })

            return true
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

    const getGilBalance = (charname) => {
        return getBalance(token, charname)
    }

    const getDeliveryBox = (charname) => {
        return getDeliveries(token, charname)
    }

    useEffect(() => {
        refreshChars()
    }, [])

    const value = {
        chars,
        token,
        profile,
        isRefreshing,
        refreshChars,
        handleLogin,
        handleLogout,
        getBalance: getGilBalance,
        getDeliveryBox
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export {
    DataContext,
    DataProvider
}