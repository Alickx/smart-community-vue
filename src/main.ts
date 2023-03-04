import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import '/@/assets/styles/reset.less';
import 'uno.css';
import 'vue-global-api';
import '/@/config/elementPlus';
import { VueMarkdownEditor } from '/@/config/vue-md-editor/config.js';

// 支持SVG
import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(router).use(piniaStore).use(VueMarkdownEditor).mount('#app');
