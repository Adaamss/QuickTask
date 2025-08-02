import { createContext, useReducer } from "react";
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
    console.log("auth context", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )


}





