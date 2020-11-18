const form_signup = `<div class="card">
 <div class="card-header">
         <h1 class="h4 text-center"> Registrar</h1>
 </div>
 <div class="list-scroll-main">
 <div class="card-body">
     
    
         <form class="form-group">
             
             <div class=" md-form">
                 <i class="fas fa-user prefix"></i>
                 <input autocomplete="off" type="text"
                     name="" id="username_signup"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="username_ss">Ingrese nombre de usuario</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-lock prefix"></i>
                 <input autocomplete="off" type="password"
                     name="" id="password_signup"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="password_signup">Ingrese contraseña</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-check prefix"></i>
                 <input autocomplete="off" type="password"
                     name="" id="password_check"
                     class="form-control no-validate">
                 <label data-error="wrong" data-success="right"
                     for="password_check">verifique contraseña</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-question prefix"></i>
                 <input autocomplete="off" type="text"
                     name="" id="pregunta"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="password_check">Ingrese pregunta de seguridad</label>
             </div>
             <div class=" md-form">
                 <i class="fas fa-check prefix"></i>
                 <input autocomplete="off" type="text"
                     name="" id="respuesta"
                     class="form-control validate">
                 <label data-error="wrong" data-success="right"
                     for="password_check">Registre su respuesta</label>
             </div>
             </form>
             </div>
         
              
               <div class="text-center">
<button onclick="addUser()"  class="btn btn-primary">registrar</button>

</div> 
     </div>
 </div>
</div>`;
const btnMain = `<div class="text-center">
<button onclick="registrar()" class="btn btn-lg btn-primary ">registrar </button>
<button class="btn btn-success ">¿olvidó su contraseña? </button>
</div>`;
const options = document.querySelector("#options");
const btnRegistrar = document.querySelector("#btnRegistrar");
const contraseñaInvalide = ` <div
class="alert alert-danger alert-dismissible fade show "
role="alert"
id=""
>
<strong>Error!</strong> Verificacion de Contraseña incorrecta
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const alerta = document.querySelector("#alerta");
const successRegitro = ` <div
class="alert alert-success alert-dismissible fade show "
role="alert"
id=""
>
<strong>Exito!</strong> Usuario guardado con exito
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const registrar = () => {
  options.innerHTML = form_signup;
};
const addUser = () => {
  if (password_signup.value === password_check.value) {
    addUserPost(
      password_signup.value,
      username_signup.value,
      pregunta.value,
      respuesta.value
    );
    options.innerHTML = btnMain;
    alerta.innerHTML += successRegitro;
  } else {
    alerta.innerHTML += contraseñaInvalide;
  }
};
const addUserPost = async (data) => {
  try {
    await axios.post(
      "/signup/",
      (data = {
        username: username_signup.value,
        password: password_signup.value,
        pregunta_seguridad: pregunta.value,
        respuesta: respuesta.value,
      })
    );

    $("#formcontribuyentes")[0].reset();
    getContribuyentes();
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
