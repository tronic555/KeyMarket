const ctrl = {};

const Producto = require('../models/producto');
const Usuario = require('../models/Usuario');
const Carrito = require('../models/carritoCompras');
const Slaider1 = require('../models/slide_1');
const Slaider2 = require('../models/slide_2');
const Slaider3 = require('../models/slide_3');
const bcrypt = require('bcrypt-nodejs');
const PaypalApi = 'https://api-m.sandbox.paypal.com';
const axios = require('axios');
require('dotenv').config();




/********* PAGINAS PUBLICAS PARA PUBLICAS ***********/





ctrl.Index = async (req,res) => {

    const software = await Producto.find({licencia:"Software",favoritos:"Si"});
    const servicios = await Producto.find({licencia:"Servicios",favoritos:"Si"});
    const tarjetas = await Producto.find({licencia:"Tarjetas",favoritos:"Si"});
    const juegos = await Producto.find({licencia:"Juegos",favoritos:"Si"});
    const IMG = await Slaider1.find();
    const IMG2 = await Slaider2.find();
    const IMG3 = await Slaider3.find();

    const UsuarioValido = req.isAuthenticated();

    res.render('index.ejs',{software,servicios,tarjetas,juegos,UsuarioValido,IMG,IMG2,IMG3});
    
};

ctrl.Software = async (req, res) => {
  let software;

  const page = parseInt(req.query.page) || 1; // validar parámetro page
  if (isNaN(page) || page < 1) {
    return res.status(400).send("Invalid page number");
  }

  const filter = { licencia: "Software" };
  if (req.query.busqueda_software) {
    filter.producto = new RegExp(req.query.busqueda_software, "i");
  }

  try {
    software = await Producto.paginate(filter, {
      page,
      limit: 8,
      sort: "producto", // ordenar por nombre de producto
    });
    res.render("software.ejs", { software, UsuarioValido: req.isAuthenticated() });
  } catch (error) {
    // manejar errores
    res.status(500).send(error);
  }
};



ctrl.Servicios = async (req,res) => {
  let servicios;

  const page = parseInt(req.query.page) || 1; // validar parámetro page
  if (isNaN(page) || page < 1) {
    return res.status(400).send("Invalid page number");
  }

  const filter = { licencia: "Servicios" };
  if (req.query.busqueda_servicios) {
    filter.producto = new RegExp(req.query.busqueda_servicios, "i");
  }

  try {
    servicios = await Producto.paginate(filter, {
      page,
      limit: 8,
      sort: "producto", // ordenar por nombre de producto
    });
    res.render("servicios.ejs", { servicios, UsuarioValido: req.isAuthenticated() });
  } catch (error) {
    // manejar errores
    res.status(500).send(error);
  }
};


ctrl.GiftCards = async (req,res) => {
  let tarjetas;

  const page = parseInt(req.query.page) || 1; // validar parámetro page
  if (isNaN(page) || page < 1) {
    return res.status(400).send("Invalid page number");
  }

  const filter = { licencia: "Tarjetas" };
  if (req.query.busqueda_tarjetas) {
    filter.producto = new RegExp(req.query.busqueda_tarjetas, "i");
  }

  try {
    tarjetas = await Producto.paginate(filter, {
      page,
      limit: 8,
      sort: "producto", // ordenar por nombre de producto
    });
    res.render("tarjetas.ejs", { tarjetas, UsuarioValido: req.isAuthenticated() });
  } catch (error) {
    // manejar errores
    res.status(500).send(error);
  }
};


ctrl.juegos = async (req, res) => {
  let juegos;

  const page = parseInt(req.query.page) || 1; // validar parámetro page
  if (isNaN(page) || page < 1) {
    return res.status(400).send("Invalid page number");
  }

  const filter = { licencia: "Juegos" };
  if (req.query.busqueda_juegos) {
    filter.producto = new RegExp(req.query.busqueda_juegos, "i");
  }

  try {
    juegos = await Producto.paginate(filter, {
      page,
      limit: 8,
      sort: "producto", // ordenar por nombre de producto
    });
    res.render("juegos.ejs", { juegos, UsuarioValido: req.isAuthenticated() });
  } catch (error) {
    // manejar errores
    res.status(500).send(error);
  }
};

ctrl.producto = async (req,res) => {
    const pagina = await Producto.findById(req.params.id);
    const UsuarioValido = req.isAuthenticated();
    res.render('paginaProducto.ejs',{UsuarioValido,pagina});
};






/********* REGISTROS DE USUARIOS Y LOGIN DE USUARIOS ***********/






ctrl.registro = (req,res) => {
  res.render("registro.ejs");
};

ctrl.login = (req,res) => {
  res.render("login.ejs")
};




/********* PERFIL DEL USUARIO ***********/



ctrl.perfil = (req,res) => {
    const UserId = req.user._id;
    res.render('perfilDeUsuario.ejs',{UserId});
};

