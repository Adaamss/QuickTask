import { useState } from "react"
import { useWorokoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    // we need states to catch the input from the client AKA variables title reps load
    const { dispatch } = useWorokoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { title, load, reps } // we will be sing the fetch to POST
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), // we can't send it as an object we have to change to json
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setSuccess(true)
            console.log('new workout Added', json)
            dispatch({ type: 'CREATE_WORKOUTS', payload: json })
        }
    }



    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Exercice title</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}

            />
            <label>Exercice Load in KG </label>
            <input type="text"
                onChange={(e) => setLoad(e.target.value)}
                value={load}

            />
            <label>Exercice reps</label>
            <input type="text"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button>Add the workout</button>
            {error ? <div className="error"> {error}</div> : success && <div className="succces">Workout added succsefully</div>}
        </form>

    )
}

export default WorkoutForm

