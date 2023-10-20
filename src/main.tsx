import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import authStore from "./Store/AuthStore";

const app = initializeApp({
  apiKey: "AIzaSyCHcsIf-88YIT1NVKzcmdnjuNGIqPDofe8",
  authDomain: "gif-me-meme.firebaseapp.com",
  projectId: "gif-me-meme",
  storageBucket: "gif-me-meme.appspot.com",
  messagingSenderId: "870472028239",
  appId: "1:870472028239:web:1824024df9724c456b9a3a",
  measurementId: "G-3EWDEFSLNC",
});

const db = getFirestore(app);
authStore.setDataBase(db);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
