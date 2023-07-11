// constantes y variables 

const formulario = document.querySelector('#registro');
const correo = document.querySelector('#correo');
const contraseña = document.querySelector('#contraseña');
const matchContraseña = document.querySelector('#contraseña2');
const Resultado = document.querySelector('#respuesta-correo');
let ArregloDatos = [correo,matchContraseña,contraseña];

//expresiones regulares 

const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordVal = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

//algoritmo

let valorCorreo = false;
let valorContraseña = false;
let matchPass = false;

correo.addEventListener('input', (e) => {

    valorCorreo = emailVal.test(e.target.value);
    Validar(valorCorreo,valorContraseña,matchPass);

    if (valorCorreo) {

        limpiarHTML();

        const msg = document.createElement('p');
        msg.textContent = 'Tu correo es valido ✔️';
        msg.classList.add('text-md','text-green-500');
        Resultado.appendChild(msg);
    
    } else {

        limpiarHTML();
        
        const msg = document.createElement('p');
        msg.textContent = 'Tu correo no es valido ❌';
        msg.classList.add('text-md','text-red-500');
        Resultado.appendChild(msg);
        
    };
});

contraseña.addEventListener('input', (e) => {

    valorContraseña = passwordVal.test(e.target.value);
    Validar(valorCorreo,valorContraseña,matchPass);

    if (valorContraseña) {

        limpiarHTML();

        const msg = document.createElement('p');
        msg.textContent = 'Tu contraseña es valida ✔️';
        msg.classList.add('text-md','text-green-500');
        Resultado.appendChild(msg);
        
    } else {

        limpiarHTML();

        const msg = document.createElement('p');
        msg.textContent = 'Tu contraseña no es valida❌';
        msg.classList.add('text-md','text-red-500');
        Resultado.appendChild(msg);
        
    }
})

matchContraseña.addEventListener('input', (e) => {

    matchPass = e.target.value === contraseña.value;
    Validar(valorCorreo,valorContraseña,matchPass);

    if (matchPass) {

        limpiarHTML();

        const msg = document.createElement('p');
        msg.textContent = 'Tu contraseña si coinciden ✔️';
        msg.classList.add('text-md','text-green-500');
        Resultado.appendChild(msg);
        
        
    } else {

        limpiarHTML();

        const msg = document.createElement('p');
        msg.textContent = 'Tus contraseña no coinciden ❌';
        msg.classList.add('text-md','text-red-500');
        Resultado.appendChild(msg);
        
    }
});

function Validar(infoCorreo,infoPass,infoMatch){

    if (!infoCorreo || !infoPass  || !infoMatch) {
        
       document.getElementById("btn-form").disabled = true;

    } else {

        document.getElementById("btn-form").disabled = false;
    }
}

function limpiarHTML(){
    while(Resultado.firstChild){
        Resultado.removeChild(Resultado.firstChild)
    }
}


