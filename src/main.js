import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './index.css'

const toastOptions = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 4,
    newestOnTop: true
}

const vm = createApp(App).use(router).use(Toast, toastOptions).mount('#app')
export default vm;