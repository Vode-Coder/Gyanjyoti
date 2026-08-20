const PREFIX = 'Gyanjyoti:'

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // storage unavailable — fail silently for prototype purposes
  }
}

export function removeKey(key) {
  localStorage.removeItem(PREFIX + key)
}

export function clearSession() {
  removeKey('selectedRole')
  removeKey('loggedInUser')
}
