import React, { useEffect, useState } from 'react';

const UsersListPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        console.log("Usuarios obtenidos:", data);
        setUsers(data.users);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
        setError('Hubo un problema al obtener los usuarios');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="panel">
      <h3>Listado de Usuarios</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ubicación</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Invalid Date'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersListPanel;
