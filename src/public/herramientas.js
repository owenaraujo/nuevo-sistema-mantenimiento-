const btnGetherramienta = document.querySelector("#btnGetherramienta");
const listherramienta = document.querySelector("#listherramienta");
const loader = document.querySelector("#loader");
const notificacionAdd = document.querySelector("#notificacionAdd");
const saveHerramienta = document.querySelector("#saveHerramienta");
const notificacionRemove = document.querySelector("#notificacionRemove");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");

// get herramienta--->
const setTableherramienta = (herramientas) => {
  let body = "";

  for (let i = 0; i < herramientas.length; i++) {
    const herramienta = herramientas[i];
    body += `<tr>
        
        <th>${i + 1}</th>
        <th><h1 class="${herramienta.tipo}"></h1></th>
        <th>${herramienta.nombre}</th>
        <th>${herramienta.detalles}</th>
        <th>${herramienta.cantidad}</th>
      
      </tr>`;
  }
  listherramienta.innerHTML = body;
};

const getherramientas = async () => {
  loader.classList.remove("d-none");
  try {
    const { data } = await axios.get("/req/herramientas/");
    // console.log(data);
    setTableherramienta(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }

  loader.classList.add("d-none");
};

// <--- get herramientao

// add product----->
const addHerramienta = async () => {
  notificacionAdd.classList.remove("d-none");

  try {
    await axios.post(
      "/post/herramientas/",
      (data = {
        nombre: nombre.value,
        detalles: detalles.value,
        tipo: tipo.value,
        cantidad: cantidad.value,
      })
    );

    $("#form")[0].reset();
    getherramientas();
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <--- add product

// ------> eventos
btnGetherramienta.addEventListener("click", getherramientas);
saveHerramienta.addEventListener("click", (e) => {
  e.preventDefault();
  addHerramienta(nombre.value, detalles.value, cantidad.value, tipo.value);
});
notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});

btnSearch.addEventListener("click", async () => {
  try {
    const { data } = await axios.get(`/req/herramientas/${search.value}`);
    setTableherramienta(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
// <----- eventos
