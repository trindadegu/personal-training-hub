async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP error! status: ${res.status}`)
  }
  return res.json()
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  const res = await apiFetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ type: 'admin', username, password })
  })
  return res.ok;
}

export async function logoutAdmin(): Promise<void> {
  await apiFetch('/api/auth?type=admin', { method: 'DELETE' })
}

/** Returns the editable admin fields (no password). Admin-only. */
export async function getAdminConfig(): Promise<{ username: string; whatsapp: string | null } | null> {
  // Poderíamos criar uma rota /api/admin/config, mas por enquanto vamos simular
  return apiFetch('/api/auth').then(data => data.admin ? { username: data.admin, whatsapp: '' } : null)
}

export async function updateAdminConfig(params: {
  username: string;
  password?: string;
  whatsapp: string;
}): Promise<void> {
  // Implementar se necessário em uma rota PUT /api/admin/config
}

/** Public helper for the student "forgot password" link. */
export async function getAdminWhatsapp(): Promise<string | null> {
  // Implementar rota pública se necessário
  return null
}

export async function loginStudent(id: string, password: string) {
  const res = await apiFetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ type: 'student', id, password })
  })
  return res.user;
}

/** Server-verified currently signed-in student (from httpOnly cookie). */
export async function getStudentMe(): Promise<{ id: string; nome: string } | null> {
  const data = await apiFetch('/api/auth')
  return data.student;
}

export async function logoutStudent(): Promise<void> {
  await apiFetch('/api/auth?type=student', { method: 'DELETE' })
}
