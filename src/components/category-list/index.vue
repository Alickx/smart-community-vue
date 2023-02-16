<template>
  <div class="bg-white w-50 rounded-lg">
    <ul class="p-4 flex flex-row flex-wrap space-x-3">
      <li v-for="category in categories">
        <a class="">
          <div class="">
            <span>{{ category.name }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

const categories = ref([
  {
    name: "最新",
    url: "https://baidu.com/",
    icon: "https://baidu.com/",
    active: true,
  },
  {
    name: "推荐",
    url: "https://baidu.com/",
    icon: "https://baidu.com/",
    active: false,
  },
  {
    name: "反馈",
    url: "https://baidu.com/",
    icon: "https://baidu.com/",
    active: false,
  },
  {
    name: "关注",
    url: "https://baidu.com/",
    icon: "https://baidu.com/",
    active: false,
  },
]);




</script>
