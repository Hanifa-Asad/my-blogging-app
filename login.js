
const firebaseConfig = {
    apiKey: "AIzaSyC-mGYD15Kj6F2PKklkhBVpI_BpdYZ95fo",
    authDomain: "blog-app-68ac9.firebaseapp.com",
    projectId: "blog-app-68ac9",
    storageBucket: "blog-app-68ac9.firebasestorage.app",
    messagingSenderId: "902750854561",
    appId: "1:902750854561:web:69b4b3ab2c2bf062f6bfe0",
    measurementId: "G-K5MQ172QPE"
  };
// initialize firebase
firebase.initializeApp(firebaseConfig);

// logout automatically
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "./all.html";
    }
});

// show Password
function showPassword(event) {
    event.target.className = "eye bi bi-eye-slash";
    event.target.previousElementSibling.type = "text";
    event.target.removeEventListener('click', showPassword);
    event.target.addEventListener('click', hidePassword);
}

// hide password
function hidePassword(event) {
    event.target.className = "eye bi bi-eye";
    event.target.previousElementSibling.type = "password";
    event.target.removeEventListener('click', hidePassword);
    event.target.addEventListener('click', showPassword);
}

function login(event) {
    event.preventDefault()
    let email = document.getElementById("email-login").value
    let password = document.getElementById("password-login").value
    let message = document.querySelector(".validationMessage");

    if (!(email.endsWith("@gmail.com"))) {
        message.innerText = `Invalid email address`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    if (
        email.trim() === '' ||
        password.trim() === ''
        // || password.length > 8 || password.length < 4
    ) {
        message.innerText = `Please fill required fields`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    // firebase

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // console.log("Login successful");
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'Login Successfull',
                confirmButtonColor: "#0079ff"
            })
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.log("Login error:", error);
            Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'Invalid email or password. Please enter correct credentials',
                    confirmButtonColor: "#0079ff"
                })
                // alert("Invalid email or password. Please enter correct credentials.");
        });

    document.getElementById("email-login").value
    document.getElementById("password-login").value
}