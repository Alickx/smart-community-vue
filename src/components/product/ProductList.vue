<template>
  <div class="main-container">
    <a-card hoverable style="width: 300px">
      <template #cover>
        <img class="product-img" src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/Fpi7xp7XOgruWPLAM3dJ9gJTxe9x.png"/>
      </template>
      <template #actions>
        <shopping-two-tone />
        <shopping-two-tone />
      </template>
      <a-card-meta title="社区改名卡" description="使用改名卡能够修改社区的名字">
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup>
import {ShoppingTwoTone} from '@ant-design/icons-vue'


</script>

<style scoped>

.product-img{
  width: 100%;
  height: 100%;
}

</style>