// Main JavaScript entry point for the simple training webpage
const EQUIPMENT = [
  'Mancuernas',
  'Barra',
  'Banco',
  'Barra fija',
  'Kettlebell',
  'Polea',
]
const MUSCLES = [
  'Espalda',
  'Pecho',
  'Triceps',
  'Biceps',
  'Hombros',
  'Piernas',
  'Abdominales',
]

document.addEventListener('DOMContentLoaded', () => {
  renderEquipmentOptions()
  renderMuscleOptions()
  loadAndApplySettings()
  renderSettingsSummary()
  renderRoutines()
  ensureOneExerciseRow()

  // al guardar la configuración: sobrescribe en localStorage, resetea el formulario (deselecciona campos)
  const settingsForm = document.getElementById('settings-form')
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const experience =
      document.querySelector('input[name="experience"]:checked')?.value || null
    const equipment = Array.from(
      document.querySelectorAll('input[name="equipment"]:checked')
    ).map((el) => el.value)
    // guardar (sobrescribe)
    saveSettings({ experience, equipment, updatedAt: Date.now() })
    // deseleccionar campos y limpiar el formulario visualmente
    settingsForm.reset()
    // actualizar resumen inferior con la nueva configuración guardada
    renderSettingsSummary()
    showStatus(
      'settings-status',
      'Configuración guardada localmente',
      'success'
    )
  })
  document.getElementById('add-exercise').addEventListener('click', () => {
    appendExerciseRow()
  })

  document.getElementById('routine-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('routine-name').value.trim()
    if (!name) {
      showStatus('routine-status', 'Ingrese nombre de rutina', 'error')
      return
    }
    const muscles = Array.from(
      document.querySelectorAll('input[name="muscle"]:checked')
    ).map((i) => i.value)
    const exerciseRows = Array.from(document.querySelectorAll('.exercise-row'))
    const exercises = exerciseRows
      .map((row) => {
        return {
          name: row.querySelector('.ex-name').value.trim(),
          weight: parseFloat(row.querySelector('.ex-weight').value) || 0,
          reps: parseInt(row.querySelector('.ex-reps').value, 10) || 0,
          sets: parseInt(row.querySelector('.ex-sets').value, 10) || 0,
        }
      })
      .filter((e) => e.name && e.reps > 0 && e.sets > 0)

    if (!exercises.length) {
      showStatus(
        'routine-status',
        'Añade al menos un ejercicio válido',
        'error'
      )
      return
    }

    const routine = {
      id: Date.now(),
      name,
      muscles,
      exercises,
      createdAt: Date.now(),
    }
    saveRoutine(routine)
    renderRoutines()
    document.getElementById('routine-form').reset()
    // limpiar ejercicios y dejar 1 por defecto
    document.getElementById('exercises-list').innerHTML = ''
    ensureOneExerciseRow()
    showStatus('routine-status', 'Rutina guardada localmente', 'success')
  })

  document.getElementById('clear-routines').addEventListener('click', () => {
    if (!confirm('Borrar todas las rutinas?')) return
    clearRoutines()
    renderRoutines()
    showStatus('routine-status', 'Rutinas borradas', 'success')
  })
})

function renderEquipmentOptions() {
  const root = document.getElementById('equipment-options')
  root.innerHTML = ''
  EQUIPMENT.forEach((item, idx) => {
    const id = 'eq-' + idx + '-' + item.replace(/\s+/g, '').toLowerCase()
    const wrapper = document.createElement('div')

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = id
    input.name = 'equipment'
    input.value = item

    const label = document.createElement('label')
    label.htmlFor = id
    label.textContent = item

    wrapper.appendChild(input)
    wrapper.appendChild(label)
    root.appendChild(wrapper)
  })
}

