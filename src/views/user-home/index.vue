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
  import { useUserStore } from '/@/store';

  const route = useRoute();
  const userStore = useUserStore();
  let userProfile = ref();
  let userId = ref();

  const getUserProfile = async () => {
    userProfile.value = userStore.getUserProfile;
  };

  onMounted(() => {
    userId.value = route.params.id;
    getUserProfile();
  });
</script>

<style scoped></style>
