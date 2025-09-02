import React, { useState } from 'react';

const RecordWorkout = () => {
    const [exerciseName, setExerciseName] = useState('');
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save the workout data
        const workoutData = {
            exerciseName,
            weight,
            repetitions,
            sets,
        };
        console.log('Workout recorded:', workoutData);
        // Clear the form
        setExerciseName('');
        setWeight('');
        setRepetitions('');
        setSets('');
    };

    return (
        <div className="record-workout">
            <h2>Record Your Workout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Exercise Name:</label>
                    <input
                        type="text"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Weight (lbs):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Repetitions:</label>
                    <input
                        type="number"
                        value={repetitions}
                        onChange={(e) => setRepetitions(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sets:</label>
                    <input
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Record Workout</button>
            </form>
        </div>
    );
};

export default RecordWorkout;