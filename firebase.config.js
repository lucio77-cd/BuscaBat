import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Analytics é opcional para o desenvolvimento, mas vou deixar aqui
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyANJCB3peETT_RsdQz9zN8Fb5DZbveiEVk",
  authDomain: "busca--bat.firebaseapp.com",
  projectId: "busca--bat",
  storageBucket: "busca--bat.firebasestorage.app",
  messagingSenderId: "780453102818",
  appId: "1:780453102818:web:b90f577a5a1114084d0abb",
  measurementId: "G-K5SNBTLXE3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias para usar nos outros arquivos
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
