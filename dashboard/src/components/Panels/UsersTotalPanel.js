import React, { useState, useEffect } from 'react';

const UsersTotalPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        console.log("Usuarios obtenidos:", data);  // Verifica los datos en la consola
        setTotalUsers(data.count);  // Usa el campo 'count' de la API
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  return (
    <div>
      <h3>Total de Usuarios</h3>
      <p>{totalUsers}</p>
    </div>
  );
};

export default UsersTotalPanel;
