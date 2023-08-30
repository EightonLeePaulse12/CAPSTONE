import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/stylesheet/style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from "js-cookie"


createApp(App).use(VueSweetalert2).use(store).use(router).use(Cookies).mount('#app')
