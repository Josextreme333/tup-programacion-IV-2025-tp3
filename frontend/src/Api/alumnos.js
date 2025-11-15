const BASE = 'http://localhost:3001/api';

export async function getAlumnos() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}/alumnos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function createAlumno(data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}/alumnos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateAlumno(id, data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}/alumnos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteAlumno(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}/alumnos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}
