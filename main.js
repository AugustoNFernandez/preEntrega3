// recupera el carrito de del storage  (operador avanzado OR)
const carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
//ver el carrito guardado en consola
console.log(JSON.parse(localStorage.getItem('carrito'))); 


let tBody = document.getElementById('tBody');

///array de productos - objetos literales
const items = [
    { 
        id:1,
        nombre: "Sillon Portofino un cuerpo",
        precio: 90000,
        color: "beige",
        tela: "chenille",
        cuerpos: 1,
        foto: "https://desillas.com/img/productos/ZDHGWA_12.jpg",
    },
    { 
        id:2,
        nombre: "Sillon Milan un cuerpo",
        precio: 90000,
        color: "gris",
        tela: "chenille",
        cuerpos: 1,
        foto:"https://desillas.com/img/productos/ABENPU_2.jpg",
    },
    { 
        id:3,
        nombre: "Sillon Bergamo dos cuerpos",
        precio: 120000,
        color: "beige",
        tela: "pana",
        cuerpos: 2,
        foto:"https://desillas.com/img/productos/GLTRFK_11.jpg",
    },
    { 
        id:4,
        nombre: "Sillon Parma dos cuerpos",
        precio: 120000,
        color: "rosa",
        tela: "pana",
        cuerpos: 2,
        foto:"https://desillas.com/img/productos/CJFLRK_2.jpg",
    },
    { 
        id:5,
        nombre: "Sillon Chesterfield tres cuerpos",
        precio: 160000,
        color: "beige",
        tela: "lino",
        cuerpos: 3,
        foto: "https://desillas.com/img/productos/CTZXXC_6.jpg"
    },
    { 
        id:6,
        nombre: "Sillon Savona tres cuerpos",
        precio: 160000,
        color: "beige",
        tela: "lino",
        cuerpos: 3,
        foto: "https://desillas.com/img/productos/FHFCIY_1.jpg"
    },
    { 
        id:7,
        nombre: "Silla Jeffrey",
        precio: 50000,
        color: "negro",
        tela: "cuero",
        cuerpos: 1,
        foto:"https://desillas.com/img/productos/RPLJFO_1.jpg",
    },
    { 
        id:8,
        nombre: "Silla Charles",
        precio: 38000,
        color: "blanco",
        tela: "lino",
        cuerpos: 1,
        foto:"https://desillas.com/img/productos/PEYUWG_1.jpg",
    }
];

let contenedorItems = document.getElementById('menuItems');
//agregar items del array al html mediante funcion y DOM
function cargarItems(listaItems){
    contenedorItems.innerHTML=''; // se vacia contenedor
    for(const item of listaItems){ //se carga los items
        menuItems.innerHTML+=`
        <div class="card col-sm-12 col-md-4 col-lg-3">
            <img src=${item.foto} class="card-img-top" alt=${item.nombre}>
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">$ ${item.precio}</p>
                <button id=${item.id} class="btn btn-primary compra">Comprar</button>
            </div>
        </div>
        `;
    }
    
    //eventos
    let botones = document.getElementsByClassName('compra');
    for(const boton of botones){
        boton.addEventListener("click",() => {
            const prodACarrito = items.find((item)=> item.id == boton.id);
            //carrito.push(prodACarrito);
            agregarACarrito(prodACarrito);
        })
        //hover
        boton.onmouseover = () => {
            boton.classList.replace('btn-primary','btn-warning');
        }        
        boton.onmouseout = () => {
            boton.classList.replace('btn-warning','btn-primary');
        }
    }
}
cargarItems(items);

// Funcion para sumar items al carrito, pushearlo
function agregarACarrito(item){
    guardados(); // guardar el item seleccionado en localStorage
    carrito.push(item);
    tBody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
        </tr>    
    `;

    //suma el total a pagar segun la cantidad de items en el carrito
    let total = carrito.reduce((ac,item)=> ac + item.precio,0 );
    document.getElementById('total').innerText = `Total a pagar $:${total}`;
}


//Controlar datos ingresados en los inputs
let nombre = document.getElementById('nombre');
nombre.onkeyup=()=>{
    if(nombre.value.length < 3){
       nombre.style.backgroundColor="#E97E9E";
    }else{
        nombre.style.backgroundColor="white";
    }
}

let email = document.getElementById('email');
email.addEventListener('input',()=>{
    if(!email.value.includes('@') || !email.value.includes('.')){
        document.getElementById('mensaje').innerText='Es necesario agregar @ y .' 
    }else{
        document.getElementById('mensaje').innerText='';
    } // VER SI LO PUEDO REEMPLAZAR CON TAOSTY ******************************************************
})

//Funcion para boton para borrar campos
const botonBorrar = document.getElementById('borrarCampos');

function borrarC() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    nombre.value = '';
    email.value = '';
}

botonBorrar.addEventListener('click', borrarC);

let formulario = document.getElementById('formulario');
formulario.addEventListener('submit', validar);

function validar (evento){
    if((nombre.value =='')||(email.value == '')){
        evento.preventDefault();
        alert('Ingrese nombre o email valido');
    }
}

//local Storage Carrito
const guardados = () => {
localStorage.setItem('carrito', JSON.stringify(carrito));
}



