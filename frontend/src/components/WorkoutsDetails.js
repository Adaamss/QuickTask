const WorkoutDetails = ({ workout }) => {
    return (
        <div className="test">
            <h4>{workout.title}</h4>
            <p><strong> Load 'kg': </strong>{workout.load}</p>
            <p><strong> Reps </strong>{workout.Reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    )
}

export default WorkoutDetails 