import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/userStore'
import {VMdEditor} from './config/md-edit-config'
import dayjs from "_dayjs@1.10.8@dayjs";
import zhCN from 'dayjs/locale/zh-cn'
import relativeTime from "_dayjs@1.10.8@dayjs/plugin/relativeTime";
dayjs.locale(zhCN)
dayjs.extend(relativeTime)

const app = createApp(App);
app.use(router)
app.use(store)
app.use(VMdEditor);
app.mount('#app')

