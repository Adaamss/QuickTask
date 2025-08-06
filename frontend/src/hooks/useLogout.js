import { useAuthContext } from "./useAuthContext"
import { useWorokoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorokoutsContext()
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')
        //dispatch logotu action
        dispatch({ type: 'logout' })
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout }

}