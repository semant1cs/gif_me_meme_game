import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import authStore from "./Store/AuthStore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "gif-me-meme-9955d.firebaseapp.com",
    projectId: "gif-me-meme-9955d",
    storageBucket: "gif-me-meme-9955d.appspot.com",
    messagingSenderId: "327226329844",
    appId: "1:327226329844:web:cf05c750473f41259e2ca1",
    measurementId: "G-PVPE4C1WKT",
});

const db = getFirestore(app);
const storage = getStorage(app)

authStore.setStorage(storage)
authStore.setDataBase(db);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);