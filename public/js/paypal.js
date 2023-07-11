const btn = document.querySelector('.pago');
const pago = document.querySelector('.precio').textContent;
const info ={pago}
console.log(info)
btn.addEventListener('click', async () => {
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