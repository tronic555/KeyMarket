const SeleccionarProducto = document.querySelectorAll('.carrito');
const GuardarProducto = document.querySelector('.productos');
const BtnLimpiarCarrito = document.querySelector('#limpiar-carrito')

SeleccionarProducto.forEach(boton => {
    boton.addEventListener('click',(e) => {
        const producto = e.target.closest('.padre');
        LeerProducto(producto);
    });
});

function LeerProducto(producto) {
   const datosProducto = {
    img:producto.querySelector('img').src,
    titulo:producto.querySelector('h3').innerText,
    precio:producto.querySelector('p').innerText,
   };

    fetch('/CarritoProducto', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(datosProducto)
    })
    .then(response => response.json())
    .then(data => {
        if(data === "recibido"){
           return CarritoEnviado();
        }

        if(data === "no valido"){
            return CarritoNoEnviado();
        }

        if(data === 'Producto ya existe'){
          return CarritoYaExiste();
        }
    })
    .catch(error => console.log(error))
};

function CarritoEnviado(){
  const respuesta = document.querySelector('.respuesta');

  const alerta = document.createElement('div');
  alerta.classList.add('border-2','border-green-500','p-3','fixed','right-3','bottom-3','opacity-0','animacion','rounded','bg-green-100')
  const Success = document.createElement('p');
  Success.innerText = 'Producto guardado en tu carrito';
  Success.classList.add('text-center','text-green-500','font-semibold')
  alerta.appendChild(Success)

  setTimeout(() => {
    respuesta.appendChild(alerta);
  },1000)

  setTimeout(() => {
    alerta.classList.add('opacity-100')
  },1250)

  setTimeout(() => {
    alerta.classList.remove('opacity-100');
  },2750)

  setTimeout(() => {
    respuesta.removeChild(alerta)
  },3500)
}

function CarritoYaExiste(){
    const respuesta = document.querySelector('.respuesta');
  
    const alerta = document.createElement('div');
    alerta.classList.add('border-2','border-red-500','p-3','fixed','right-3','bottom-3','opacity-0','animacion','rounded','bg-red-100')
    alerta.innerHTML = `
       <p class="text-center text-red-500 font-semibold flex gap-2 items-center max-md:text-sm"> 
         <span> 
            Ese producto ya fue agregado al carrito
         </span>
          <span> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
       </p>
    `

    setTimeout(() => {
      respuesta.appendChild(alerta);
    },1000)
  
    setTimeout(() => {
      alerta.classList.add('opacity-100')
    },1250)
  
    setTimeout(() => {
      alerta.classList.remove('opacity-100');
    },2750)
  
    setTimeout(() => {
      respuesta.removeChild(alerta)
    },3500)
  }

  function CarritoNoEnviado(){
    const respuesta = document.querySelector('.respuesta');
  
    const alerta = document.createElement('div');
    alerta.classList.add('border-2','border-red-500','p-3','fixed','right-3','bottom-3','opacity-0','animacion','rounded','bg-red-100')
    alerta.innerHTML = `
       <p class="text-center text-red-500 font-semibold flex gap-2 items-center max-md:text-sm"> 
         <span> 
            Debes iniciar sesion en KeyMarket
         </span>
          <span> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
       </p>
    `

    setTimeout(() => {
      respuesta.appendChild(alerta);
    },1000)
  
    setTimeout(() => {
      alerta.classList.add('opacity-100')
    },1250)
  
    setTimeout(() => {
      alerta.classList.remove('opacity-100');
    },2750)
  
    setTimeout(() => {
      respuesta.removeChild(alerta)
    },3500)
  }





