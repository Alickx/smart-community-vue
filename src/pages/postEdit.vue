<template>
  <div @click="panelClose">
    <a-page-header
        :style="pageHelperStyle"
        title="发布/编辑"
        @back="backPage"
    >
      <template #extra>
        <a-button type="primary" @click.stop="panelOpen">
          {{ type === 'new' ? '发布' : '更新' }}
        </a-button>
        <div class="panel" :class="{ hide:!panelShow }" @click.stop>
          <a-card title="发布" style="width: 550px">
            <a-form
                autocomplete="off"
                @finish="postSubmit"
                :model="postForm"
                labelAlign="right"
                class="login-form"
                :label-col="{ span: 4 }"
            >
              <a-form-item label="文章题目" :required="true" name="title" :rules="[{ required: true, message: '请填写文章题目' }]">
                <a-input v-model:value="postForm.title" maxlength="50"></a-input>
              </a-form-item>
              <a-form-item label="分类" :required="true" name="categoryUid"
                           :rules="[{ required: true, message: '请选择分类' }]">
                <a-radio-group v-model:value="postForm.categoryUid" button-style="solid" @change="categoryChange">
                  <a-space class="section-select">
                    <a-radio-button :value="data.uid" v-for="(data,index) in categoryTagList">
                      {{ data.name }}
                    </a-radio-button>
                  </a-space>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="添加标签" name="tagUid" :rules="[{ required: true, message: '请选择标签' }]">
                <a-select
                    :disabled="tagList.length === 0"
                    v-model:value="postForm.tagUid"
                    mode="multiple"
                    :options="tagList"
                    value="content"
                    :showArrow="true"
                    :placeholder="tagList.length === 0 ? '请选择分类' : '请选择标签'"
                ></a-select>
              </a-form-item>
              <a-form-item label="编辑摘要" name="summary">
                <a-textarea v-model:value="postForm.summary"
                            show-count
                            class="summary-input"
                            maxlength="50"/>
              </a-form-item>
              <a-form-item label="是否公开" name="isPublish">
                <a-checkbox v-model:checked="postForm.isPublish"></a-checkbox>
              </a-form-item>
              <div id="post-submit-button">
                <a-button type="primary" html-type="submit">
                  {{ type === 'new' ? '发布文章' : '更新文章' }}
                </a-button>
              </div>
            </a-form>
          </a-card>
        </div>
      </template>
    </a-page-header>
    <PostEditor @textChange="textSyn" ref="postEditorRef"></PostEditor>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import PostEditor from "../components/post/PostEditor.vue";
import {onMounted, reactive, ref} from "vue";
import {getPostByUid, savePost} from "../api/postapi";
import {notification} from "ant-design-vue";
import {getCategoryList, getCategoryTagList} from "../api/categoryApi";
import {getTagByCategory, getTagList} from "../api/tagApi";

const router = useRouter();
const route = useRoute();

let type = ref('');
let postEditorRef = ref(null);

const backPage = () => {
  router.back();
}

const panelShow = ref(false);

onMounted(() => {
  type.value = route.params.id;
  // 如果type不为new，则请求文章详情
  if (type.value !== 'new') {
    postForm.type = '1';
    getPostDetail();
  } else {
    postForm.type = '0';
  }
  getCategoryTagList().then(resp => {
    if (resp.data.code === 0) {
      categoryTagList.value = resp.data.data;
    }
  })
})

const pageHelperStyle = {
  border: "1px solid rgb(235, 237, 240)"
}

let postForm = reactive({
  categoryUid: '',
  title: '',
  tagUid: [],
  headImg: '',
  summary: '',
  content: '',
  isPublish: true,
  contentHtml: '',
  type: '',
  uid: route.params.id === 'new' ? '' : route.params.id,
})

let categoryTagList = ref([])
let tagList = ref([])


const postSubmit = () => {
  if (postForm.content.length < 50) {
    notification.warn({
      message: '发布错误',
      description: '文章字数不能少于50字',
    })
    return;
  }
  savePost(postForm).then(resp => {
    if (resp.data.code === 0) {
      router.push("/post/" + resp.data.url);
    }
  })
}

const filterCategoryLabels = (uid) => {
  let tags = categoryTagList.value.find(item => item.uid === uid).tags;
  let temp = [];
  tags.forEach(item => {
    temp.push({
      label: item.content,
      value: item.uid
    });
  })
  tagList.value = temp;
}


const categoryChange = (event) => {
  tagList.value = [];
  postForm.tagUid = [];
  filterCategoryLabels(event.target.value);
}

const getPostDetail = async () => {
  await getPostByUid(type.value).then(resp => {
    if (resp.data.code === 0) {
      postForm.categoryUid = resp.data.data.categoryUid;
      postForm.title = resp.data.data.title;
      postForm.tagUid = resp.data.data.tagUid;
      postForm.headImg = resp.data.data.headImg;
      postForm.summary = resp.data.data.summary;
      postForm.content = resp.data.data.content;
      postEditorRef.value.setPostContent({
        text: resp.data.data.content
      });
      postForm.isPublish = resp.data.data.isPublish === "1";
      postForm.contentHtml = resp.data.data.contentHtml;
      filterCategoryLabels(postForm.categoryUid);
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
  align-content: flex-start;
  flex-wrap: wrap;
}

.hide {
  display: none;
}

</style>