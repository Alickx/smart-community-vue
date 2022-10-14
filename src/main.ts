import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import '/@/assets/styles/reset.less';
import 'uno.css';
import 'vue-global-api';
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";

// 支持SVG
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(router);
app.use(piniaStore).mount('#app');
