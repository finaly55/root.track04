import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

import firebase from 'firebase'
import Exercice1Page from "@/views/Exercice1Page";
import Exercice2Page from "@/views/Exercice2Page";
import Exercice3Page from "@/views/Exercice3Page";
import Exercice4Page from "@/views/Exercice4Page";
import Exercice5Page from "@/views/Exercice5Page";
import Exercice6Page from "@/views/Exercice6Page";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false
    },
    component: LoginPage
  },
  /*{
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },*/
  {
    path: '/exo1',
    name: 'Exercice 1',
    component: Exercice1Page,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exo2',
    name: 'Exercice 2',
    component: Exercice2Page,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exo3',
    name: 'Exercice 3',
    component: Exercice3Page,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exo4',
    name: 'Exercice 4',
    component: Exercice4Page,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exo5',
    name: 'Exercice 5',
    component: Exercice5Page,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exo6',
    name: 'Exercice 6',
    component: Exercice6Page,
    meta: {
      requiresAuth: true
    }
  },

  {
    // will match everything other, redirect to home
    path: '*',
    beforeEnter: (to, from, next) => {
      next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next({ name: 'Login' })
  }
  if (!requiresAuth && currentUser) {
    next({ name: 'Home' })
  } else next()
})

export default router
