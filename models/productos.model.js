const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../inventario.json');

const ProductoModel = {
    // Lee el archivo JSON
    leer: () => {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, retornamos array vacío
            return [];
        }
    },

    // Escribe en el archivo JSON
    guardar: (productos) => {
        fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
    },

    // Garantiza ID único y permanente (incluso si se borran otros)
    generarIdProximo: (productos) => {
        if (productos.length === 0) return 1;
        const maxId = Math.max(...productos.map(p => p.id));
        return maxId + 1;
    }
};

module.exports = ProductoModel;