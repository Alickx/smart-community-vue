<template>
  <a-avatar :src="targetUserInfo.avatar" :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
  </a-avatar>
  <div class="info-box">
    <div class="top">
      <span class="username">
        {{ targetUserInfo.nickName }}
      </span>
      <div style="color: blue;margin-left: 5px" v-if="store.getters.getUserInfo.gender === '0'">
        <man-outlined />
      </div>
      <div style="color: red;margin-left: 5px" v-else-if="store.getters.getUserInfo.gender === '1'">
        <woman-outlined />
      </div>
    </div>
    <div class="show">
      <span class="user-show">
        {{ targetUserInfo.intro ? targetUserInfo.intro : "该用户什么都没写" }}
      </span>
    </div>
  </div>
  <div class="action-box">
    <a-button type="primary" v-if="isMyHome" @click.stop="()=>router.push({name:'userSetting'})">编辑个人信息</a-button>
    <a-button v-else>关注</a-button>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import userStore from "../../store/userStore";
import {useRouter} from "vue-router";
import {ManOutlined,WomanOutlined} from '@ant-design/icons-vue'

const props = defineProps({
  targetUserInfo: {
    type: Object
  }
})

const store = userStore;

const router = useRouter();
let isLogin = ref(store.getters.getIsLogin)
let userInfo = reactive(store.getters.getUserInfo)
let isMyHome = ref(false)

onMounted(() => {
  if (isLogin.value === false) {
    isMyHome.value = false;
  } else {
    isMyHome.value = userInfo.uid === props.targetUserInfo.uid;
  }
})

</script>

<style scoped>


.show .user-show {
  flex: 1 1 auto;
  vertical-align: top;
  font-size: 1.17rem;
  line-height: 1.5;
  color: #72777b;
  overflow: hidden;
}

.info-box .top .username {
  margin: 0;
  padding: 0;
  font-size: 21px;
  font-weight: 400;
  line-height: 1.2;
  color: #000;
}

@media (max-width: 700px) {
  .info-box .top .username {
    font-size: 1.5rem;
    font-weight: 500;
  }
}

@media (max-width: 600px) {
  .user-info-block .info-box {
    margin: 1rem 0;
  }
}

@media (max-width: 600px) {
  .info-box {
    align-items: center;
  }
}

.action-box {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
}


.info-box .show {
  font-size: 1.25rem;
  line-height: 1.5;
  color: #72777b;
  overflow: hidden;
  margin-top: .4rem;
}

.info-box .top {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.user-info-block .info-box {
  flex: 1 1 auto;
  margin-right: 2rem;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
}


</style>
