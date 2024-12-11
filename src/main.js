import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index.js'
import registerComponents from './utils/registerComponents.js'

const app = createApp(App)
app.use(store)

registerComponents(app)
app.mount('#app')
