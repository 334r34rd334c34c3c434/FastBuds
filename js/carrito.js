document.addEventListener("DOMContentLoaded", () => {
    let carrito = [];

    function actualizarCarrito() {
        const listaCarrito = document.getElementById("lista-carrito");
        listaCarrito.innerHTML = "";

        let total = 0;
        const productosUnicos = [...new Set(carrito.map(item => item.nombre))];

        productosUnicos.forEach((nombreProducto) => {
            const cantidad = carrito.filter(item => item.nombre === nombreProducto).length;
            const producto = carrito.find(item => item.nombre === nombreProducto);

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="/img/${producto.imagen}" alt="${producto.nombre}" />
                ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${cantidad}
            `;

            listaCarrito.appendChild(listItem);
            total += producto.precio * cantidad;
        });

        const totalCarrito = document.getElementById("total-carrito");
        totalCarrito.textContent = total.toFixed(2);

        const carritoCount = document.getElementById("carrito-count");
        carritoCount.textContent = carrito.length;
    }

    function obtenerCarritoDeLocalStorage() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            return JSON.parse(carritoGuardado);
        }
        return [];
    }

    function limpiarCarrito() {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    }

    carrito = obtenerCarritoDeLocalStorage();
    actualizarCarrito();

    const botonesComprar = document.querySelectorAll(".comprar");
    botonesComprar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const nombreProducto = boton.getAttribute("data-producto");
            const precioProducto = parseFloat(boton.getAttribute("data-precio"));
            const imagenProducto = boton.getAttribute("data-imagen");

            const productoExistente = carrito.find(item => item.nombre === nombreProducto);

            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                const nuevoProducto = {
                    nombre: nombreProducto,
                    precio: precioProducto,
                    imagen: imagenProducto,
                    cantidad: 1
                };
                carrito.push(nuevoProducto);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        });
    });

    const borrarCarritoBtn = document.getElementById("borrar-carrito-btn");
    borrarCarritoBtn.addEventListener("click", () => {
        limpiarCarrito();
    });

    const pagarButton = document.getElementById('pagar-btn');
    pagarButton.addEventListener('click', () => {
        const totalCarrito = document.getElementById("total-carrito").textContent;
        const url = `metodo.html?total=${totalCarrito}`;
        window.location.href = url;
    });
});