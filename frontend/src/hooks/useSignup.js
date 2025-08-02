import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setError(null)
        setisLoading(true)
        const response = await fetch('/api/user/signup', {
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
        }
    }
    return { signup, error, isLoading }

}