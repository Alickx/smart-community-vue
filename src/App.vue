<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>


<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {queryIsLogin} from "./api/loginapi";

dayjs.locale('zh-cn');

export default {
  data() {
    return {
      locale: zhCN,
    };
  },

  mounted() {
    queryIsLogin().then(resp => {
      if (resp.data.code !== 0) {
        this.$store.commit('logout');
      }
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a:hover {
  color: #007fff !important;
}

html {
  overflow-y: scroll;
  overflow-x: hidden;
}

body {
  background-color: #f4f5f5 !important;
  height: auto !important;
  font-family: "Hiragino Sans GB", "Microsoft YaHei",
  "WenQuanYi Micro Hei", sans-serif;
}
</style>
