<template>
  <a-avatar :src="targetUserInfo.avatar" :size="64">
  </a-avatar>
  <div class="info-box">
    <div class="top">
      <span class="username">
        {{ targetUserInfo.nickName }}
      </span>
      <div style="color: blue;margin-left: 5px" v-if="store.getters.getUserInfo.gender === '0'">
        <man-outlined/>
      </div>
      <div style="color: red;margin-left: 5px" v-else-if="store.getters.getUserInfo.gender === '1'">
        <woman-outlined/>
      </div>
      <BanPanel v-if="isShowBan" :target-user-info="targetUserInfo">封禁管理</BanPanel>
    </div>
    <div class="show">
      <span class="user-show">
        {{ targetUserInfo.intro ? targetUserInfo.intro : "该用户什么都没写" }}
      </span>
    </div>
  </div>
  <div class="action-box">
    <a-button type="primary" v-if="isMyHome" @click.stop="()=>router.push({name:'userProfile'})">编辑个人信息</a-button>
    <button v-if="!isFollow && !isMyHome" class="follow-button" @click.stop="followClickHandler">关注</button>
    <button v-if="isFollow && !isMyHome" class="have-follow-button">已关注</button>
  </div>
</template>

<script setup>
import {onMounted,reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ManOutlined, WomanOutlined} from '@ant-design/icons-vue'
import {followQuery, followSave} from "../../api/memberapi";
import {useStore} from "vuex";
import BanPanel from "../common/BanPanel.vue";

const props = defineProps({
  targetUserInfo: {
    type: Object
  }
})

const store = useStore();
const route = useRoute();
const router = useRouter();

let isLogin = ref(store.getters.getIsLogin)
let userInfo = reactive(store.getters.getUserInfo)
let isMyHome = ref(false);
let isFollow = ref(false);
let isShowBan = ref(false);


const followClickHandler = () => {
  let targetUserId = route.params.id
  followSave(targetUserId).then(res => {
    if (res.data.code === 0) {
      isFollow.value = true
    }
  })
}

const isShowBanHandler = ()=> {
  // 判断用户是否为自己
  let isMe = userInfo.uid !== route.params.id
  // 判断是否拥有封禁权限
  let hasRole = store.getters.getRoleList.includes('admin');

  isShowBan.value = isMe && hasRole
}


onMounted(() => {
  followQuery(route.params.id).then(res => {
    isFollow.value = res.data.data
  })
  if (isLogin.value === false) {
    isMyHome.value = false;
  } else {
    isMyHome.value = userInfo.uid === props.targetUserInfo.uid;
  }
  isShowBanHandler();
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

.follow-button {
  border-radius: 5px;
  border: 1px solid #89ca6a;
  width: 100px;
  height: 40px;
  color: #89ca6a;
  background-color: #ffffff;
  font-size: 18px;
  font-weight: 450;
  cursor: pointer;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.have-follow-button {
  border-radius: 5px;
  border: 1px solid #89ca6a;
  width: 100px;
  height: 40px;
  color: #ffffff;
  background-color: #89ca6a;
  font-size: 18px;
  font-weight: 450;
  cursor: pointer;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}


</style>
