import React, { useState, useEffect } from 'react';

const ProductsTotalPanel = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        console.log("Productos obtenidos:", data);  // Verifica que los datos estén llegando
        setTotalProducts(data.count);  // Usa el campo 'count' de la API
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <div>
      <h3>Total de Productos</h3>
      <p>{totalProducts}</p>
    </div>
  );
};

export default ProductsTotalPanel;
