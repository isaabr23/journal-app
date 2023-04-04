import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Esto lo sacamos de la pagina https://console.firebase.google.com/project/react-app-9fe8a/overview

const firebaseConfig = {
    apiKey: "AIzaSyDM9Gii5nlleJdO8A2_X5FsixYYrXhuCaI",
    authDomain: "react-app-9fe8a.firebaseapp.com",
    projectId: "react-app-9fe8a",
    storageBucket: "react-app-9fe8a.appspot.com",
    messagingSenderId: "1002069493794",
    appId: "1:1002069493794:web:4a0d5c8997ffe5b88f627b"
};

// Esta es la Base de Datos
firebase.initializeApp(firebaseConfig);

// Conexion a la Base de Datos
const db = firebase.firestore();

// Auth Provider para hacer autenticacion con Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


// Exportamos varias cosas 
export {
    db,
    googleAuthProvider,
    firebase
}