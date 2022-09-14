import { createRouter, createWebHistory } from 'vue-router'
import BasicMathView from '../views/BasicMathView.vue'
import StringAppView from '../views/StringAppView.vue'
import HomeView from '../views/StringAppView.vue'
import Vuetify from '../views/Vuetify.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import Axios from '../views/Axiosdemo.vue'
import AboutApps from '../views/AboutApps.vue'
import QuizApp from '../views/QuizApp.vue'
import Register from '../views/Register.vue'
import SignIn from '../views/SignIn.vue'
import Feed from '../views/Feed.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from '@firebase/util'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn
    },
    {
      path: '/stringApp',
      name: 'StringAppView',
      component: StringAppView
    },
    {
    path: '/basicMath',
    name: 'basicMath',
    component: BasicMathView
    },
    {
      path: '/vuetify',
      name: 'Vuetify',
      component: Vuetify
      },
      {
        path: '/about',
        name: 'About',
        component: About
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
          },
          {
            path: '/axios',
            name: 'Axiosdemo',
            component: Axios
          },
          {
            path: '/aboutapps',
            name: 'AboutApps',
            component: AboutApps
          },
          {
            path: "/quizapp",
            component: () => import("../views/QuizApp.vue"),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
          },
          {
            path: '/register',
            name: 'Register',
            component: Register
          },
          {
            path: '/feed',
            name: 'Feed',
            component: Feed
          },
          
          
          
    
    
  ]
})
const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  }); 
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()) {
      next();
    }else{
      alert("you dont have access!");
      next("/signIn");
    }

  }else{
    
    next();
  }
});

export default router