ctrl.ActualizarCorreo = async(req,res) => {
  const id = req.params.id
  const {correo,confirmacion} = req.body;
  const ExisteElCorreo = await Usuario.findOne({correo});
  const userPassword = await Usuario.findById(req.user._id);

  bcrypt.hashSync(confirmacion, bcrypt.genSaltSync(10));
  const compararPassword = bcrypt.compareSync(confirmacion, userPassword.contraseña);

  if (!compararPassword) {
    req.flash('contraseña-invalida','Error en los campos');
    return res.redirect('/perfil');
  };

  if(ExisteElCorreo){
    req.flash('Ya-existe-correo','Ese correo ya esta en uso, prueba con otro');
    return res.redirect('/perfil');
  };

  if(correo.length == 0){
    req.flash('correo-vacio','Por favor, no enviar datos vacios');
    return res.redirect('/perfil');
  };

  await Usuario.findByIdAndUpdate(id,{correo});
  res.redirect('/logout');
};

ctrl.ActualizarContraseña = async(req,res) => {
    const Id = req.params.id;
    const {contraseña,confirmacion} = req.body;
    let salt = bcrypt.genSaltSync(10);
    const userPassword = await Usuario.findById(req.user._id);

    bcrypt.hashSync(confirmacion, bcrypt.genSaltSync(10));
    const compararPassword = bcrypt.compareSync(confirmacion, userPassword.contraseña);
  
    if (!compararPassword) {
      req.flash('contraseña2-invalida','Error en los campos');
      return res.redirect('/perfil');
    };

    if(contraseña.length == 0){
        req.flash('contraseña-vacia','Por favor, no enviar datos vacios');
        return res.redirect('/perfil');
    };

   const ValorEncriptado = bcrypt.hashSync(contraseña, salt);

    await Usuario.findByIdAndUpdate(Id,{contraseña: ValorEncriptado});

    res.redirect('/logout')
}

ctrl.Logout = (req,res) => {
    req.logout(function(err){
        if(err) return next(err);
        res.redirect('/');
    });
};







/********* CARRITO DE COMPRAS DEL USUARIO ***********/







ctrl.carrito = async (req,res) => {
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  };

  const software = await Producto.find({licencia:"Software",favoritos:"Si"});

  const UsuarioValido = req.isAuthenticated();

  const carrito = await Carrito.find({usuarioId:req.user._id});

  return res.render('carrito.ejs',{carrito,UsuarioValido,software})
  
}

ctrl.carritoNoValido = (req,res,next) => {
  const NoAutenticado = req.isAuthenticated();

  if(!NoAutenticado){
    return res.json('no valido');
  };

  next();
};

ctrl.GuardarCarrito = async (req,res) => {
  const usuarioId = req.user._id
  const {img,titulo,precio} = req.body;

  try {
    const matchProducto = await Carrito.findOne({usuarioId,img,titulo,precio}).exec();
    if (matchProducto) {
      
      return res.json('Producto ya existe')

    } else {
      const GuardarCarrito = new Carrito({usuarioId,img,titulo,precio});
  
      await GuardarCarrito.save()
      return res.json('recibido');
    }
  } catch (error) {
    console.log(error);
  }
};





ctrl.BorrarProductoCarrito = async (req,res) => {

  await Carrito.findByIdAndDelete(req.params.id)

  res.redirect('/carrito')
}













/********* SEGURIDAD DE PAGINAS PRIVADAS ***********/









ctrl.UsurioAutorizado = (req,res,next) => {
 const UsuarioValido = req.isAuthenticated();
    
  if (!UsuarioValido) {
    return res.redirect('/login');

  } else if (req.user.role !== 'user') {
    return res.redirect('/admin');

  } else {
    return next();
  };
   
};

ctrl.PermisoAdmin = (req,res,next) => {
  const UsuarioValido = req.isAuthenticated();

  if(!UsuarioValido){
    return res.redirect('/login');
  };

  if(req.user.role !== 'admin'){
   return res.redirect('/');
  };

  return next();   
};

ctrl.NoPuedeEstarAutenticado = (req,res,next) => {
  const UsuarioValido = req.isAuthenticated();
    
  if(UsuarioValido){
    return res.redirect('/');
  };

  return next();
};





/********* PANEL DEL ADMINISTRADOR DE KEYMARKET ***********/





ctrl.admin = async (req,res) => {
  res.render('admin.ejs');
};

ctrl.EnviarProducto = async (req,res) => {
  const {favoritos, licencia, producto, precio, url, descripcion} = req.body;
     
  const NuevoProducto = new Producto({favoritos, licencia, producto, precio, url, descripcion});
    
  await NuevoProducto.save();
  res.redirect('/admin');
};



ctrl.carrusel = async (req,res) => {
  const img1 = await Slaider1.find();
  const img2 = await Slaider2.find();
  const img3 = await Slaider3.find();
  res.render('carrusel.ejs',{img1,img2,img3})
}


