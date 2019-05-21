
// Your web app's Firebase configuration
firebase.initializeApp = ({
    apiKey: 'AIzaSyCsWIxjUwHRmlMzqFJFdsh0DE8QOIug_fQ',
    authDomain: 'nahuatl-45027.firebaseapp.com',
    projectId: 'nahuatl-45027'
});
  // Initialize Firebase
var db = firebase.firestore();
function guardar(){
    var nombre =  document.getElementById("nombre").value;
    var apellido =  document.getElementById("apellido").value;
    var fecha =  document.getElementById("fecha").value;
    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

   
  