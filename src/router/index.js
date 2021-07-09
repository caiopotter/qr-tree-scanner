import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Scanner from '../views/Scanner.vue'
import Collection from '../views/Collection.vue'
import CollectionDetails from '../views/CollectionDetails.vue'
import GardenMap from '../views/GardenMap.vue'
import Tutorial from '../views/Tutorial.vue'
import ParkList from '../views/ParkList.vue'
import About from '../views/About.vue'
import Intro from '../views/Intro.vue'

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
    path: '/ajuda',
    name: 'Help',
    component: Tutorial,
  },
  {
    path: '/parques',
    name: 'ParkList',
    component: ParkList
  },
  {
    path: '/intro',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/sobre',
    name: 'About',
    component: About
  },

  { path: '*', redirect: '/colecao' }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
