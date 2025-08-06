import { useWorokoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({ workout }) => {
    const { user } = useAuthContext()
    const { dispatch } = useWorokoutsContext()
    const apiUrl = process.env.REACT_APP_API_URL;
    `${apiUrl}/api/user/login`

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch(`${apiUrl}/api/workouts/` + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json }) // ie: workout from DB change the state using dispatch
        }

    }

    return (
        <div className="workout-card">
            <div className="workout-header">
                <h4 className="workout-title">{workout.title}</h4>
                <button className="delete-btn" onClick={handleClick} title="Delete workout">
                    ❌
                </button>
            </div>
            <div className="workout-time">
                {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
            </div>
            <div className="workout-stats">
                <div className="stat-item load">
                    <span className="stat-label">Load:</span>
                    <span className="stat-value">{workout.load} kg</span>
                </div>
                <div className="stat-item reps">
                    <span className="stat-label">Reps:</span>
                    <span className="stat-value">{workout.reps}</span>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetails
