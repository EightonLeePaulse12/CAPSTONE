import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/stylesheet/style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from "js-cookie"

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Cookies)
store.dispatch("init")
app.mount('#app')
