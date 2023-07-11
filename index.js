const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');
const BaseDeInformacion = process.env.MONGODB_URI;

// Base de datos
(async ()=>{
    try{
        await mongoose.connect(BaseDeInformacion,
            {
                useUnifiedTopology: true,
                useNewUrlParser:true
            }
        );

        console.log("conexion exitosa a mongodb");
        
    }catch(error){
        console.log(error);
    }
})();

//fin del servidor

app.listen(app.get('port'),() => { 
    console.log(`Servidor alojado en el puerto ${app.get('port')}`);
});