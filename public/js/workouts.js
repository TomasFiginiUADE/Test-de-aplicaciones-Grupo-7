// This file manages the functionality for recording workouts. It includes functions to add workout entries and retrieve them from local storage.

const workoutsKey = 'workouts'

// Function to add a workout entry
function addWorkout(workout) {
  const workouts = getWorkouts()
  workouts.push(workout)
  localStorage.setItem(workoutsKey, JSON.stringify(workouts))
}

// Function to retrieve all workout entries
function getWorkouts() {
  const raw = localStorage.getItem(workoutsKey)
  try {
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.warn('Invalid workouts data, resetting.', err)
    localStorage.removeItem(workoutsKey)
    return []
  }
}

// Function to clear all workout entries (optional)
function clearWorkouts() {
  localStorage.removeItem(workoutsKey)
}

// Expose to global scope so other non-module scripts can call them
window.workouts = {
  addWorkout,
  getWorkouts,
  clearWorkouts,
}
