<template>
  <el-avatar
    @error="errorHandle"
    :size="size"
    :src="avatarSrc"
    :text="text"
    :icon="icon"
    :shape="shape"
    :alt="alt"
    :fit="fit"
    :class="customClass"
  />
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      src: string;
      size?: number;
      text?: string;
      icon?: string;
      shape?: string | any;
      alt?: string;
      fit?: string | any;
      customClass?: string;
    }>(),
    {
      src: '',
      size: 64,
      text: '',
      icon: '',
      shape: 'circle',
      alt: '',
      fit: 'cover',
      customClass: '',
    },
  );

  let avatarSrc = ref(props.src);

  const errorHandle = () => {
    // 当头像加载失败时，使用默认头像
    avatarSrc.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  };
</script>
