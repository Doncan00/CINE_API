//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import movieDetails from './movieDetails.vue'
import KeywordResults from './KeywordResults.vue'
import movieHome from './components/movieHome.vue'
import Login from './components/Login.vue'

createApp(KeywordResults).mount('#app')
