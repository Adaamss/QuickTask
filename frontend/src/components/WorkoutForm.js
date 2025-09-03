import { useState } from "react"
import { useWorokoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    // we need states to catch the input from the client AKA variables title reps load
    const { dispatch } = useWorokoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()
    const apiUrl = process.env.REACT_APP_API_URL;



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('you must be logged in')
            return
        }
        const workout = { title, load, reps } // we will be sing the fetch to POST
        const response = await fetch(`${apiUrl}/api/workouts/`, {
            method: 'POST',
            body: JSON.stringify(workout), // we can't send it as an object we have to change to json
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }
        )
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('') // this could be chnaged to form state setting
            setError(null)
            setSuccess(true)
            setEmptyFields([])
            console.log('new workout Added', json)
            dispatch({ type: 'CREATE_WORKOUTS', payload: json })
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 5000)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="form-header">
                <h3>Add New Workout</h3>
                <p className="form-subtitle">Track your exercise progress</p>
            </div>

            <div className="input-group">
                <label className="input-label">Exercise Title</label>
                <input
                    type="text"
                    className={`modern-input ${emptyFields.includes('title') ? 'error' : ''}`}
                    placeholder="e.g., Bench Press"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>

            <div className="input-group">
                <label className="input-label">Load (kg)</label>
                <input
                    type="number"
                    className={`modern-input ${emptyFields.includes('load') ? 'error' : ''}`}
                    placeholder="e.g., 80"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                />
            </div>

            <div className="input-group">
                <label className="input-label">Repetitions</label>
                <input
                    type="number"
                    className={`modern-input ${emptyFields.includes('reps') ? 'error' : ''}`}
                    placeholder="e.g., 10"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                />
            </div>

            <button type="submit">
                Add Workout
            </button>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Workout added successfully!</div>}
        </form>

    )
}

export default WorkoutForm
