import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCP_j_CUeBBqg7oWfI0bMfiX52llP-6JJc",
    authDomain: "user-list-auth.firebaseapp.com",
    projectId: "user-list-auth",
    storageBucket: "user-list-auth.appspot.com",
    messagingSenderId: "499044353631",
    appId: "1:499044353631:web:94cc853282c3e9ca317dea"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)