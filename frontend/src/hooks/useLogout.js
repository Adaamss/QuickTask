import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        //dispatch logotu action
        dispatch({ type: 'logout' })
    }
    return { logout }

}