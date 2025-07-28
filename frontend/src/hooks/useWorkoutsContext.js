import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorokoutsContext = () => {
    const context = useContext(WorkoutsContext)
    if (!context) {
        throw Error('test')
    }
    return context
}