import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

//桌面端适配
import '@varlet/touch-emulator'

const app = createApp(App)

app.use(router)
app.use(Varlet)

app.mount('#app')
