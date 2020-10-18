const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const saveProveedor = document.querySelector("#SaveProveedor");
const listProveedores = document.querySelector("#listProveedores");
const listProductos = document.querySelector("#listProductos");
const listProductosTotal = document.querySelector("#listProductosTotal");
// add
const addPorveedor = async () => {
  try {
    await axios.post(
      "/post/proveedores",
      (data = {
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
      })
    );
    $("#formProveedores")[0].reset();
    getProveedores();
    notificacionAdd.classList.remove("d-none");

    console.log("oki");
  } catch (error) {
    console.log("holi");
  }
};
// add

// list add
const setTableProduct = (products) => {
  let body = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    body += `<div class="card mb-2 bg-white mb-2 text-capitalize c-hand">
    <p class="text-center h5 m-0 p-2">${product.producto}</p>
  </div>`;
  }
  listProductosTotal.innerHTML = body;
};
const getListProductos = (productos) => {
  let body = "";

  if (productos.length === 0) {
    listProductos.innerHTML = `<div class="card mb-2 bg-white mb-2 text-capitalize c-hand">
    <p class="text-center h5 m-0 p-2">no hay productos registrados</p>
  </div>`;
    return;
  }
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    body += `<div class="card mb-2 bg-white mb-2 text-capitalize c-hand" value="">
    <p class="text-center h5 m-0 p-2">${producto.producto}</p>
  </div>
`;
  }
  listProductos.innerHTML = body;
};
const getListProveedores = (proveedores) => {
  let body = "";

  if (proveedores.length === 0) {
    proveedores.innerHTML = `<div class="card mb-2 bg-primary mb-2 text-capitalize">
      <p class="text-center h5 m-0 p-2">no hay piezas registradas</p>
    </div>`;
    return;
  }
  for (let i = 0; i < proveedores.length; i++) {
    const proveedor = proveedores[i];
    body += `<div onclick='getProductos(${proveedor.id})' class="card mb-2 bg-primary mb-2 text-capitalize c-hand" value="">
      <p class="text-center h5 m-0 p-2">${proveedor.nombre}</p>
    </div>
  `;
  }
  listProveedores.innerHTML = body;
};
// list add

// get
const getProducts = async () => {
  try {
    const { data } = await axios.get("/req/productos/");

    setTableProduct(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const getProductos = async (id) => {
  try {
    const { data } = await axios.get(`/req/productos/proveedor/${id}`);
    getListProductos(data);
  } catch (error) {
    console.log("holi ");
  }
};
const getProveedores = async () => {
  try {
    const { data } = await axios.get("/req/proveedores");
    getListProveedores(data);
  } catch (error) {}
};
// get
// eventos
saveProveedor.addEventListener("click", (e) => {
  e.preventDefault();
  addPorveedor(nombre.value, correo.value, telefono.value);
});
window.onload = async () => {
  await getProveedores();
  getProducts();
};
notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});
// eventos
