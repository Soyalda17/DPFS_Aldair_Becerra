import React from 'react';
import ProductsTotalPanel from './components/Panels/ProductsTotalPanel';
import UsersTotalPanel from './components/Panels/UsersTotalPanel';
import CategoriesTotalPanel from './components/Panels/CategoriesTotalPanel';
import ProductsListPanel from './components/Panels/ProductsListPanel';
import UsersListPanel from './components/Panels/UsersListPanel';
import CategoriesProductCountPanel from './components/Panels/CategoriesProductCountPanel';
import LastUserProductPanel from './components/Panels/LastUserProductPanel';
import './Dashboard.css';  // Importa el CSS

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="main-content">
        {/* Paneles Totales */}
        <div className="totals-section">
          <UsersTotalPanel />
          <ProductsTotalPanel />
          <CategoriesTotalPanel />
        </div>

        {/* Paneles de Listas */}
        <div className="panel-grid">
          <LastUserProductPanel />
          <CategoriesProductCountPanel />
          <ProductsListPanel />
          <UsersListPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
