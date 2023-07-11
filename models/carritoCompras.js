const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
    usuarioId:{
        type: String
    },
    precio:{
        type: Number
    },
    img:{
        type: String
    },
    titulo:{
        type: String
    }
});

module.exports = mongoose.model('carrito',CarritoSchema);

