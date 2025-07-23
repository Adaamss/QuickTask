import { useEffect, useState } from "react"
const Home = () => {
    const [workouts, setWorkouts] = useState(null)
    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts/')
            const json = await response.json()
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
                    <div key={workout._id}>
                        <p>{workout.title}</p>
                        <p>{workout.load}</p>
                        <p>{workout.reps}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home