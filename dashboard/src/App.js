import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';  // Importa tu dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard es la página principal */}
        <Route path="/dashboard/*" element={<Dashboard />} />  
      </Routes>
    </Router>
  );
}

export default App;
