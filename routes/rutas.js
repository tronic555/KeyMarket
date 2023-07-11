const { Router } = require("express");
const passport  = require('passport');
const router = Router();
const {Index, admin, Software, Servicios, GiftCards, juegos, producto, EnviarProducto, listaProductos, listaProductosEliminar, listaProductosEditar , listaActualizar, registro, login, UsurioAutorizado, PermisoAdmin, NoPuedeEstarAutenticado, Logout, ActualizarCorreo, ActualizarContraseña, perfil, EnviarImg1, EliminarImg1,EnviarImg2,EliminarImg2,EnviarImg3,EliminarImg3, carrusel, CrearOrden, CapturarOrden, CancelarOrden, carrito, carritoNoValido, GuardarCarrito, Pago, BorrarProductoCarrito} = require('../controller/index');

router.get('/',Index);

//registro

router.get('/registro',NoPuedeEstarAutenticado,registro);

router.post('/registro', passport.authenticate('local-registro',{
    successRedirect:'/',
    failureRedirect:'/registro',
    passReqToCallback: true
}));

//login

router.get('/login',NoPuedeEstarAutenticado,login);

router.post('/login', passport.authenticate('local-login',{
    successRedirect:'/',
    failureRedirect:'/login',
    passReqToCallback: true
}));

//rutas de productos

router.get('/producto/:id',producto)

router.get('/software',Software);

router.get('/software/producto/:id',producto);

router.get('/servicios',Servicios);

router.get('/servicios/producto/:id',producto);

router.get('/tarjetas',GiftCards);

router.get('/tarjetas/producto/:id',producto);

router.get('/juegos',juegos);

router.get('/juegos/producto/:id',producto);

//menu perfil

router.get('/perfil',UsurioAutorizado,perfil);

router.get('/logout',Logout);

router.put('/correo/:id',ActualizarCorreo);

router.put('/password/:id',ActualizarContraseña);

//menu carrito de compras 

router.get('carrito',carrito);

router.post('/CarritoProducto',carritoNoValido,GuardarCarrito);

//Rutas admin

router.get('/admin',PermisoAdmin,admin);

router.post('/admin',PermisoAdmin,EnviarProducto);

router.get('/admin/carrusel',PermisoAdmin,carrusel)

router.post('/slaider1',PermisoAdmin,EnviarImg1);

router.delete('/slaider1/borrar/:id',PermisoAdmin,EliminarImg1);

router.post('/slaider2',PermisoAdmin,EnviarImg2);

router.delete('/slaider2/borrar/:id',PermisoAdmin,EliminarImg2);

router.post('/slaider3',PermisoAdmin,EnviarImg3);

router.delete('/slaider3/borrar/:id',PermisoAdmin,EliminarImg3);

router.get('/admin/lista',PermisoAdmin,listaProductos);

router.delete('/admin/lista/:id',PermisoAdmin,listaProductosEliminar);

router.get('/admin/lista/edit/:id',PermisoAdmin,listaProductosEditar);

router.put('/admin/lista/edit/put/:id',PermisoAdmin,listaActualizar);

//carrito de compras

router.get('/carrito',carrito);

router.delete('/carrito/eliminar/:id',BorrarProductoCarrito)

//PayPal

router.post('/crear-orden',CrearOrden);

router.get('/capturar-orden',CapturarOrden);

router.get('/cancelar-orden',CancelarOrden);

router.get('/pagoListo',Pago)

module.exports = router;