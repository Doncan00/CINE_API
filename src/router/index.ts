import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import SerieDetails from '../views/SeriesInfo.vue';
import TempDetails from '../views/SeasonsInfo.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/series/:serieId',  // Ruta dinámica con parámetro serieId
      name: 'SerieDetails',
      component: SerieDetails,
      children: [
        {
          path: 'temp/:tempId',  // Ruta dinámica para temporadas dentro de la serie
          name: 'TempDetails',
          component: TempDetails,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
