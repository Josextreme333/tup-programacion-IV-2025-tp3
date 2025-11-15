import React, { useEffect, useState } from 'react';
import { getAlumnos, createAlumno, updateAlumno, deleteAlumno } from '../api/alumnos';

export default function AlumnosList() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    const data = await getAlumnos();
    setAlumnos(data);
  };

  const handleAdd = async () => {
    if(!nombre) return;
    await createAlumno({ nombre });
    setNombre('');
    fetchAlumnos();
  };

  const handleDelete = async (id) => {
    await deleteAlumno(id);
    fetchAlumnos();
  };

  return (
    <div>
      <h2>Alumnos</h2>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <button onClick={handleAdd}>Agregar</button>
      <ul>
        {alumnos.map(a => (
          <li key={a.id}>
            {a.nombre} <button onClick={() => handleDelete(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
