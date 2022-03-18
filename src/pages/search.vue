<template>
  <navbar-common></navbar-common>
  <a-row type="flex" align="middle" class="search-nav">
    <a-col :span="4"></a-col>
    <a-col :span="20">
      <div class="search-type">
        <router-link
          v-for="data in searchType"
          v-slot="{ href }"
          custom
          :to="{ name: 'search', query: { query: queryText, type: data.type } }"
        >
          <li class="menu-link">
            <a :href="href" :class="{ active: queryType === data.type }">{{ data.label }}</a>
          </li>
        </router-link>
      </div>
    </a-col>
  </a-row>
  <div class="main-container">
    <a-row type="flex" align="middle" class="search-choose">
      <a-col :span="24">
        <div class="choose-item-list">
          <router-link
            v-for="data in searchChoose"
            v-slot="{ href }"
            custom
            :to="{
              name: 'search', query: {
                query: route.query.query,
                type: route.query.type,
                sort: data.sort
              }
            }"
          >
            <li class="menu-link">
              <a :href="href" :class="{ active: querySort === data.sort }">{{ data.label }}</a>
            </li>
          </router-link>
        </div>
      </a-col>
    </a-row>
    <div class="search-detail">
      <div v-if="!isShowSearchResult" class="loading-skeleton">
        <a-skeleton active />
      </div>
      <SearchPostList
        v-else-if="isShowSearchResult && postSearchList.length > 0"
        :post-list="postSearchList"
      ></SearchPostList>
      <div v-else style="padding: 25px">
        <a-empty description="没有搜索到任何东西嗷~~" />
      </div>
    </div>
  </div>
</template>

<script setup>

import NavbarCommon from "../components/common/NavbarCommon.vue";
import { onDeactivated, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SearchPostList from "../components/search/SearchPostList.vue";
import { searchPost } from "../api/search";
import userStore from "../store/userStore";

const route = useRoute();

let postSearchList = ref([]);
const searchType = ref([
  { label: '文章', type: '0' },
  { label: '用户', type: '1' },
])

const searchChoose = ref([
  { label: '综合排序', sort: '0' },
  { label: '最新优先', sort: '1' }
])

const store = userStore;

let queryText = ref('')
let queryType = ref('')
let querySort = ref('')
let isShowSearchResult = ref(false);

let totalPage = ref(0);

const data = reactive({
  curPage: 1,
  keyword: '',
  sortType: ''
})

/**
 * 加载下一页
 */
const loadNextPage = () => {
  console.log("加载")
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight + 1>= scrollHeight) { // 滚动到底部，逻辑代码
    console.log("next")
    if (data.curPage < totalPage.value) {
      data.curPage++;
      searchPost(data).then(resp => {
        if (resp.data.code === 0) {
          totalPage.value = resp.data.data.totalPages;
          postSearchList.value = postSearchList.value.concat(resp.data.data.postList)
        }
      })
    }
  }
}


const postRequest = (keyWord, sortType) => {
  data.keyword = keyWord
  data.sortType = sortType
  searchPost(data).then(resp => {
    if (resp.data.code === 0) {
      setTimeout(() => {
        postSearchList.value = postSearchList.value.concat(resp.data.data.postList)
        totalPage.value = resp.data.data.totalPages;
        isShowSearchResult.value = true;
      }, 800)
    }
  })
}

watch(() => {
  store.getters.getSearchKeyword
}, () => {
  console.log("新的搜索")
  isShowSearchResult.value = false;
  const data = {
    curPage: 1,
    keyword: store.getters.getSearchKeyword,
    sortType: '0'
  }
  searchPost(data).then(resp => {
    if (resp.data.code === 0) {
      setTimeout(() => {
        postSearchList.value = resp.data.data.postList
        totalPage.value = resp.data.data.totalPages;
        isShowSearchResult.value = true;
      }, 800)
    }
  })
}, { deep: true })


onMounted(() => {
  window.addEventListener('scroll', loadNextPage);
  const { query, type, sort } = route.query;
  queryText.value = query ? query : ''
  queryType.value = type ? type : '0'
  querySort.value = sort ? sort : '0'
  if (queryType.value === '0') {
    postRequest(queryText.value, querySort.value)
  }
})


onDeactivated(() => {
  window.removeEventListener('scroll', loadNextPage);
})


</script>

<style scoped>
a {
  color: #999999 !important;
}

.search-nav {
  background-color: #ffffff;
  border-bottom: 1px solid #f4f5f5;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}

.search-type {
  display: flex;
  align-items: center;
  height: 50px;
}

.menu-link {
  font-size: 15px;
  color: inherit;
}

.menu-link:not(:first-child) {
  margin-left: 30px;
}

.main-container {
  position: relative;
  margin: 50px 0 0 250px;
  max-width: 760px;
  background-color: #ffffff;
}

.active {
  color: #007fff !important;
}

.search-choose {
  border-bottom: 1px solid #f4f5f5;
}

.choose-item-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: 50px;
  padding: 25px;
}

.loading-skeleton {
  padding: 25px;
}
</style>
