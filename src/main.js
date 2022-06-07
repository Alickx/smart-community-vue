import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/userStore'
import {VMdEditor} from './config/md-edit-config'
import dayjs from "dayjs";
import zhCN from 'dayjs/locale/zh-cn'
import relativeTime from "dayjs/plugin/relativeTime";
import 'ant-design-vue/es/modal/style/index'
import 'ant-design-vue/es/message/style/index'
import 'ant-design-vue/es/notification/style/index'
import './index.css'
import { ConfigProvider } from 'ant-design-vue';
dayjs.locale(zhCN)
dayjs.extend(relativeTime)

const app = createApp(App);
app.use(router)
app.use(store)
app.use(VMdEditor);
app.use(ConfigProvider)
app.mount('#app')
// SocketService.Instance.connect()
// app.config.globalProperties.$socket = SocketService.Instance

