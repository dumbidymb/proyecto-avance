import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const verificarAutenticacion = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/verificar-autenticacion');

      if (response.ok) {
        const data = await response.json();
        if (!data.autenticado) {
          navigate('/');
        }
      } else {
        console.error('Error al verificar la autenticación:', response.statusText);
        navigate('/');
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    verificarAutenticacion();

    if (!usuarioAutenticado) {
      navigate.push('/');
    }

    const ws = new WebSocket('ws://localhost:3000');

    ws.addEventListener('open', () => {
      console.log('Conectado al servidor WebSocket');
    });

    ws.addEventListener('message', (event) => {
      console.log(`Mensaje del servidor: ${event.data}`);
    });

    ws.addEventListener('close', () => {
      console.log('Desconectado del servidor WebSocket');
    });

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [navigate]);

  return (
    <div>
      <h1>Página de Inicio</h1>
      <h2>holaaa</h2>
    </div>
  );
};

export default Home;
