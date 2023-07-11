const mongoose = require('mongoose');

const Slaider1 = mongoose.Schema({
    img1:{
        type: String,
    },
    
});

module.exports = mongoose.model('slaider1', Slaider1);