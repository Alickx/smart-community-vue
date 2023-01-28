<template>
  <MainLayout left-width="25" right-width="25">
    <template #main>
      <user-profile-view :user-profile="userProfile" v-if="userProfile" />
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
  import MainLayout from '/@/layout/mainLayout/index.vue';
  import UserProfileView from '/@/views/userHome/components/UserProfileView/index.vue';
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
