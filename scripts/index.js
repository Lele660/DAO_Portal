//might have to put somewhere private
const firebaseConfig = {
    apiKey: "AIzaSyCmT2k7xuGVgSZyA_hlSoB-jSTeeVvKw6w",
    authDomain: "dao-portal.firebaseapp.com",
    projectId: "dao-portal",
    storageBucket: "dao-portal.appspot.com",
    messagingSenderId: "17033832538",
    appId: "1:17033832538:web:6065b9627e98812ac8d063",
    measurementId: "G-ZBZ26KTC95"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

function register() {
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    confirm_pass = document.getElementById("confirm_password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        user_uuid = userCredential.user.uid;
        user_data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
        };

        let database_ref = database.ref();
        database_ref.child('users/' + user_uuid).set(user_data);
        alert("Registered " + email);
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
    });
}

function login() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        let user = userCredential.user;
        alert("Login success!")
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
      });
}