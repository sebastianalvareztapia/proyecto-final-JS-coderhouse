let carrito = [];

//------------------------MOSTRAMOS-TODAS-LAS-CARDS---------------------------------

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const url = await fetch("discos.json");
        const data = await url.json();

        for (const disco of data.discos) {
            // Obtenemos el contenedor de las cards
            const contenedorCards = document.getElementById("cards-container");

            // Creamos el div para las cards
            let card = document.createElement("div");
            card.classList.add("card");

            //Definimos el innerHTML del elemento con una plantilla de texto
            card.innerHTML = `
            <img src="${disco.imagen}"  alt="...">
            <div class="card-body" >
                <h5 class="card-title">${disco.modelo}</h5>
                <h6 class="card-title">${disco.marca}</h6>
                <p class="card-text">$ ${disco.precio}</p>
                <button class="comprar" data-id="${disco.id}" id="comprar">Añadir al carro</button>
            </div>
            `;
            contenedorCards.appendChild(card);
        }

        //Cuando se toca el boton para agregar al carrito se 
        //activa este event listener y lo agrega al carrito llamando
        // al metodo agregarAlCarrito
        document.querySelectorAll('.comprar').forEach(button => {
            button.addEventListener('click', (event) => {

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Producto agregado al carrito"
                });

                const id = parseInt(event.currentTarget.dataset.id);
                agregarAlCarrito(id);
            });
        });

    } catch (error) {
        console.error(error);
    }

});

//-----------MOSTRAMOS-CARDS-DE-LAS-CATEGORIAS-SEGUN-EL-BOTON---------------


const filtro1 = document.getElementById("mountain");
const filtro2 = document.getElementById("trekk");
const filtro3 = document.getElementById("road");


filtro1.addEventListener('click', () => cargarDiscos("mountain"));
filtro2.addEventListener('click', () => cargarDiscos("trekk"));
filtro3.addEventListener('click', () => cargarDiscos("road"));

async function cargarDiscos(categoria) {

    try {

        const url = await fetch("discos.json");
        const data = await url.json();

        const contenedorCards = document.getElementById("cards-container");
        contenedorCards.innerHTML = '';

        for (const disco of data.discos) {
            // Obtenemos el contenedor de las cards
            const contenedorCards = document.getElementById("cards-container");

            if (disco.estilo === categoria) {
                // Obtenemos el contenedor de las cards
                const contenedorCards = document.getElementById("cards-container");

                // Creamos el div para las cards
                let card = document.createElement("div");
                card.classList.add("card");

                //Definimos el innerHTML del elemento con una plantilla de texto
                card.innerHTML = `
                <img src="${disco.imagen}"  alt="...">
                <div class="card-body" >
                    <h5 class="card-title">${disco.modelo}</h5>
                    <h6 class="card-title">${disco.marca}</h6>
                    <p class="card-text">$ ${disco.precio}</p>
                    <button class="comprar" data-id="${disco.id}" id="comprar">Añadir al carro</button>
                </div>
            `;
                contenedorCards.appendChild(card);
            }

        }

        //Cuando se toca el boton para agregar al carrito se 
        //activa este event listener y lo agrega al carrito llamando
        // al metodo agregarAlCarrito
        document.querySelectorAll('.comprar').forEach(button => {
            button.addEventListener('click', (event) => {

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Producto agregado al carrito"
                });

                const id = parseInt(event.currentTarget.dataset.id);
                agregarAlCarrito(id);
            });
        });


    } catch (error) {
        console.error(error);
    }

}

//---------------------------BORRAR-FILTROS------------------------------

const borrar = document.getElementById("borrar");

borrar.addEventListener('click', async () => {


    try {
        const url = await fetch("discos.json");
        const data = await url.json();

        const contenedorCards = document.getElementById("cards-container");
        contenedorCards.innerHTML = '';

        for (const disco of data.discos) {
            // Obtenemos el contenedor de las cards
            const contenedorCards = document.getElementById("cards-container");

            // Creamos el div para las cards
            let card = document.createElement("div");
            card.classList.add("card");

            //Definimos el innerHTML del elemento con una plantilla de texto
            card.innerHTML = `
        <img src="${disco.imagen}"  alt="...">
        <div class="card-body" >
            <h5 class="card-title">${disco.modelo}</h5>
            <h6 class="card-title">${disco.marca}</h6>
            <p class="card-text">$ ${disco.precio}</p>
            <button class="comprar" data-id="${disco.id}" id="comprar">Añadir al carro</button>
        </div>
        `;
            contenedorCards.appendChild(card);
        }

        document.querySelectorAll('.comprar').forEach(button => {
            button.addEventListener('click', (event) => {

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Producto agregado al carrito"
                });

                const id = parseInt(event.currentTarget.dataset.id);
                agregarAlCarrito(id);
            });
        });

    } catch (error) {
        console.error(error);
    }
});

//----------------------------------------------------------------------------

const agregarAlCarrito = async (id) => {
    try {
        const url = await fetch("discos.json");
        const data = await url.json();
        let disco = data.discos;

        const productoEnTienda = disco.find(producto => producto.id === id);

        const productoCarrito = {
            id: productoEnTienda.id,
            modelo: productoEnTienda.modelo,
            precio: productoEnTienda.precio
        };

        carrito.push(productoCarrito);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        renderizarCarrito();

    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
    }
}

//-----------------------------------------------

const renderizarCarrito = () => {

    const listaCarrito = document.getElementById('listaCarrito');
    const totalElemento = document.getElementById('total');

    listaCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `Articulo: ${producto.modelo} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalElemento.textContent = total;

}

//----------------------------------------------------------------

//actualiza el localstorage
const actualizarLocalStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
//Carga los productos guardados en el carrito del LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    const totalElemento = document.getElementById('total');

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `Articulo: ${producto.modelo} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalElemento.textContent = total;

});

//-------------------------------------------------------------------

//----------------------vacio el carro----------------------
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
    actualizarLocalStorage();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Se vació el Carrito"
    });
})
//----------------------------------------------
document.getElementById('realizarCompra').addEventListener('click', () => {
    if (carrito.length <= 0) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "error",
            title: "¡Error! - El Carrito está Vacio"
        });
    } else {
        Swal.fire({
            title: "Perfecto!",
            text: "Compra realizada exitosamente!",
            icon: "success",
            customClass: {
                confirmButton: 'swal-button-no-border', // Agrega una clase personalizada al botón de confirmación
                popup: 'swal-font-monospace'
            },
            buttonsStyling: false,
            confirmButtonText: "Aceptar"
        });
        carrito = [];
        renderizarCarrito();
        actualizarLocalStorage();
    }
})

// -----------------------------------------------------------------------


$("#header").prepend(
    '<div id="menu-icon"><span class="first"></span><span class="second"></span><span class="third"></span></div>'
);

$("#menu-icon").on("click", function () {
    $("nav").slideToggle();
    $(this).toggleClass("active");
});

