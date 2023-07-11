const mongoose = require('mongoose');

const Slaider3 = mongoose.Schema({
    img3:{
        type: String,
    },
    
});

module.exports = mongoose.model('slaider3', Slaider3);