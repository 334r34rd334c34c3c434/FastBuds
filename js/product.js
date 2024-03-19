document.addEventListener("DOMContentLoaded", () => {
    let carrito = [];

    async function cargarProductos() {
        try {
            const response = await fetch('productos.json');
            const productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    function mostrarProductos(productos) {
        const productosContainer = document.getElementById("productos");

        productos.forEach((producto) => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio}$</p>
                <button class="comprar-button" data-producto="${producto.nombre}" data-precio="${producto.precio}" data-detalle="details.html?nombre=${producto.nombre}&precio=${producto.precio}&imagen=${producto.imagen}&descripcion=${producto.descripcion}">Detalles</button>
                <button class="agregar-button" data-producto="${producto.nombre}" data-precio="${producto.precio}">Agregar</button>

            `;

            productosContainer.appendChild(productoDiv);
        });

        asignarEventos();
    }

    function asignarEventos() {
        const botonesComprar = document.querySelectorAll(".comprar-button");
        const botonesAgregar = document.querySelectorAll(".agregar-button");

        botonesComprar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const detalle = boton.getAttribute("data-detalle");
                window.location.href = detalle;
            });
        });

        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const producto = boton.getAttribute("data-producto");
                const precio = parseFloat(boton.getAttribute("data-precio"));
                agregarAlCarrito(producto, precio);
            });
        });
    }



    function agregarAlCarrito(nombre, precio, detalle) {
        carrito.push({ nombre, precio, detalle });
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }

    function mostrarCarrito() {
        const carritoCount = document.getElementById("carrito-count");
        carritoCount.textContent = carrito.length;
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    const carritoLink = document.getElementById("carrito-container");

    carritoLink.addEventListener("click", () => {
        window.location.href = "carrito.html";
    });

    cargarProductos();
});