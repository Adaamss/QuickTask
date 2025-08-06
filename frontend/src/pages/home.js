import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutsDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorokoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const { user } = useAuthContext()
    const { workouts, dispatch } = useWorokoutsContext()
    const apiUrl = process.env.REACT_APP_API_URL;

    // const [workouts, setWorkouts] = useState(null)
    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(`${apiUrl}/api/workouts/`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }) // by default it's GET so we don't do shit leave it to beaver
            const json = await response.json()
            if (response.ok) {
                console.log('Setting workouts state with:', json);
                dispatch({ type: 'SET_WORKOUTS', payload: json })
                // setWorkouts(json)
            }
        }
        if (user) {
            fetchWorkout()
        }
    }, [dispatch, user]) //bug fix workouts changes every re-render[workouts]when workouts changes use effects triggers =>  workouts changes over and over with new data => triggering +oo 
    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">Your Workouts</h1>
                <p className="home-subtitle">Track your fitness journey</p>
            </div>
            <div className="home">
                <div className="workouts-grid">
                    {workouts && workouts.length > 0 ? (
                        workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        ))
                    ) : (
                        <div className="no-workouts">
                            <div className="no-workouts-icon">💪</div>
                            <h3>No workouts yet</h3>
                            <p>Add your first workout to get started!</p>
                        </div>
                    )}
                </div>
                <div className="form-sidebar">
                    <WorkoutForm />
                </div>
            </div>
        </div>
    )
}

//I will be creating a from in which I will take the info from the request sent by the client me instead of postman


export default Home
