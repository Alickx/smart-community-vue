<template>
  <MainLayout>
    <template #main>
      <user-profile-view :user-profile="userProfile" v-if="userProfile" class="mb-2" />
      <user-tabs />
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
  import MainLayout from '/@/layout/main-layout/index.vue';
  import UserProfileView from '/@/views/user-home/components/user-home-profile/index.vue';
  import UserTabs from '/@/views/user-home/components/user-home-tabs/index.vue';
import { getUserProfile } from '/@/api/user';

  const route = useRoute();
  let userProfile = ref();
  let userId = ref();

  const getProfile = async () => {
    getUserProfile(userId.value).then((res) => {
      userProfile.value = res.data;
    })
  };

  onMounted(() => {
    userId.value = route.params.id;
    getProfile();
  });
</script>

<style scoped></style>
