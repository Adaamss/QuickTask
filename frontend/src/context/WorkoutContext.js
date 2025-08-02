import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext() // have the value that will be shared golabaly

// dipatch takes action as paramter dipatch(action) & action is {type,payload}
// the action is an object {type and payload} 

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': // this 
            return {
                workouts: action.payload // expcted to be an array caus eth api return and array
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts] // exptected to be 1 new workout cause the api's payload have 1 item to add + 
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
    // the dispatch function takes as paramter an object which have a type and a payload

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }} >
            {children}
        </WorkoutsContext.Provider>
    )
}

//{children} are the componenets passed as propos inside the workouts Context provider so all teh children access the teh variables
//inside the provider
