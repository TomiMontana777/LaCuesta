// Importar las funciones necesarias de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Tu configuración web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCz_vMiTeBfsfkaCf7hsqcRrsApa5YaTa4",
  authDomain: "proeyecto-caf5e.firebaseapp.com",
  projectId: "proeyecto-caf5e",
  storageBucket: "proeyecto-caf5e.firebasestorage.app",
  messagingSenderId: "173536751220",
  appId: "1:173536751220:web:cf3db2cfd8afc054bb6b21"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de Firestore
const db = getFirestore(app);

export { app, db };