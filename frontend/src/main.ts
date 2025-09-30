import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './services/router'
import pinia from './services/pinia'

createApp(App).use(router).use(pinia).mount('#app')
