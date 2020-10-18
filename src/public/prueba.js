const container = document.querySelector("#prueba");
const btn = document.querySelector("#btnTest");
const prueba = async () => {
  try {
    const { data } = await axios.get("/views/proveedores");

    console.log(data);

    container.innerHTML = data;
  } catch (err) {
    console.error("Error enla ruta ", err);
  }
};

btn.addEventListener("click", prueba);
