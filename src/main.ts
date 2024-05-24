// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(NutUI)

app.mount('#app')
