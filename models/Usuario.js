const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    correo:String,
    contraseña:String,
    rol:String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

//encriptado del registro

userSchema.methods.encryptPassword = (contraseña) => {
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10));
};

//comparando las contraseñas encriptadas

userSchema.methods.comparePassword = function (contraseña) {
    return bcrypt.compareSync(contraseña, this.contraseña);
};

module.exports = mongoose.model('users',userSchema);