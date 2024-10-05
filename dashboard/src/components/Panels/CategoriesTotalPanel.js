import React, { useState, useEffect } from 'react';

const CategoriesTotalPanel = () => {
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        console.log("Categorías obtenidas:", data);  // Verifica los datos en la consola
        setTotalCategories(data.count);  // Usa el campo 'count' de la API
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  return (
    <div>
      <h3>Total de Categorías</h3>
      <p>{totalCategories}</p>
    </div>
  );
};

export default CategoriesTotalPanel;
