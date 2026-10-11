import './design-system/style/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {ProjectDi} from "@/di/di.ts";
import { i18n } from '@/i18n'


ProjectDi();

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
