
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
        toastrError('Usuairo no encontrado, verifica tu datos.','Login');
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
        <h3>Bienvenido</h3>
        <button type="submit" onclick="salir()" class="btn btn-primary">Salir</button>
        `;
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
    console.log("Saliendo ....");
    content.innerHTML = ``;
  }).catch(function(error){
    console.log(error);
  })
}

function verific(){
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log("Enviando correo ... ");
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
