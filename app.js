const stockProductos = [
    {
    id: 1,
    nombre: "Crash Bandicoot",
    cantidad: 1,
    desc: "Juego plataformero, niveles dificiles",
    precio: 120000,
    img: "img/Crash.jpg",
    },
    {
    id: 2,
    nombre: "Mortal Kombat XI",
    cantidad: 1,
    desc: "Luchas con los mejores graficos",
    precio: 150000,
    img: "img/mortal.jpg",
    },
    {
    id: 3,
    nombre: "Pac Man",
    cantidad: 1,
    desc: "Juego plataformero, niveles basicos",
    precio: 70000,
    img: "img/pacman.jpg",
    },
    {
    id: 4,
    nombre: "Dragon Ball ",
    cantidad: 1,
    desc: "Vive la experiencia dragon ball",
    precio: 100000,
    img: "img/dragonball.jpg",
    },
    {
    id: 5,
    nombre: "Naruto Ninja Storm 4",
    cantidad: 1,
    desc: "La historia de Naruto",
    precio: 120000,
    img: "img/naruto.jpg",
    },
    {
    id: 6,
    nombre: "NBA 2k22",
    cantidad: 1,
    desc: "Se el mejor en esta Edicion de NBA",
    precio: 220000,
    img: "img/shingeki.jpg",
    },
    {
    id: 7,
    nombre: "Spiderman",
    cantidad: 1,
    desc: "Disfruta de ser Peter Parker",
    precio: 140000,
    img: "img/league.jpg",
    },
    {
    id: 8,
    nombre: "Call Of Duty Modern Warfare II",
    cantidad: 1,
    desc: "Conquista Warzone y se el Mejor",
    precio: 250000,
    img: "img/callduty.jpg",
    },
    {
    id: 9,
    nombre: "Fifa 2023",
    cantidad: 1,
    desc: "Disfruta de Ultimate Team",
    precio: 245000,
    img: "img/fifa.jpg",
    },
    {
    id: 10,
    nombre: "Fornite",
    cantidad: 1,
    desc: "Battle Royale",
    precio: 80000,
    img: "img/fornite.jpg",
    },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
    formulario.addEventListener('submit', enviarCompra)
}

    if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
    });
}

if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
        });
    } else {
        location.href = "compra.html";
    }
    });
}

stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
    </div>
    `;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)

    if(existe){
    const prod = carrito.map(prod => {
        if(prod.id === id){
        prod.cantidad++
        }
    })
    } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
    }
    mostrarCarrito()

};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
    modalBody.innerHTML = "";
carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
        </div>
        
    
        `;
    });
    }

    if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
    } else {
    console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
    );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}
function procesarPedido() {
    carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
            `;
        listaCompra.appendChild(row);
    }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
    0
    );
}

function enviarCompra(e){
    e.preventDefault()
    const persona = document.querySelector('#persona').value
    const email = document.querySelector('#correo').value

    if(email === '' || persona == ''){
    Swal.fire({
        title: "¡Debes completar todos los renglones!",
        text: "Rellena el formulario",
        icon: "error",
        confirmButtonText: "Aceptar",
    })
} else {

    const btn = document.getElementById('button');

    
    btn.value = 'Sending...';
    
    const serviceID = 'default_service';
    const templateID = 'template_vxexiv9';
    
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
        btn.value = 'Send Email';
        alert('Enviado!');
        }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
        });
    };
    const spinner = document.querySelector('#spinner')
    spinner.classList.add('d-flex')
    spinner.classList.remove('d-none')

    setTimeout(() => {
    spinner.classList.remove('d-flex')
    spinner.classList.add('d-none')
    formulario.reset()

    const alertExito = document.createElement('p')
    alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
    alertExito.textContent = 'Compra realizada correctamente'
    formulario.appendChild(alertExito)

    setTimeout(() => {
        alertExito.remove()
    }, 3000)


    }, 3000)
}
localStorage.clear()