function renderMuscleOptions() {
  const root = document.getElementById('muscle-groups')
  root.innerHTML = ''
  MUSCLES.forEach((m, i) => {
    const id = 'mus-' + i + '-' + m.toLowerCase()
    const wrapper = document.createElement('div')

    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = id
    input.name = 'muscle'
    input.value = m

    const label = document.createElement('label')
    label.htmlFor = id
    label.textContent = m

    wrapper.appendChild(input)
    wrapper.appendChild(label)
    root.appendChild(wrapper)
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

function renderSettingsSummary() {
  const s = loadSettings()
  document.getElementById('summary-experience').textContent =
    s?.experience ?? '—'
  document.getElementById('summary-equipment').textContent =
    s?.equipment && s.equipment.length ? s.equipment.join(', ') : '—'
}

/* Routines render / exercises dynamic */
function appendExerciseRow(data = {}) {
  const container = document.getElementById('exercises-list')
  const idx = container.children.length
  const row = document.createElement('div')
  row.className = 'exercise-row'
  row.style = 'display:flex;gap:8px;align-items:center;margin-bottom:8px'

  row.innerHTML = `
    <input class="ex-name" type="text" placeholder="Nombre ejercicio" value="${escapeHtmlAttr(
      data.name || ''
    )}" required style="flex:2;padding:6px;border-radius:6px;border:1px solid #e5e7eb">
    <input class="ex-weight" type="number" min="0" step="0.5" placeholder="Peso kg" value="${
      data.weight ?? 0
    }" style="width:90px;padding:6px;border-radius:6px;border:1px solid #e5e7eb">
    <input class="ex-reps" type="number" min="1" placeholder="Reps" value="${
      data.reps ?? 8
    }" style="width:80px;padding:6px;border-radius:6px;border:1px solid #e5e7eb">
    <input class="ex-sets" type="number" min="1" placeholder="Series" value="${
      data.sets ?? 3
    }" style="width:80px;padding:6px;border-radius:6px;border:1px solid #e5e7eb">
    <button type="button" class="remove-ex" title="Eliminar ejercicio" style="background:#ef4444;padding:6px 8px;border-radius:6px;color:white;border:none">X</button>
  `
  container.appendChild(row)

  row.querySelector('.remove-ex').addEventListener('click', () => {
    row.remove()
    // asegurar al menos una fila
    ensureOneExerciseRow()
  })
}

function ensureOneExerciseRow() {
  const container = document.getElementById('exercises-list')
  if (container.children.length === 0) appendExerciseRow()
}

function renderRoutines() {
  const list = loadRoutines()
  const container = document.getElementById('routines-list')
  container.innerHTML = ''
  if (!list.length) {
    container.innerHTML = '<div class="small">No hay rutinas aún.</div>'
    return
  }
  list.forEach((r) => {
    const div = document.createElement('div')
    div.className = 'workout-item'
    const muscles =
      r.muscles && r.muscles.length ? ` — ${r.muscles.join(', ')}` : ''
    div.innerHTML = `<strong>${escapeHtml(
      r.name
    )}</strong><div class="small">Creada: ${new Date(
      r.createdAt
    ).toLocaleString()}${muscles}</div>`
    const exList = document.createElement('div')
    exList.style = 'margin-top:8px'
    r.exercises.forEach((ex) => {
      const exDiv = document.createElement('div')
      exDiv.className = 'small'
      exDiv.textContent = `${ex.name} · Peso: ${ex.weight} kg · Reps: ${ex.reps} · Series: ${ex.sets}`
      exList.appendChild(exDiv)
    })
    // optional: add delete button per routine
    const actions = document.createElement('div')
    actions.style = 'margin-top:8px'
    const del = document.createElement('button')
    del.textContent = 'Eliminar'
    del.style =
      'background:#ef4444;color:white;border:none;padding:6px 8px;border-radius:6px;cursor:pointer'
    del.addEventListener('click', () => {
      if (!confirm('Eliminar esta rutina?')) return
      const remaining = loadRoutines().filter((rr) => rr.id !== r.id)
      localStorage.setItem('stwp_routines_v1', JSON.stringify(remaining))
      renderRoutines()
      showStatus('routine-status', 'Rutina eliminada', 'success')
    })
    actions.appendChild(del)

    div.appendChild(exList)
    div.appendChild(actions)
    container.appendChild(div)
  })
}

/* Helpers */
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
  )
}
function escapeHtmlAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;')
}

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
