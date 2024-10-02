import { createMemoryHistory, createRouter } from 'vue-router'

import movieHome from '@/components/movieHome.vue'
import MovieDetails from '@/movieDetails.vue'
import SeriesInfo from '@/components/tvDetails/SeriesInfo.vue'
import KeywordResults from '@/KeywordResults.vue'
import GenreResults from '@/GenreResults.vue'
import Login from '@/components/Login.vue'
import { createWebHistory } from 'vue-router'
import SeasonsInfo from '@/components/tvDetails/SeasonsInfo.vue'

const routes = [
  { path: '/', component: movieHome },
  { path: '/movie-details/:id', component: MovieDetails },
  { path: '/keyword/:id', component: KeywordResults },
  { path: '/genre/:id', component: GenreResults },
  { path: '/series-details/:id', component: SeriesInfo },
  { path: '/series-details/:id/season/:seasonId', component: SeasonsInfo },
  
  { path: '/Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;