const mongoose = require('mongoose');

const Slaider2 = mongoose.Schema({
    img2:{
        type: String,
    },
    
});

module.exports = mongoose.model('slaider2', Slaider2);