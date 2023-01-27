export const editorConfig = {
    'placeholder': '请输入内容',
}

export const toolbarConfig = {

}

// 注册插件
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'


Boot.registerModule(markdownModule)
