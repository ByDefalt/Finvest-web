import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {ProjectDi} from "@/di/di.ts";

ProjectDi();

createApp(App)
    .use(router)
    .mount('#app')
