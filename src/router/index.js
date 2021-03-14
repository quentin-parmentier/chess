import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Themes',
    component: Home
  },
  {
    path: '/connexion',
    name: 'Connexion',
    
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/ouvertures',
    name: 'Color',
    
    component: () => import('../views/ChoixColor.vue')
  },
  {
    path: '/finales',
    name: 'Finales',
    
    component: () => import('../views/ChoixFinales.vue')
  },
  {
    path: '/ouvertures/:color',
    name: 'Ouvertures',
    
    component: () => import('../views/ChoixOuverture.vue')
  },
  {
    path: '/:type/:color/:id',
    name: 'Variantes',
    
    component: () => import('../views/ChoixVariantes.vue')
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Connexion' && !localStorage.getItem('token')) next({ name: 'Connexion' })
  else next()
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Connexion' && localStorage.getItem('token')) next({ name: 'Themes' })
  else next()
})

export default router
