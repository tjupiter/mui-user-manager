import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnIH7E_cFGxQH0XA-_Ss4GbAHRZV0nCq4",
  authDomain: "mui-userstable-db.firebaseapp.com",
  databaseURL:
    "https://mui-userstable-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mui-userstable-db",
  storageBucket: "mui-userstable-db.appspot.com",
  messagingSenderId: "2717860049",
  appId: "1:2717860049:web:f6af7db09dbd532b7385f0",
  measurementId: "G-WBBWZHSP5F",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
