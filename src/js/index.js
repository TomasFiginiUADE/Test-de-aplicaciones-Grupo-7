// Main JavaScript entry point for the simple training webpage
const EQUIPMENT = [
  'Mancuernas',
  'Barra',
  'Banco',
  'Barra fija',
  'Kettlebell',
  'Polea',
]

document.addEventListener('DOMContentLoaded', () => {
  renderEquipmentOptions()
  loadAndApplySettings()
  renderWorkouts()

  // Usar submit del formulario para respetar comportamiento "submit"
  document.getElementById('settings-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const experience =
      document.querySelector('input[name="experience"]:checked')?.value || null
    const equipment = Array.from(
      document.querySelectorAll('input[name="equipment"]:checked')
    ).map((el) => el.value)
    saveSettings({ experience, equipment, updatedAt: Date.now() })
    showStatus(
      'settings-status',
      'Configuración guardada localmente',
      'success'
    )
  })

  document.getElementById('workout-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('exercise-name').value.trim()
    const weight = parseFloat(document.getElementById('weight').value) || 0
    const reps = parseInt(document.getElementById('reps').value, 10) || 0
    const sets = parseInt(document.getElementById('sets').value, 10) || 0
    if (!name || reps <= 0 || sets <= 0) {
      showStatus(
        'workout-status',
        'Complete ejercicio, repeticiones y series',
        'error'
      )
      return
    }

    const entry = {
      id: Date.now(),
      name,
      weight,
      reps,
      sets,
      createdAt: Date.now(),
    }
    saveWorkout(entry)
    renderWorkouts()
    document.getElementById('workout-form').reset()
    // opcional: dejar valores por defecto para algunos campos
    document.getElementById('weight').value = 0
    document.getElementById('reps').value = 8
    document.getElementById('sets').value = 3
    showStatus('workout-status', 'Registro guardado localmente', 'success')
  })

  document.getElementById('clear-workouts').addEventListener('click', () => {
    if (confirm('Borrar todo el historial de entrenamientos?')) {
      clearWorkouts()
      renderWorkouts()
      showStatus('workout-status', 'Historial borrado', 'success')
    }
  })
})

function renderEquipmentOptions() {
  const root = document.getElementById('equipment-options')
  root.innerHTML = ''
  EQUIPMENT.forEach((item) => {
    const id = 'eq-' + item.replace(/\s+/g, '').toLowerCase()
    const label = document.createElement('label')
    label.innerHTML = `<input type="checkbox" id="${id}" name="equipment" value="${item}"> ${item}`
    root.appendChild(label)
  })
}

function loadAndApplySettings() {
  const settings = loadSettings()
  if (!settings) return
  if (settings.experience) {
    const el = document.querySelector(
      `input[name="experience"][value="${settings.experience}"]`
    )
    if (el) el.checked = true
  }
  if (Array.isArray(settings.equipment)) {
    settings.equipment.forEach((eq) => {
      const el = Array.from(
        document.querySelectorAll('input[name="equipment"]')
      ).find((i) => i.value === eq)
      if (el) el.checked = true
    })
  }
}

function renderWorkouts() {
  const list = loadWorkouts()
  const container = document.getElementById('workouts-list')
  container.innerHTML = ''
  if (!list.length) {
    container.innerHTML = '<div class="small">No hay registros aún.</div>'
    return
  }
  list.forEach((w) => {
    const div = document.createElement('div')
    div.className = 'workout-item'
    div.innerHTML = `<strong>${escapeHtml(w.name)}</strong>
      <div class="small">Peso: ${w.weight} kg · Reps: ${w.reps} · Series: ${
      w.sets
    }</div>`
    container.appendChild(div)
  })
}

// pequeño helper
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
  )
}

// Mostrar indicador en elemento status (id) con tipo 'success'|'error'
function showStatus(id, message, type = 'success', duration = 2200) {
  const el = document.getElementById(id)
  if (!el) return
  el.textContent = message
  el.classList.remove('success', 'error')
  el.classList.add(type, 'show')
  clearTimeout(el._hideTimeout)
  el._hideTimeout = setTimeout(() => {
    el.classList.remove('show')
  }, duration)
}
