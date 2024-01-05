import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from "vue-gtag";
import { createPinia } from 'pinia'
import './assets/style.css'

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueGtag, {
    config: { id: "G-DJWC67527R" }
  }).mount('#app')
