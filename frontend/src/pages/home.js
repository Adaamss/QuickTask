import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutsDetails"
import WorkoutForm from "../components/WorkoutForm"
const Home = () => {
    const [workouts, setWorkouts] = useState(null)
    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/') // by default it's GET so we don't do shit leave it to beaver
            const json = await response.json()
            console.log("this is teh resp", response)
            console.log(json)
            if (response.ok) {
                setWorkouts(json)
            }
        }
        fetchWorkout()
    }, [])
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