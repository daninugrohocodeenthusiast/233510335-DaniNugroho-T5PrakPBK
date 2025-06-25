import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // Import createPinia

const app = createApp(App)
const pinia = createPinia() // Create Pinia instance

app.use(pinia) // Use Pinia
app.mount('#app')