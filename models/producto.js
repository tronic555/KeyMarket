const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductoSchema = new mongoose.Schema({

    favoritos:{
       type: String
    },
    licencia:{
        type: String,
        requiered:true
    },
    producto:{
        type: String,
        required:true
    },
    precio:{
        type: Number,
        required:true
    },
    url:{
        type: String,
        required:true
    },
    descripcion:{
        type: String
    }

},{
    timestamps:true
});

ProductoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('productos',ProductoSchema);


