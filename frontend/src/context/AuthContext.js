import { createContext, useReducer } from "react";
import { useEffect } from "react";
//track userState logged in or not and show it to the whole app that's why we create a context 
export const AuthContext = createContext()

export const AuthReducer = (state, action) => { //login and logout
    switch (action.type) {
        case 'login':
            return {
                user: action.payload
            }
        case 'logout':
            return {
                user: null
            }
        default:
            return state;
    }

}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, { user: null })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({ type: 'login', payload: user })
        }
    }, []);

    // const token = JSON.parse(localStorage.getItem('user'))?.token;
    // if (token) {
    //     state = user
    //     // state will have user with token
    // }
    // console.log("auth context haha", state)


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )


}





