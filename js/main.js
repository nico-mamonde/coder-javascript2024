// Declaración de arreglo para recibir productos en el carrito
let carritoReceptor = [];

// Recupera los datos del carrito desde localStorage cuando la página se carga
let carritoAlmacenado = localStorage.getItem("carrito");
if (carritoAlmacenado) {
  carritoReceptor = JSON.parse(carritoAlmacenado);
}

// Inserción de productos desde .json
let contenedor = document.getElementById("contenedor-productos");

const traerProductos = async () => {
  try {
    const response = await fetch("./products.json");
    const catalogo = await response.json();

    catalogo.forEach((item) => {
      const div = document.createElement("div");
      div.className = "productoDeCatalogo";
      div.innerHTML = `
      <h2>${item.productoNombre}</h2>
      <img src= ${item.productoImagen} class= imgProduct alt= ${item.productoNombre} style="width: auto; height:15rem">
      <h5>Color: ${item.productoColor}</h5>
      <b>$${item.productoCosto}</b>
      <button type="button" class = "btnAddProduct" value = ${item.productoId} >Agregar al carrito</button>
    `;
      contenedor.append(div);
    });

    // Función que se le asigna al botón "addProduct"
    let botonAgregarAlCarrito =
      document.getElementsByClassName("btnAddProduct");
    for (let i = 0; i < botonAgregarAlCarrito.length; i++) {
      botonAgregarAlCarrito[i].addEventListener("click", (e) => {
        let productoIdEnCarrito = catalogo.filter(
          (ele) => ele.productoId == e.target.value
        );
        let identificadorId = uuid.v1();
        carritoReceptor.push({
          ...productoIdEnCarrito[0],
          identifier: identificadorId,
        });
        appendCart({ ...productoIdEnCarrito[0], identifier: identificadorId });
        pagoTotal(productoIdEnCarrito[0].productoCosto);

        // Actualización localStorage
        localStorage.setItem("carrito", JSON.stringify(carritoReceptor));
      });
    }
  } catch (error) {
    const div = document.createElement("div");
    div.innerHTML = `Error ${error}`;
    document.body.append(div);
  }
};

// Se invoca a la función que llame a los productos
traerProductos();

// Declaración e inicialización de variable que brindará el total
let total = 0;

// Función para agregar items al carrito
const appendCart = (item) => {
  // Contenedor de carrito
  let contenedorCarrito = document.getElementById("contenedor-carrito");
  let productoIdEnCarritoMini = document.createElement("div");
  productoIdEnCarritoMini.className = "productoIdEnCarritoMini";
  productoIdEnCarritoMini.id = item.identifier;
  productoIdEnCarritoMini.innerHTML = `
  <div class="card " style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${item.productoImagen} class="img-fluid rounded-start imgProduct" alt=${item.productoNombre} >
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h5 class="card-title">${item.productoNombre}</h5>
        <p class="card-text">$${item.productoCosto}.00</p>
        <div id=${item.identifier}></div>
      </div>
    </div>
  </div>
</div>
`;
  // Contenedor visual
  contenedorCarrito.append(productoIdEnCarritoMini);
  let botonBorrar = document.createElement("button");
  botonBorrar.id = "myButtonDelete";
  botonBorrar.className = "myButtonDeleteClass";
  botonBorrar.textContent = "Borrar";
  botonBorrar.addEventListener("click", () => {
    let borrarItem = carritoReceptor.filter(
      (ele) => ele.identifier !== item.identifier
    );
    carritoReceptor = borrarItem;

    // Actualiza localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoReceptor));

    let getProduct = document.getElementById(item.identifier);
    getProduct.remove();
    pagoTotal(item.productoCosto * -1);
  });
  let contenedorBotonBorrar = document.getElementById(`${item.identifier}`);
  contenedorBotonBorrar.appendChild(botonBorrar);
};

window.addEventListener("load", () => {
  if (carritoReceptor.length > 0) {
    carritoReceptor.forEach((item) => {
      appendCart(item);
      pagoTotal(item.productoCosto);
    });
  }
});

// Llamado a función que oculatará el botón hasta que se agreguen productos
ocultarBtnFinalizar();

// Función para cálculo total
function pagoTotal(precio) {
  total = total + precio;
  let totalAgregado = document.getElementById("total");
  totalAgregado.textContent = `Cantidad: ${carritoReceptor.length} - Total a pagar: $${total}`;
  // Condición para mostrar el botón finalizar solo si hay productos en el carrito
  if (carritoReceptor.length > 0) {
    mostrarBtnFinalizar();
  } else {
    ocultarBtnFinalizar();
  }
}

// Método para indicar qué mostrar con el botón "Finalizar compra"
let btnFinalizar = document.getElementById("btnFinalizar");
btnFinalizar.addEventListener("click", () => {
  Swal.fire({
    title: "Gracias por comprar en el pulpo",
    text: `N° orden: ${Math.floor(
      Math.random() * 5000
    )} - Tu cuenta es de $${total}`,
    imageUrl: "./assets/img/pulpo/pulpo_final.jpg",
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "venta completada",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Finalizar",
    denyButtonText: `Regresar`,
  }).then((result) => {
    result.isConfirmed ? window.location.reload() : result.isDenied;
  });
  // Eliminación de localStorage al finalizar la compra
  localStorage.clear();
});

// Validación para carga de localStorage de usuario o solicitar el ingreso
let usuario = localStorage.getItem("usuario");
usuario && mostrarUsuario(usuario);

// Función para solicitar el inicio de la sesión
function mostrarUsuario(usuario) {
  let infoUsuario = document.getElementById("infoUsuario");
  infoUsuario.textContent = `¡Qué gusto verte para comprar de nuevo, ${usuario}!`;

  // Condición para mostrar el botón login o no en función a la existencia de usuario en el localStorage
  localStorage.getItem("usuario") !== null
    ? ocultarbtnInicioSesion()
    : mostrarbtnInicioSesion();
}

// Botón de inicio de sesión
let btnInicioSesion = document.getElementById("btnInicioSesion");
btnInicioSesion.addEventListener("click", () => {
  Swal.fire({
    title: "Inicie sesión",
    input: "text",
    inputPlaceholder: "Ingrese su usuario",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Iniciar Sesión",
    cancelButtonText: "Continuar sin sesión",
    preConfirm: (usuario) => {
      if (usuario) {
        // Guarda el nombre de usuario en el localStorage del usuario
        localStorage.setItem("usuario", usuario);
        mostrarUsuario(usuario);

        // Valida la aparación del botón en función al localStorage
        btnInicioSesion.style.display = "none";
      }
    },
  });
});

// Funciones para mostrar u ocultar el botón "Finalizar compra"
function ocultarBtnFinalizar() {
  document.getElementById("btnFinalizar").style.display = `none`;
}

function mostrarBtnFinalizar() {
  document.getElementById("btnFinalizar").style.display = "block";
}

// Funciones para mostrar u ocultar el botón "Login/Iniciar Sesión"
function ocultarbtnInicioSesion() {
  document.getElementById("btnInicioSesion").style.display = `none`;
}

function mostrarbtnInicioSesion() {
  document.getElementById("btnInicioSesion").style.display = "block";
}
