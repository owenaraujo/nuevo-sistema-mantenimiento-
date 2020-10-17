const btnGetProducts = document.querySelector("#btnGetProduct");
const form = document.querySelector("#form");
const listProduct = document.querySelector("#listProduct");
const loader = document.querySelector("#loader");
const btnSaveProduct = document.querySelector("#saveProduct");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
// get product--->
const setTableProduct = (products) => {
  let body = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    body += `<tr>
        <th>${i + 1}</th>
        <th>${product.producto}</th>
        <th>${product.codificacion}</th>
        <th  id="${
          product.id
        }"><button class="btn btn-danger">delete</button></th>
      
      </tr>`;
  }
  listProduct.innerHTML = body;
};

const getProducts = async () => {
  loader.classList.remove("d-none");
  try {
    const { data } = await axios.get("/req/productos/");

    setTableProduct(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }

  loader.classList.add("d-none");
};

// <--- get producto

// add product----->
const addProdut = async () => {
  notificacionAdd.classList.remove("d-none");

  try {
    await axios.post(
      "/post/productos/",
      (data = {
        producto: producto.value,
        codificacion: codificacion.value,
        categoria: categoria.value,
        precio_menor: precio_menor.value,
        precio_mayor: precio_mayor.value,
      })
    );

    $("#btnGetProduct").click();
    $("#form")[0].reset();
    // console.log(res.data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <--- add product
btnGetProducts.addEventListener("click", getProducts);
btnSaveProduct.addEventListener("click", (e) => {
  e.preventDefault();
  addProdut(
    producto.value,
    codificacion.value,
    categoria.value,
    precio_menor.value,
    precio_mayor.value
  );
});
notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});
btnSearch.addEventListener("click", async () => {
  try {
    const { data } = await axios.get(`/req/productos/${search.value}`);
    setTableProduct(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