ctrl.EnviarImg1 = async (req,res) => {
  const {img1} = req.body;

  const Imagen = await Slaider1.find()

  if(img1.length == 0){
    req.flash('url-vacia','Por favor llene el campo url');
    return res.redirect('/admin');
  };

  if (Imagen.length == 1) {

    req.flash('ocupado','Por favor llene el campo url');
    return res.redirect('/admin');
    
  }

  const Img = new Slaider1({img1});
  await Img.save();
  return res.redirect('/admin');
}



ctrl.EliminarImg1 = async (req,res) => {
  
  await Slaider1.findByIdAndDelete(req.params.id);

  res.redirect('/admin');
};



ctrl.EnviarImg2 = async(req,res) => {

  const {img2} = req.body;

  const Imagen = await Slaider2.find()

  if(img2.length == 0){
    req.flash('url-vacia','Por favor llene el campo url');
    return res.redirect('/admin');
  };

  if (Imagen.length == 1) {

    req.flash('ocupado','Por favor llene el campo url');
    return res.redirect('/admin');
    
  }

  const Img = new Slaider2({img2});
  await Img.save();
  return res.redirect('/admin');

}



ctrl.EliminarImg2 = async (req,res) => {
  await Slaider2.findByIdAndDelete(req.params.id);

  res.redirect('/admin');
}





ctrl.EnviarImg3 = async(req,res) => {

  const {img3} = req.body;

  const Imagen = await Slaider3.find()

  if(img3.length == 0){
    req.flash('url-vacia','Por favor llene el campo url');
    return res.redirect('/admin');
  };

  if (Imagen.length == 1) {

    req.flash('ocupado','Por favor llene el campo url');
    return res.redirect('/admin');
    
  }

  const Img = new Slaider3({img3});
  await Img.save();
  return res.redirect('/admin');

}



ctrl.EliminarImg3 = async (req,res) => {
  await Slaider3.findByIdAndDelete(req.params.id);

  res.redirect('/admin');
}





ctrl.listaProductos = async (req,res) => {

  let Lista;
    
  if (req.query.busqueda_lista) {
    Lista = await Producto.find({producto: new RegExp(req.query.busqueda_lista, "i")});
  } else {
    Lista = await Producto.find();
  };
    
  res.render('listaProductos.ejs',{Lista});
};

ctrl.listaProductosEliminar = async (req,res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/admin/lista/');
};

ctrl.listaProductosEditar = async (req,res) => {
    const id = req.params.id;

    const  ProductoEncontrado = await Producto.findById(id);
    res.render('editProducto.ejs',{ProductoEncontrado});
};

ctrl.listaActualizar = async (req,res) => {

    const { favoritos, licencia, producto, precio, url, descripcion } = req.body;
    await Producto.findByIdAndUpdate(req.params.id,{favoritos, licencia, producto, precio, url, descripcion});
    res.redirect('/admin/lista');

};




/********* API DE PAYPAL ***********/


//peticion de la orden 

ctrl.CrearOrden = async (req,res) => {

  const validacion = req.isAuthenticated();

  if(validacion){
    try {
      const order = {
        intent: 'CAPTURE',
        purchase_units:[{
          amount:{
            currency_code:'USD',
            value:req.body.pago
          }
        }],
        application_context: {
          brand_name:'KeyMarket',
          landing_page:'NO_PREFERENCE',
          user_action:'PAY_NOW',
          return_url: 'http://localhost:4000/capturar-orden',
          cancel_url: 'http://localhost:4000/cancelar-orden'
        }
      };
    
      const params = new URLSearchParams();
      params.append('grant_type','client_credentials');
    
      const {data: {access_token}} = await axios.post(`${PaypalApi}/v1/oauth2/token`,params,{
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
        },
        auth:{
          username: process.env.CLIENTE_PAYPAL,
          password: process.env.SECRET_PAYPAL
        }
      });
      
     const response = await axios.post(`${PaypalApi}/v2/checkout/orders`,order,{
       headers:{
        Authorization: `Bearer ${access_token}`
       }
      })
    
     return res.json(response.data);
    } catch (error) {
  
      console.log(error)
      
    }
  } else{

    const response = "logeate"

    res.json(response)
  }

 
};

//captura de la orden 

ctrl.CapturarOrden = async (req,res) => {
  const {token} = req.query;

  const response = await axios.post(`${PaypalApi}/v2/checkout/orders/${token}/capture`,{}, {
    auth:{
      username: process.env.CLIENTE_PAYPAL,
      password: process.env.SECRET_PAYPAL
    }
  });

  res.redirect('pagoListo')
};

//pago de la orden

ctrl.Pago = (req,res) => {
  res.render('pagoValido.ejs')
}

//cierre de la orden 

ctrl.CancelarOrden = async (req,res) => {
  res.redirect('/')
}


module.exports = ctrl;