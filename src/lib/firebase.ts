// src/lib/firebase.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  "projectId": "imposter-squad-husmo",
  "appId": "1:206708847905:web:7f23f67ac70f0267f4fa60",
  "storageBucket": "imposter-squad-husmo.firebasestorage.app",
  "apiKey": "AIzaSyCJRGT1bIjWfipPIj4ziG4U3snSXBlBi4E",
  "authDomain": "imposter-squad-husmo.firebaseapp.com",
  "messagingSenderId": "206708847905"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
