document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('nombre') && params.has('precio') && params.has('imagen') && params.has('descripcion')) {
        const nombre = params.get('nombre');
        const precio = params.get('precio');
        const imagen = params.get('imagen');
        const descripcion = params.get('descripcion');

        document.getElementById('product-name').textContent = nombre;
        document.getElementById('product-price-value').textContent = `$${precio}`;

        const productImage = document.getElementById('product-image');
        if (productImage) {
            productImage.innerHTML = `<img src="${imagen}" alt="${nombre}">`;
        }

        document.getElementById('product-description-value').textContent = descripcion;

        const agregarButton = document.querySelector('.agregar-button');
        agregarButton.addEventListener('click', () => {
            agregarAlCarrito(nombre, precio);
        });

        axios.get('https://ipinfo.io')
            .then(response => {
                const country = response.data.country;

                const envioMessage = document.querySelector('.more-data-description');
                envioMessage.textContent = `Envío gratuito a todo ${country}`;
            })
            .catch(error => {
                console.error('Error al obtener la información de la IP:', error);
            });
    }
});

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));

    const carritoCount = document.getElementById('carrito-count');
    carritoCount.textContent = carrito.length;
}