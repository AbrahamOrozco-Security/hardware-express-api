const ProductoModel = require('../models/productos.model');

const productosController = {
    // GET /productos
    listar: (req, res) => {
        const productos = ProductoModel.leer();
        res.status(200).json(productos);
    },

    // POST /productos
    crear: (req, res) => {
        const { nombre, precio } = req.body;
        const productos = ProductoModel.leer();

        // Validación: Campos obligatorios y Tipos de datos
        if (!nombre || typeof nombre !== 'string' || precio === undefined || typeof precio !== 'number') {
            return res.status(400).json({ mensaje: "Nombre (string) y precio (number) son obligatorios" });
        }

        // Validación: Precios lógicos (> 0)
        if (precio <= 0) {
            return res.status(400).json({ mensaje: "El precio debe ser un valor positivo mayor a cero" });
        }

        // Validación: No Duplicados (Case insensitive)
        const duplicado = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
        if (duplicado) {
            return res.status(400).json({ mensaje: `El producto '${nombre}' ya existe en el inventario` });
        }

        const nuevoProducto = {
            id: ProductoModel.generarIdProximo(productos),
            nombre,
            precio
        };

        productos.push(nuevoProducto);
        ProductoModel.guardar(productos);
        res.status(201).json(nuevoProducto); // 201 Created
    },

    // DELETE /productos/:id
    eliminar: (req, res) => {
        const id = parseInt(req.params.id);
        let productos = ProductoModel.leer();
        
        const indice = productos.findIndex(p => p.id === id);
        
        if (indice === -1) {
            return res.status(404).json({ mensaje: "Producto no encontrado. El ID no existe" }); // 404 Not Found
        }

        productos.splice(indice, 1);
        ProductoModel.guardar(productos);
        res.status(204).send(); // 204 No Content
    }
};

module.exports = productosController;