import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Secciones</h2>
      <ul>
        <li><Link to="/dashboard/last-created">Detalle del último producto o usuario</Link></li>
        <li><Link to="/dashboard/categories-products">Panel de categorías</Link></li>
        <li><Link to="/dashboard/products-list">Panel de listado de productos</Link></li>
        <li><Link to="/dashboard/users-list">Panel de listado de usuarios</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
