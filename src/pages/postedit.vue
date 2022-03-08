<template>
  <div @click="panelClose">
    <a-page-header
        :style="pageHelperStyle"
        title="发布/编辑"
        @back="backPage"
    >
      <template #extra>
        <a-button type="primary" @click.stop="panelOpen">发布文章</a-button>
        <div class="panel" :class="{ hide:!panelShow }" @click.stop>
          <a-card title="发布文章" style="width: 550px">
            <a-form
                autocomplete="off"
                @finish="postSubmit"
                :model="postForm"
                labelAlign="right"
                class="login-form"
                :label-col="{ span: 4 }"
            >
              <a-form-item label="文章题目" required="true" name="title">
                <a-input v-model:value="postForm.title" maxlength="50"></a-input>
              </a-form-item>
              <a-form-item label="分类" required="true" name="sectionUid" :rules="[{ required: true, message: '请选择分类' }]">
                <a-radio-group v-model:value="postForm.sectionUid" button-style="solid">
                  <a-space class="section-select">
                    <a-radio-button :value="data.uid" v-for="(data,index) in sectionList">
                      {{ data.name }}
                    </a-radio-button>
                  </a-space>
                </a-radio-group>
              </a-form-item>

              <a-form-item label="添加标签" name="tagUid">
                <!--              TODO 封装选择器-->
                <a-select
                    v-model:value="postForm.tagUid"
                    mode="multiple"
                    :options="tagList"
                    value="content"
                    showArrow="true"
                    placeholder="请选择标签"
                ></a-select>
              </a-form-item>

              <a-form-item label="文章封面" name="headImg">
                <a-upload
                    v-model:file-list="postForm.headImg"
                    list-type="picture"
                    :max-count="1"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    请选择文章首图
                  </a-button>
                </a-upload>
              </a-form-item>

              <a-form-item label="编辑摘要" name="summary">
                <a-textarea v-model:value="postForm.summary"
                            show-count
                            class="summary-input"
                            maxlength="50"/>
              </a-form-item>
              <a-form-item label="私密发布" name="isPublish">
                <a-checkbox v-model:checked="postForm.isPublish"></a-checkbox>
              </a-form-item>
              <div id="post-submit-button">
                <a-button type="primary" html-type="submit">发布文章</a-button>
              </div>
            </a-form>
          </a-card>
        </div>
      </template>
    </a-page-header>
    <PostEditor @textChange="textSyn"></PostEditor>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import PostEditor from "../components/PostEditor.vue";
import {onMounted, onServerPrefetch, reactive, ref} from "vue";
import {UploadOutlined} from '@ant-design/icons-vue'
import {savePost} from "../api/postapi";
import {notification} from "ant-design-vue";
import {getSectionList} from "../api/sectionapi";
import {getTagList} from "../api/tagApi";

const router = useRouter();

const backPage = () => {
  router.back();
}

const panelShow = ref(false);

onMounted(() => {
  getSectionList().then(resp => {
    if (resp.data.code === 0) {
      sectionList.value = resp.data.data;
    }
  })
  getTagList().then(resp => {
    if (resp.data.code === 0) {
      for (let item of resp.data.data) {
        tagList.value.push({
          label: item.content,
          value: item.uid
        })
      }
    }
  })
})

const pageHelperStyle = {
  border: "1px solid rgb(235, 237, 240)"
}

let postForm = reactive({
  sectionUid: '',
  title: '',
  tagUid: [],
  headImg: '',
  summary: '',
  content: '',
  isPublish: false,
  contentHtml:''
})

const sectionList = ref([])

const tagList = ref([])

//TODO OSS图片上传

const postSubmit = () => {
  if (postForm.content.length < 50) {
    notification.warn({
      message: '发布错误',
      description: '文章字数不能少于50字',
    })
  }
  savePost(postForm).then(resp => {
    if (resp.data.code === 0) {
      router.push("/post/" + resp.data.url);
    }
  })
}

const textSyn = (postContent) => {
  postForm.content = postContent.text;
  postForm.contentHtml = postContent.html;
}


const panelClose = () => {
  panelShow.value = false;
}

const panelOpen = () => {
  panelShow.value = true;
}


</script>

<style scoped>

.panel {
  position: absolute;
  top: 60px;
  right: 40px;
  z-index: 999;
}

#post-submit-button {
  display: flex;
  flex-direction: row-reverse;
  padding-top: 30px;
}

/deep/ .summary-input textarea {
  min-height: 120px;
}

/deep/ .section-select {
  flex-wrap: wrap;
}

.hide {
  display: none;
}

</style>