<template>
    <div class="h-100%">
        <Toolbar class="border-b-1 border-b-[#ccc]" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
        <Editor class="overflow-hidden" v-model="htmlContent" :defaultConfig="editorConfig" mode="default"
            @onCreated="handleCreated" />
    </div>
</template>

<script setup lang="ts">

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { editorConfig, toolbarConfig } from './config'

const editorRef = shallowRef()
let htmlContent = ref('')


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor
}


defineExpose({
    htmlContent
})




</script>
