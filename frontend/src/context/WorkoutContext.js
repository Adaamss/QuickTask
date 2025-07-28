import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext() // have the value that will be shared golabaly

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload // expcted to be an array 
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts] // exptected to be 1 new workout
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }

        default:
            return state

    }
}


export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: null }) // change the state using the dispatch function and this is { workouts: null } teh intial value 

    // dispatch({ type: 'SET_WORKOUTS', payload:}) // when we call the dispatch fucntion n3atou lel workoutsReducer

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }} >
            {children}
        </WorkoutsContext.Provider>
    )
}

//{children} are the componenets passed as propos inside the workouts Context provider so all teh children access the teh variables
//inside the provider
