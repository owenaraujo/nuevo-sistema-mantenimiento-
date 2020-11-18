const btnX = document.querySelector("#btnX");

btnX.addEventListener("click", () => {
  document.querySelector("#modaleditOculto").classList.add("d-none");
});
document.querySelector("#btnCerrar").addEventListener("click", (e) => {
  e.preventDefault();
});
