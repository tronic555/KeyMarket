const  passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/Usuario');

//serializacion de la session

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser(async(id, done) => {
   const user = await User.findById(id);
   done(null,user)
});

//registro de usuarios 

passport.use('local-registro', new localStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña',
    passReqToCallback: true
},async (req, correo, contraseña, done) =>{

    const usuario = await User.findOne({correo:correo});

    if(usuario){
        return done(null,false,req.flash('error-registro-correo','El correo esta en uso, porfavor use otro'));
    } else {

        const nuevoUser = new User();
        nuevoUser.correo = correo;
        nuevoUser.contraseña = nuevoUser.encryptPassword(contraseña);
        await nuevoUser.save();
        done(null, nuevoUser);
    };
})); 

passport.use('local-login', new localStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, correo, contraseña, done) => {

   const usuario =  await User.findOne({correo:correo});

   if(!usuario){
    return done(null,false,req.flash('error-login-correo','Error: los campos no son validos'));
   };

   if(!usuario.comparePassword(contraseña)){
     return done(null,false,req.flash('error-login-correo','Error: los campos no son validos'))
   }

   done(null,usuario)
}));