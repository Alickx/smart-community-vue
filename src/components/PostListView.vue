<template>
  <article class="post-item">
    <section class="post-item-body" v-for="(data, index) in postItemList">
      <a-typography>
        <a-typography-title type="primary" :level="4" :underline="true">
          <router-link
              v-slot="{ href,isActive }"
              custom
              :to="{ name: 'post',params:{ id:data.uid } }">
            <a-typography-link
                id="post-item-title"
                target="_blank"
                :href="href"
            >{{ data.title }}
            </a-typography-link>
          </router-link>
        </a-typography-title>
        <a-typography-paragraph>
          <a-typography-text
              type="secondary"
          >{{ data.summary }}
          </a-typography-text>
        </a-typography-paragraph>
        <a-typography-text>
          <a href="https://www.baidu.com" class="post-meat-item">
            <user-outlined/>
            <span class="post-meat-item-span">{{ data.authorInfo.nickName }}</span>
          </a>
          <span class="post-meat-item">{{ timeFormat(data.createdTime) }}</span>
          <a href="javascript:void(0)" class="post-meat-item">
            <like-outlined v-if="data.isLike === false" @click.stop="thumbClickHandle(data.uid,index)"/>
            <LikeFilled v-else @click.stop="thumbCancelHandle(data.uid,index)"></LikeFilled>
            <span class="post-meat-item-span">{{ data.thumbCount }}</span>
          </a>
          <a href="#" class="post-meat-item">
            <message-outlined/>
            <span class="post-meat-item-span">0</span>
          </a>
          <!--          <a href="#" class="post-meat-item">-->
          <!--            <eye-outlined/>-->
          <!--            <span class="post-meat-item-span">{{ data.clickCount }}</span>-->
          <!--          </a>-->
        </a-typography-text>
      </a-typography>
      <a-divider/>
    </section>
  </article>
</template>

<script setup>
import {
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  EyeOutlined,
  LikeFilled
} from '@ant-design/icons-vue';
import dayjs from "dayjs";
import {thumbCancel, thumbSave} from "../api/postapi";
import {onDeactivated, onMounted, reactive, toRef, toRefs} from "vue";

const props = defineProps({
  postItemList: {
    type: Array
  }
});

const {postItemList} = toRefs(props);

let params = reactive({
  toUid: ''
})

const thumbClickHandle = (value, index) => {
  params.toUid = value;
  thumbSave(params).then(resp => {
    if (resp.data.code === 0) {
      postItemList.value[index].thumbCount++;
      postItemList.value[index].isLike = true;
    }
  })
}

const thumbCancelHandle = (value, index) => {
  params.toUid = value;
  console.log(postItemList.value)
  thumbCancel(params).then(resp => {
    if (resp.data.code === 0) {
      postItemList.value[index].thumbCount--;
      postItemList.value[index].isLike = false;
    }
  })
}


const timeFormat = (value) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
}

const test = ()=>{
  console.log("开始test")
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight >= scrollHeight) { // 滚动到底部，逻辑代码
    //事件处理
    console.log("滚动到底部，触发")
    //TODO 节流 加载下一页
  }
}

//页面挂在
onMounted(()=>{
  window.addEventListener('scroll',test);
})

//页面销毁
onDeactivated(()=>{
  window.removeEventListener('scroll',test);
})


</script>

<style scoped>
.post-item {
  padding-left: 25px;
  padding-right: 25px;
}

.post-item-body {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#post-item-title:hover {
  color: #f60;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: none;
}

#post-item-title {
  /* font-weight: bold;
  font-size: 16px;
  color: #1d2129;
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; */
}

.post-meat-item {
  font-size: 14px;
  font-weight: 300;
  color: #000000;
}

.post-meat-item:not(:first-child) {
  margin-left: 15px;
}

.post-meat-item-span {
  margin-left: 5px;
  font-size: 10px;
  font-weight: 200;
}
</style>
