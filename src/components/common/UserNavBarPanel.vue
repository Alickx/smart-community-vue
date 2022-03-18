<template>
  <div class="panel-contain">
    <ul class="nav-menu user-dropdown-list">
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <router-link :to="{ name: 'postEdit' }">
            <edit-outlined/>
            <span>写文章</span>
          </router-link>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <router-link :to="{ path: `/user/${userId}` }">
            <user-outlined />
            <span>我的主页</span>
          </router-link>
        </li>
        <li class="nav-menu-item">
          <router-link :to="{ path: `/user/${userId}/like` }">
            <like-outlined />
            <span>我赞过的</span>
          </router-link>
        </li>
        <li class="nav-menu-item">
          <router-link :to="{ path: `/user/${userId}/collections` }">
            <star-outlined />
            <span>我的收藏</span>
          </router-link>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item" @click.stop="ClickLogout">
          <a>
            <logout-outlined />
            <span>登出账号</span>
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {logout} from '../../api/memberapi';
import userStore from "../../store/userStore";
import {EditOutlined,UserOutlined,LikeOutlined,StarOutlined,LogoutOutlined} from '@ant-design/icons-vue'


const store = userStore;

const userId = ref('');

onMounted(() => {
  if (store.getters.getIsLogin) {
    userId.value = store.getters.getUserInfo.uid;
  }
})

// if (store.getters.getUser) {
//   userId.value = store.getters.getUser.userId;
// } else {
//   alert("用户未登录，请重新登录!")
//   router.push('/')
// }


const ClickLogout = () => {
  logout(userId.value).then(() => {
    setTimeout(()=>{
      store.commit('logout');
      location.reload();
    },1500);
  })
}

</script>

<style scoped>
.nav-menu-item-group > li :hover {
  background-color: #f8f8f8;
}

.nav-menu .nav-menu-item > a > span {
  margin-left: 0;
  flex-grow: 1;
}

.nav-menu .nav-menu-item {
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
}

.nav-menu .nav-menu-item > a > span {
  margin-left: 0;
  flex-grow: 1;
}

.nav-menu .nav-menu-item > a {
  display: flex;
  align-items: center;
  padding: 8px 8px ;
}

.nav-menu-item > a {
  display: block;
  color: #4e5969;
}

.nav-item a {
  color: #86909c;
  position: relative;
}

.nav-menu.user-dropdown-list .nav-menu-item-group:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.nav-menu .nav-menu-item-group[data-v-59824fc4] {
  padding: 1rem 0;
}

.nav-menu.user-dropdown-list {
  /*width: fit-content;*/
  min-width: 120px;
  right: 0;
  left: auto;
  transform: translateX(0);
}
</style>
