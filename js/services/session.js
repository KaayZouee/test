const KEY = 'nousys_session_id';

export function getSessionId() {
  let id = sessionStorage.getItem(KEY);

  if (!id) {
    // Prefer crypto.randomUUID when available
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      id = crypto.randomUUID();
    } else {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    }
    sessionStorage.setItem(KEY, id);
  }

  return id;
}
