//import './assets/main.css'
import "./components/tvDetails/css/card.css"
import "./components/tvDetails/css/seriesPage.css"
import "./components/tvDetails/css/table.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routerInstance'

createApp(App)
    .use(router)
    .mount('#app')
