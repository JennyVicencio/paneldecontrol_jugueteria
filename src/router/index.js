import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: ['/home', '/inicio'],
    component: Home
  },
  {
    path: '/acerca',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/entrar',
    name: 'Login',
    alias: ['/login', '/ingresar'],
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/productos',
    name: 'Products',
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue'),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '*',
    redirect: ['/home']
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Guardia de navegación 
router.beforeEach((to, from, next) => {
  // información del usuario activo
  let user = firebase.auth().currentUser; 
  //buscamos un meta, en este caso /productos
  let login = to.matched.some(result => result.meta.requiresAdmin); 
  if (user && login) {
    // si hay usuario activos y la ruta tiene activo el meta...
    if(user.isAnonymous){
      next({name: 'Login'}); // si el usuario conectado es anónimo...
    }
    else{ // si no es anónimo puede entrar...
      next();
    }
  } 
  else {
    next();
  }
});



export default router
