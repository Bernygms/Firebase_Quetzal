$("#crud").hide();
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCsWIxjUwHRmlMzqFJFdsh0DE8QOIug_fQ",
  authDomain: "nahuatl-45027.firebaseapp.com",
  databaseURL: "https://nahuatl-45027.firebaseio.com",
  projectId: "nahuatl-45027",
  storageBucket: "nahuatl-45027.appspot.com",
  messagingSenderId: "692565166964",
};
// Initialize Firebase
var init = firebase.initializeApp(firebaseConfig);

console.log(init);

function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if(email == ''){
    toastrError('Ingresa tu correo electronico.','Registro');
  }else if(password == ''){
    toastrError('Ingresa tu contraseña', 'Registro');
  }else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
        toastrExito('La cuenta se acreado. correctamente.','Registro')
        verific();
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if(errorCode == 'auth/weak-password'){
        toastrError('Password should be at least 6 characters.','Registro');
      }else if(errorCode == 'auth/invalid-email'){
        toastrError('La dirección de correo electrónico está mal formateada.','Registro');
      }else if(errorCode == 'auth/email-already-in-use'){
        toastrError('La dirección de correo electrónico ya está en uso por otra cuenta.','Registro');
      }
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
}
function login(){
  var email = document.getElementById("email_login").value;
  var password = document.getElementById("password_login").value;
  if(email == ''){
    toastrError('Ingresa tu correo electronico.','Login');
  }else if(password == ''){
    toastrError('Ingresa tu contraseña', 'Login');
  }else {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      toastrExito('Explora y diviertete ...','Bienvenido,');
      document.getElementById('email_login').value = "";
      document.getElementById('password_login').value = "";
      $("#crud").show();
      
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      if(errorCode == 'auth/invalid-email'){
        toastrError('Correo no valida, intenta nuevamente.','Login');
      }else if(errorCode == 'auth/wrong-password'){
        toastrError('Contraseña incorrecta, intenta nuevamente.','Login');
      }else if(errorCode == 'auth/user-not-found'){
        toastrError('Usuairo no encontrado, verifica tus datos.','Login');
      }
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
}

var content = document.getElementById('_welcome_page');
function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if (user.emailVerified == true) {
        content.innerHTML = `
        <div class="alert alert-success mt-2" role="alert">
          <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
          <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
          <hr>
          <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
          <button type="submit" onclick="salir()" class="btn btn-danger">Salir</button>
          </div>       
        `;
        $("#crud").show();
      }else{
        content.innerHTML = `
        <h3>Bienvenido, </h3>
        <div class="">Activa tu cuenta, desde tu correo electronico ${user.email}.</div>
        <button type="submit" onclick="salir()" class="btn btn-primary">Salir</button>
        `;
        
        toastrExito(`Activa tu cuenta, desde tu correo electronico ${user.email}.`, 'Ativacion');
      }
    } else {
      toastrInformativa('No existe  usuario activo','Usuario');
    }
  });

}

observador();

function salir(){
  firebase.auth().signOut()
  .then(function () {
    toastrInformativa('Saliendo del sistema.','Sesion');
    $("#crud").hide();
    content.innerHTML = ``;
  }).catch(function(error){
    console.log(error);
  })
}

function verific(){
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  toastrInformativa('Enviando correo ...','Email');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}



function toastrError(message, title){
  toastr.error(message,title,{
    "positionClass": "toast-bottom-right"
  });
}
function toastrExito(message, title){
  toastr.success(message,title,{
    "positionClass": "toast-bottom-right"
  });
}
function toastrInformativa(message, title){
  toastr.info(message,title,{
    "positionClass": "toast-bottom-right"
  });
}
