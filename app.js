const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//parrametros del servidor
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
require('./Passport/local-auth');

//middelwares
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret:'sesionSecreta',
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
    app.locals.signupMessage = req.flash('error-registro-correo');
    app.locals.signinMessage = req.flash('error-login-correo');
    res.locals.error = req.flash('contraseña-invalida');
    res.locals.error2 = req.flash('contraseña2-invalida');
    res.locals.CorreoExiste = req.flash('Ya-existe-correo');
    res.locals.CorreoVacio = req.flash('correo-vacio');
    res.locals.ContraseñaVacia = req.flash('contraseña-vacia');
    next();
});

//rutas de archivos
app.use(require('./routes/rutas'));

module.exports = app;