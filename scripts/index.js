// constants
const pass_len = 9;

//might have to put somewhere private, have to put this somewhere private tho
// new database config
const firebaseConfig = {
    apiKey: "AIzaSyDYepSXxpwdIDnC6iZU2_ADkPf_WtB_f00",
    authDomain: "dao-portal-64884.firebaseapp.com",
    databaseURL: "https://dao-portal-64884-default-rtdb.firebaseio.com",
    projectId: "dao-portal-64884",
    storageBucket: "dao-portal-64884.appspot.com",
    messagingSenderId: "852120286878",
    appId: "1:852120286878:web:0b5c1a029c3a5a7460ad8f",
    measurementId: "G-MH464YG63V"
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
    
    // allows for registering with ucsd emails only
    if (!email.endsWith(`@ucsd.edu`)) {
        alert('Invalid email');
        return;
    }

    // password meets required length
    if (password.length < pass_len) {
        alert('Password must be at least 9 characters');
        return;
    }
    // password must match confirm password
    if (password != confirm_pass) {
        alert('Passwords must match!');
        return;
    }

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