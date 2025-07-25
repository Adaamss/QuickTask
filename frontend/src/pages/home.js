import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutsDetails"
import WorkoutForm from "../components/WorkoutForm"
const Home = () => {
    const [workouts, setWorkouts] = useState(null)
    useEffect(() => {
        console.log('useEffect triggered. Current workouts:', workouts);

        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/') // by default it's GET so we don't do shit leave it to beaver
            const json = await response.json()
            if (response.ok) {
                console.log('Setting workouts state with:', json);
                setWorkouts(json)
            }
        }
        fetchWorkout()
    }, []) //bug fix workouts changes every re-render[workouts]when workouts changes use effects triggers =>  workouts changes over and over with new data => triggering +oo 
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} /> // nefhemha l faza hedhi 
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}
//I will be creating a from in which I will take the info from the request sent by the client me instead of postman


export default Home