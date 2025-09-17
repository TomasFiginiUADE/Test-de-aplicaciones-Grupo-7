// Utilidades simples para localStorage
const STORAGE_KEYS = {
  SETTINGS: 'stwp_settings_v1',
  WORKOUTS: 'stwp_workouts_v1',
  ROUTINES: 'stwp_routines_v1',
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
}
function loadSettings() {
  const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS)
  try {
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.warn(e)
    localStorage.removeItem(STORAGE_KEYS.SETTINGS)
    return null
  }
}

function saveWorkout(entry) {
  const list = loadWorkouts()
  list.unshift(entry)
  localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(list))
}
function loadWorkouts() {
  const raw = localStorage.getItem(STORAGE_KEYS.WORKOUTS)
  try {
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.warn(e)
    localStorage.removeItem(STORAGE_KEYS.WORKOUTS)
    return []
  }
}
function clearWorkouts() {
  localStorage.removeItem(STORAGE_KEYS.WORKOUTS)
}

// Routines API
function saveRoutine(routine) {
  const list = loadRoutines()
  list.unshift(routine)
  localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(list))
}
function loadRoutines() {
  const raw = localStorage.getItem(STORAGE_KEYS.ROUTINES)
  try {
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.warn(e)
    localStorage.removeItem(STORAGE_KEYS.ROUTINES)
    return []
  }
}
function clearRoutines() {
  localStorage.removeItem(STORAGE_KEYS.ROUTINES)
}

// expose global API
window.storageAPI = {
  saveSettings,
  loadSettings,
  saveWorkout,
  loadWorkouts,
  clearWorkouts,
  saveRoutine,
  loadRoutines,
  clearRoutines,
}
// backward compat
window.saveSettings = saveSettings
window.loadSettings = loadSettings
window.saveWorkout = saveWorkout
window.loadWorkouts = loadWorkouts
window.clearWorkouts = clearWorkouts
window.saveRoutine = saveRoutine
window.loadRoutines = loadRoutines
window.clearRoutines = clearRoutines
