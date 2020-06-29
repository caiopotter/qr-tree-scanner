import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Scanner from '../views/Scanner.vue'
import Collection from '../views/Collection.vue'
import CollectionDetails from '../views/CollectionDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inicio',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/colecao',
    name: 'Collection',
    component: Collection,
    meta: {forAuth: true}
  },
  {
    path: '/colecao/:id',
    name: 'Details',
    component: CollectionDetails,
    meta: {forAuth: true}
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scanner,
    meta: {forAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
