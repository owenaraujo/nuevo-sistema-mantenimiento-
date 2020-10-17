const btnreq = document.querySelector("#req");
const listMachine = document.querySelector("#listMachine");
const btnSearch = document.querySelector("#btnSearch");
const search = document.querySelector("#search");
const savePieza = document.querySelector("#savePieza");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");

// set data table products
const setTableMachine = (piezas) => {
  $("#searchForm")[0].reset();
  let body = "";

  for (let i = 0; i < piezas.length; i++) {
    const pieza = piezas[i];
    body += `
                <tr>
                  <th>${i + 1}</th>
                  <th>${pieza.nombre_pieza}</th>
                  <th>${pieza.codificacion}</th>
                  <th>${pieza.medidas}</th>
                  <th>${pieza.subsistema}</th>
                </tr>`;
  }
  listMachine.innerHTML = body;
};
// add machine-------->
const addPieza = async () => {
  notificacionAdd.classList.remove("d-none");
  try {
    await axios.post(
      "/post/piezas/add",
      (data = {
        nombre_pieza: nombre_pieza.value,
        pieza_equipo_id: pieza_equipo_id.value,
        detalles: detalles.value,
        subsistema: subsistema.value,
        funcionamiento: funcionamiento.value,
        medidas: medidas.value,
        codificacion: codificacion.value,
      })
    );
    $("#form")[0].reset();
    $("#req").click();
    
  } catch (err) {
    console.log("epa hay algo mal");
  }
};
// <---- ad machine

btnreq.addEventListener("click", async () => {
  try {
    const { data } = await axios.get(`/req/equipos/piezas/${idMaquina.value}`);
    setTableMachine(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
btnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.get(
      `/req/equipos/piezas/search/${idMaquina.value}/${search.value}`
    );
    setTableMachine(data);
   
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
savePieza.addEventListener("click", (e) => {
  e.preventDefault();
  addPieza(
    nombre_pieza.value,
    pieza_equipo_id.value,
    detalles.value,
    subsistema.value,
    funcionamiento.value,
    medidas.value,
    codificacion.value
  );
});
notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});
