<template>
  <div class="category-list">
    <ul class="category-list-contain space-y-1">
      <li v-for="category in categories">
        <router-link :to="{ url: category.url }" class="w-full link">
          <div class="category-list-item">
            <span>{{ category.name }}</span>
          </div>
        </router-link>
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

<style lang="less" scoped>

.category-list {
  width: 150px;
  background-color: #ffffff;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}

.category-list-contain {
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px 5px;
  }
}

.link {
  padding: 5px;
  border-radius: 5px;
}

.link:hover {
  background-color: #ea6f5a;
  color: #fff;
}

.category-list-item {
  display: flex;
  font-size: 15px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
}


</style>
