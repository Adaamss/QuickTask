import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => { /// hne l user
    const context = useContext(AuthContext)
    if (!context) {
        throw Error('useAuthContext must be used inside a userConextProvider"')
    }
    return context
}