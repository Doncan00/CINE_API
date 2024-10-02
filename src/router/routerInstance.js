import { createMemoryHistory, createRouter } from 'vue-router'

import movieHome from '@/components/movieHome.vue'
import MovieDetails from '@/MovieDetails.vue'
import SeriesInfo from '@/components/tvDetails/SeriesInfo.vue'
import KeywordResults from '@/KeywordResults.vue'
import { createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: movieHome },
  { path: '/movie-details/:id', component: MovieDetails },
  { path: '/keyword/:id', component: KeywordResults },
  { path: '/series-details/:id', component: SeriesInfo },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;