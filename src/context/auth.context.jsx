import cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, logoutRequest, registerRequest } from '../api/auth.api'
import { getFavsRequest } from '../api/favs.api'

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error("context is empty")
    return context
}

const authContextProvider = ({ children }) => {

    const [isLoged, setIsLoged] = useState(false)
    const [authErrors, setAuthErrors] = useState([])
    const [favoritesData, setFavoritesData] = useState([])

    const registerUser = async (data) => {
        try {
            const resp = await registerRequest(data)
            console.log(resp)
            setIsLoged(true)
            setAuthErrors([])
            localStorage.setItem("userData", JSON.stringify(resp.data))
            window.location.reload()

        }
        catch (err) {
            setAuthErrors(err.response.data)
            setIsLoged(false)
        }

    }
    const login = async (data) => {
        try {
            const resp = await loginRequest(data)
            console.log(resp.data)
            setAuthErrors([])
            localStorage.setItem("userData", JSON.stringify(resp.data))
            window.location.reload()

        } catch (err) {
            setAuthErrors(err.response.data)
        }
    }
    const logout = async () => {
        try {
            const resp = await logoutRequest()
            setIsLoged(false)
            window.location.reload()
            localStorage.clear("userData")
        } catch (err) {
            console.log(err)
        }
    }
    /* tomar favoritos */
    const favorites = async () => {
        try {
            const resp = await getFavsRequest()
            setFavoritesData(resp.data.favorites)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAuthErrors([])
            return clearTimeout(timer)
        }, 5000)
    }, [authErrors])

    useEffect(() => {
        const token = cookies.get("token")
        if (!token) setIsLoged(false)
        else {
            setIsLoged(true)
        }

    }, [isLoged])




    return <authContext.Provider value={{
        registerUser,
        isLoged,
        authErrors,
        logout,
        login,
        favorites,
        favoritesData
    }}>
        {children}
    </authContext.Provider>
}

export default authContextProvider