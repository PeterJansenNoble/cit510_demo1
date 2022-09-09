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




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
            path: '/aboutapp',
            name: 'AboutApp',
            component: AboutApps
          },
          {
            path: '/quizapp',
            name: 'QuizApp',
            component: QuizApp
          },
          
          
    
    
  ]
})

export default router
