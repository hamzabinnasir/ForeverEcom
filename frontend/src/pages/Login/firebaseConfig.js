import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeNOOF2sbe6tTZAkIlwTLNGOUl2JHF-r0",
  authDomain: "ecom-website-cc4c9.firebaseapp.com",
  projectId: "ecom-website-cc4c9",
  storageBucket: "ecom-website-cc4c9.firebasestorage.app",
  messagingSenderId: "985255405280",
  appId: "1:985255405280:web:0842fc3a01d9c5f94e5285",
  measurementId: "G-JD3PS5KJMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

facebookProvider.setCustomParameters({
  'display': 'popup'
});

export { auth, googleProvider, analytics, facebookProvider };
