const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos.routes');

// Middleware para que el servidor entienda archivos JSON en las peticiones (POST/PUT)
app.use(express.json());

// Vinculamos las rutas. Todos los endpoints empezarán con /productos
app.use('/productos', productosRoutes);

// Puerto donde correrá tu API
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Hardware Express API corriendo en http://localhost:${PORT}`);
    console.log(`✅ Persistencia activada en inventario.json`);
});