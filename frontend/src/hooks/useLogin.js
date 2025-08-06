import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    // const { dispatch } = AuthContext wrong to know hwy
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    const [succes, setSucces] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL;


    const login = async (email, password) => {
        setError(null)
        setisLoading(true)
        const response = await fetch(`${apiUrl}/api/user/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email, password }) // we can't send it as an object we have to change to json
        })
        const json = await response.json()
        if (!response.ok) {
            setisLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //save teh user that we got to teh local storage
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'login', payload: json })
            setisLoading(false)
            setSucces(true)
        }
    }
    return { login, error, isLoading, succes }


}