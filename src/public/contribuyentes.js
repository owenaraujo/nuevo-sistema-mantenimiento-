const listcontribuyentes = document.querySelector("#listcontribuyentes");
const estadoInfo = document.querySelector("#InfoEstado");

const parroquiaLista = document.querySelector("#parroquia");
const municipioLista = document.querySelector("#municipio");
const estadosLista = document.querySelector("#estado");
const municipioInfo = document.querySelector("#InfoMunicipio");
const parroquiaInfo = document.querySelector("#InfoParroquia");
const modal = document.querySelector("#modal");
const modalVisitas = document.querySelector("#visitas");
const registrarVisita = document.querySelector("#registrarVisita");
const alertConten = document.querySelector("#alertConten");
const modaleditOculto = document.querySelector("#modaleditOculto");
const formContribuyente = document.querySelector("#formContribuyente");
const alerta = document.querySelector("#alerta");
const alertaContent = document.querySelector("#alerta").innerHTML;
// const notificacionAdd = document.querySelector("#notificacionAdd");
// const btnEdit = document.querySelector("#btnEdit");

const btnregistrar = document.querySelector("#btnregistrar");
// const notificacionRemove = document.querySelector("#notificacionRemove");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const formModalVisita = document.querySelector("#formData");
const getContribuyentes = async () => {
  try {
    const { data } = await axios.get("/req/contribuyentes/");
    setTableContribuyentes(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const modalEdit = (contribuyentes) => {
  let form = "";
  if (contribuyentes.length === 0) {
    listcontribuyentes.innerHTML = `<h1 class="text-center h1 mt-4">no hay contribuyentes registrados</h1>`;
    return;
  }
  for (let i = 0; i < contribuyentes.length; i++) {
    const contribuyente = contribuyentes[i];

    form += `<div class="card">
    <div class="card-body">
      <div class="form-group" class="card">
        <form id="formcontribuyentes-edit" action="">
          <div class="">
            <input
              value="${contribuyente.rif}"
              autocomplete="off"
              class="form-control mb-2"
              type="text"
              id="rif_edit"
              placeholder="rif"
            />
          </div>
          <input
            value="${contribuyente.contribuyente}"
            autocomplete="off"
            class="form-control mb-2"
            type="text"
            id="contribuyente_edit"
            placeholder="contribuyente"
          />
          <input
            value="${contribuyente.id}"

            autocomplete="off"
            class="d-none form-control mb-2"
            type="text"
            id="id_edit"
            placeholder="contribuyente"
          />
          </form>
          <div id="boton-edit">
            <input class="btn btn-primary" type="reset" value="Reset" />
            <button onclick="sendEdit()" id="btnEdit" class="btn btn-success">Guardar</button>
          </div>
      </div>
    </div>
  </div>
  `;
  }
  formContribuyente.innerHTML = form;
};
const editContribuyente = async (id) => {
  const { data } = await axios.get(`/req/visitas/contribuyente/${id}`);
  modalEdit(data);
  modaleditOculto.classList.remove("d-none");
};
const modalInfoContribuyente = document.querySelector(
  "#modalInfoContribuyente"
);
// get herramienta--->
const setTableContribuyentes = (contribuyentes) => {
  let list = "";
  if (contribuyentes.length === 0) {
    listcontribuyentes.innerHTML = `<h1 class="text-center h1 mt-4">no hay contribuyentes registrados</h1>`;
    return;
  }
  for (let i = 0; i < contribuyentes.length; i++) {
    const contribuyente = contribuyentes[i];

    list += `<tr>
        <th>${i + 1}</th>
        <th>${contribuyente.contribuyente}</th>
        <th>${contribuyente.rif}</th>
        <th>${contribuyente.iseniat}</th>
        <th>    <button class="btn btn-danger btn-sm" onclick="deleteContribuyente(${
          contribuyente.id
        })">eliminar</button>
        <button class="btn btn-warning btn-sm" onclick="InfoContribuyente(${
          contribuyente.id
        }),InfoVisistas(${contribuyente.id})">detalles</button>
        <button class="btn btn-success btn-sm" onclick="editContribuyente(${
          contribuyente.id
        })">editar</button>
        </th>
        </tr>`;
  }
  listcontribuyentes.innerHTML = list;
  // listcontribuyentes.innerHTML = list;
};
const listInfocontribuyentes = (data) => {
  let list = "";
  if (data.length === 0) {
    modalInfoContribuyente.innerHTML = `<p class="text-center mt-4">no hay visitas registradas</p>`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const visita = data[i];
    id = ` <input
 class="form-control"
 type="text"
 id="id_contribuyente"
 value="${visita.id}"
 placeholder="search"
/>`;
    list += `<div class="row">
    <p class="col-6 mt-2">RIF N°: ${visita.rif}</p>
    <p class="col-6 mt-2">${visita.contribuyente}</p>
  </div>
  </div>`;
  }
  modalInfoContribuyente.innerHTML = list;
  document.querySelector("#div_contribuyente").innerHTML = id;
};
const InfoContribuyente = async (id) => {
  const { data } = await axios.get(`/req/visitas/contribuyente/${id}`);
  const [datos] = data;
  const estado = datos.estado;
  const cuidad = datos.cuidad;
  const sede = datos.sede;
  await listInfocontribuyentes(data);
  await vistaEstado(estado);
  await vistaMunicipio(cuidad);
  await vistaParroquia(sede);

  await modal.classList.remove("d-none");
};
// consulta estado
const vistaEstado = async (estado) => {
  try {
    const { data } = await axios.get(`/req/estados/${estado}`);
    const [datos] = data;
    estadoInfo.innerHTML = `${datos.estado}`;
  } catch (error) {
    console.log("no encontrado estado");
  }
};

// consulta estado
// consulta municipio
const vistaMunicipio = async (municipio) => {
  try {
    const { data } = await axios.get(`/req/municipio/${municipio}`);
    const [datos] = data;
    if (municipio.length === 0) {
      console.log("hola");
      return;
    }
    municipioInfo.innerHTML = `${datos.municipio}`;
  } catch (error) {
    // console.log("no encontrado municipio");
  }
};
// consulta municipio
// consulta parroquia
const vistaParroquia = async (id) => {
  const { data } = await axios.get(`/req/visitas/parroquia/${id}`);
  const [datos] = data;

  parroquiaInfo.innerHTML = `${datos.parroquia}`;
};
// consulta parroquia
const lisVisitas = (data) => {
  let list = "";
  if (data.length === 0) {
    modalVisitas.innerHTML = `<p class="text-center h5 mt-4">no hay visitas registradas</p>`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const visita = data[i];

    list += `<tr>
    <th>${i + 1}</th>
    <th>${visita.motivo}</th>
    <th>${visita.detalles}</th>
    <th>${visita.fecha}</th>
    <th>    
    <div class="btn btn-danger btn-sm" onclick="deleteVisita(${
      visita.id
    })">eliminar</div>
    <btn class="btn btn-blue btn-sm "onclick="alert('${visita.detalles} ${
      visita.observacion
    }')"> info  
      </btn>
    </th>
    </tr>`;
  }
  modalVisitas.innerHTML = list;
};
const deleteVisita = async (id) => {
  await axios.get(`/post/visitas/delete/${id}`);
  InfoVisistas(id_contribuyente.value);

  modal.classList.remove("d-none");
};
const InfoVisistas = async (id) => {
  const { data } = await axios.get(`/req/visitas/${id}`);
  lisVisitas(data);

  modal.classList.remove("d-none");
};
// options estados
const estados = async () => {
  const { data } = await axios.get("/req/estados/");
  insertOptionsEstados(data);
};
const insertOptionsEstados = (data) => {
  let body = ``;
  if (data.length === 0) {
    estadosLista.innerHTML = `hola`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const estado = data[i];
    selected = `<option selected disabled value="">seleccione un estado</option>`;
    body += `<option value="${estado.id_estado}">${estado.estado}</option>`;
  }
  estadosLista.innerHTML = selected + body;
};
// options estados
// option municipios
estadosLista.addEventListener("change", async () => {
  try {
    const { data } = await axios.get(`/req/municipios/${estadosLista.value}`);
    insertOptionsmunicipio(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
const insertOptionsmunicipio = (data) => {
  let body = ``;
  if (data.length === 0) {
    municipioLista.innerHTML = `hola`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const municipio = data[i];
    selected = `<option selected disabled value="">seleccione un municipio</option>`;
    body += `<option value="${municipio.id_municipio}">${municipio.municipio}</option>`;
  }
  municipioLista.innerHTML = selected + body;
};
// option municipios
// option parroquias
municipioLista.addEventListener("change", async () => {
  try {
    const { data } = await axios.get(`/req/parroquia/${municipioLista.value}`);
    insertOptionsparroquias(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
const insertOptionsparroquias = (data) => {
  let body = ``;
  if (data.length === 0) {
    parroquiaLista.innerHTML = `hola`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const parroquia = data[i];
    selected = `<option selected disabled value="">seleccione un municipio</option>`;
    body += `<option value="${parroquia.id_parroquia}">${parroquia.parroquia}</option>`;
  }
  parroquiaLista.innerHTML = selected + body;
};
// option parroquias
// <--- get herramientao

// add product----->
const addContribuyente = async () => {
  try {
    await axios.post(
      "/post/contribuyentes/",
      (data = {
        contribuyente: contribuyente.value,
        rif: nacionalidad.value + rif.value,
        cuidad: municipio.value,
        estado: estado.value,
        sede: parroquia.value,
        iseniat: iseniat.value,
      })
    );

    $("#formcontribuyentes")[0].reset();

    alerta.innerHTML += ` <div
      class="alert alert-success alert-dismissible fade show "
      role="alert"
      id=""
    >
    <strong>exitoso!</strong> el contribuyente fue agregado
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;

    getContribuyentes();
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const addVisita = async () => {
  try {
    await axios.post(
      "/post/visita/",
      (data = {
        id_contribuyente: id_contribuyente.value,
        tipo_consulta: tipo_consulta.value,
        motivo: motivo.value,
        detalles: detalles.value,
        observacion: observaciones.value,
      })
    );
    InfoVisistas(id_contribuyente.value);
    // formModalVisita.reset();
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const cerrarModal = () => {
  modal.classList.add("d-none");
  modalVisitas.innerHTML = ``;
  estadoInfo.innerHTML = ``;
  municipioInfo.innerHTML = ``;
  parroquiaInfo.innerHTML = ``;
};
const alertclass = document.querySelector("#alertClass");
// delete contribuyente
const deleteContribuyente = async (id) => {
  try {
    await axios.get(`/post/delete/${id}`);

    alerta.innerHTML += ` <div
    class="alert alert-danger alert-dismissible fade show "
    role="alert"
    id=""
  >
  <strong>Borrado!</strong> el contribuyente fue borrado
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    getContribuyentes();
  } catch (error) {
    console.error("error en delete contribuyente ");
  }
};
// delete contribuyente
// ------> eventos
window.onload = async () => {
  await getContribuyentes();
  await estados();
};
btnregistrar.addEventListener("click", (e) => {
  e.preventDefault();
  addContribuyente(
    contribuyente.value,
    rif.value,
    municipio.value,
    estado.value,
    parroquia.value,
    iseniat.value,
    nacionalidad.value
  );
});

registrarVisita.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    addVisita(
      tipo_consulta.value,
      motivo.value,
      detalles.value,
      observaciones.value,
      id_contribuyente.value
    );
  } catch (error) {}
});
btnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.get(
      `/req/searchContribuyente/${search.value}`
    );
    setTableContribuyentes(data);
    formSearch.reset();
  } catch (err) {
    getContribuyentes();
    console.error("No se pudo conectar con el servidor");
  }
});
// // <----- eventos
const formSearch = document.querySelector("#formSearch");

const sendEdit = async () => {
  console.log(contribuyente_edit.value, rif_edit.value, id_edit.value);
  try {
    await axios.post(
      `/post/contribuyentes/edit/${id_edit.value}`,
      (data = {
        contribuyente: contribuyente_edit.value,
        rif: rif_edit.value,
      })
    );

    modaleditOculto.classList.add("d-none");
    getContribuyentes();
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
    alert("error");
  }
};
const editar = async (data) => {
  console.log(data);
};
