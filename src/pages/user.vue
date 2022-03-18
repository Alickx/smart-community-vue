<template>
  <navbar-common></navbar-common>
  <main class="main-container">
    <div class="container main-container">
      <div class="view user-view">
        <div class="major-area">
          <div class="user-info-block block shadow">
            <UserInfo
                v-if="targetUserInfo"
                :target-user-info="targetUserInfo"
            />
          </div>
          <div class="list-block">
            <UserDetailList></UserDetailList>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NavbarCommon from "../components/common/NavbarCommon.vue";
import {getMemberInfoByUid} from "../api/memberapi";
import UserInfo from "../components/user/UserInfo.vue";
import UserDetailList from "../components/user/UserDetailList.vue";

const targetUserInfo = ref();
const route = useRoute()


onMounted(() => {
  getMemberInfoByUid(route.params.id).then(resp => {
    if (resp.data.code === 0) {
      targetUserInfo.value = resp.data.data
    }
  })
})


</script>

<style scoped>

.list-block {
  margin-top: 1rem;
}

.user-info-block {
  display: flex;
  padding: 2.5rem;
}

@media (max-width: 600px) {
  .user-info-block {
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 1.67rem;
  }
}

@media (max-width: 960px) {
  .minor-area {
    display: none;
  }
}

.block {
  background-color: #fff;
  border-radius: 2px;
}

.shadow {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
.major-area {
  flex: 1 1 auto;
  min-width: 0;
}

.user-view {
  display: flex;
  margin-bottom: 6rem;
}

.main-container > .view {
  margin-top: 1.767rem;
}

.container:after {
  display: table;
  content: "";
  clear: both;
}

.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  display: block;
}

</style>
