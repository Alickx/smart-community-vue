<template>
  <div class="panel-contain">
    <ul class="nav-menu user-dropdown-list">
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <router-link :to="{ name: 'postEdit' , params: {id: 'new'}}">
            <edit-outlined/>
            <span>写文章</span>
          </router-link>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <router-link :to="{ path: `/user/${userId}` }">
            <user-outlined/>
            <span>我的主页</span>
          </router-link>
        </li>
        <li class="nav-menu-item">
          <router-link :to="{ path: `/user/${userId}/thumb` }">
            <like-outlined/>
            <span>我赞过的</span>
          </router-link>
        </li>
        <li class="nav-menu-item">
          <router-link :to="{ path: `/user/${userId}/collect` }">
            <star-outlined/>
            <span>我的收藏</span>
          </router-link>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item">
          <router-link :to="{ name: 'userManage' }">
            <dashboard-outlined />
            <span>用户管理</span>
          </router-link>
        </li>
      </div>
      <div class="nav-menu-item-group">
        <li class="nav-menu-item" @click.stop="ClickLogout">
          <a>
            <logout-outlined/>
            <span>登出账号</span>
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {EditOutlined, UserOutlined, LikeOutlined, StarOutlined, LogoutOutlined,DashboardOutlined} from '@ant-design/icons-vue'
import router from "../../router";
import {useStore} from "vuex";
import {memberLogout} from "../../api/loginapi";


const store = useStore();

const userId = ref('');

onMounted(() => {
  if (store.getters.getIsLogin) {
    userId.value = store.getters.getUserInfo.uid;
  }
})


const ClickLogout = () => {
  let r = confirm('确定要登出账号吗？');
  if (r) {
    memberLogout().then(() => {
      store.commit('logout');
      // 刷新
      location.reload();
    })
  }
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
  padding: 8px 8px;
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

.nav-menu .nav-menu-item-group {
  padding: 5px 0;
}

.nav-menu.user-dropdown-list {
  /*width: fit-content;*/
  min-width: 120px;
  right: 0;
  left: auto;
  transform: translateX(0);
}
</style>
