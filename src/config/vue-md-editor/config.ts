import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
// 引入使用主题的样式


VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

export {
  VueMarkdownEditor,
}
