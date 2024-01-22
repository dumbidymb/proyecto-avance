
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
  
      if (response.data.success) {
     
        navigate('/home');
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    } catch (error) { 
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión.');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Iniciar Sesión</button>
      </form>

   
      <p>No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </div>
  );
};

export default Login;
