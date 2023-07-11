let total = 0;
const precios = document.querySelectorAll('.precioP');
const cantidades = document.querySelectorAll('.product-cantidad');
const res = document.querySelector('.resT')

function calcularTotal() {
  total = 0;
  precios.forEach((precio, index) => {
    const cantidad = parseInt(cantidades[index].value);
    const precioUnitario = parseFloat(precio.textContent);
    const subtotal = cantidad * precioUnitario;
    total += subtotal;
  });
  LimpiarPrecio();
  const resultadoT = document.createElement('div');
  resultadoT.classList.add('flex','gap-2')
  resultadoT.innerHTML = `<span class="precioCarrito">${total}</span><span>$</span>`;
  res.appendChild(resultadoT);
  
}

calcularTotal();

cantidades.forEach(cantidad => cantidad.addEventListener('input', calcularTotal));

function LimpiarPrecio() {
  while(res.firstChild){
    res.removeChild(res.firstChild)
  }
}


