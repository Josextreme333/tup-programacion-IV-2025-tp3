import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({ nombre, email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/alumnos'); // redirige a la página principal de alumnos
    } else {
      setError(res.msg || 'Error de registro');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
