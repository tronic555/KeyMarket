const btnCarritoC = document.querySelector('.btnCarritoC');
const respuesta = document.querySelector('.respuesta');
const pago = document.querySelector('.precioCarrito').textContent;
const info = {pago}

btnCarritoC.addEventListener('click', async () => {
     
    if (info.pago == 0) {
      return  alertaCarrito();
    }

    try {

        const response = await fetch('/crear-orden', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(info) 
        });
       
        const data = await response.json();
        
        if (data == "logeate") {
    
          window.location.href = '/login';
          
        } else {
    
          window.location.href = await data.links[1].href
          
        }
       
        
    } catch (error) {
     console.log(error)
    }
})

function alertaCarrito(){
  const alertaNo = document.createElement('div');
  alertaNo.classList.add('border-2','border-red-500','p-3','fixed','right-3','bottom-3','opacity-0','animacion','rounded','bg-red-100');
  alertaNo.innerHTML = `
  <p class="text-center text-red-500 font-semibold flex gap-2 items-center max-md:text-sm"> 
    <span> 
      Necesita agregar un producto para poder comprar en el carrito
    </span>
     <span> 
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
       <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
     </span>
  </p>
`
setTimeout(() => {
  respuesta.appendChild(alertaNo);
},1000)

setTimeout(() => {
  alertaNo.classList.add('opacity-100')
},1250)

setTimeout(() => {
  alertaNo.classList.remove('opacity-100');
},2750)

setTimeout(() => {
  respuesta.removeChild(alertaNo)
},3500)
}