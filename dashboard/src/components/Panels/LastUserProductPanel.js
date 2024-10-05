import React, { useState, useEffect } from 'react';

const LastUserProductPanel = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/lastCreated/last')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data.data);  // Accede a los datos del producto
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching last product:', error);
        setError('Hubo un problema al obtener el último producto');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="panel">
      <h3>Último Producto Creado</h3>
      {product ? (
        <div>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Nombre:</strong> {product.name}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> {product.price}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No se encontró ningún producto creado.</p>
      )}
    </div>
  );
};

export default LastUserProductPanel;
