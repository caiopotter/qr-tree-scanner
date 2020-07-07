import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Scanner from '../views/Scanner.vue'
import Collection from '../views/Collection.vue'
import CollectionDetails from '../views/CollectionDetails.vue'
import GardenMap from '../views/GardenMap.vue'

Vue.use(VueRouter)

const routes = [
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
  },
  {
    path: '/colecao/detalhes',
    name: 'Details',
    component: CollectionDetails,
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scanner,
  },
  {
    path: '/mapa',
    name: 'Map',
    component: GardenMap,
  },
  {
    path: '/sobre',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', redirect: '/colecao' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
