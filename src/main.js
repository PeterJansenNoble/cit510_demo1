import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import '@fortawesome/fontawesome-free/js/all'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlUrTHmDCgIRYIhWIiNl_wZuhvC8qErvU",
  authDomain: "vue3-app-f3f37.firebaseapp.com",
  projectId: "vue3-app-f3f37",
  storageBucket: "vue3-app-f3f37.appspot.com",
  messagingSenderId: "121056243683",
  appId: "1:121056243683:web:514eec776b0bb09b57fad6",
  measurementId: "G-YFHY5LBQER"
};

// Initialize Firebase
initializeApp(firebaseConfig);


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
