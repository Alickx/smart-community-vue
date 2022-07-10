<template>
  <div v-if="store.getters.getIsLogin">
    <check-in-calendar
        @checkInListEmit="checkInListEmitHandler"
        :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }"></check-in-calendar>
    <a-button @click="checkInHandler()" class="check-in-button" :disabled="checkInButtonDisabled" type="primary">
      {{ checkInButtonText }}
    </a-button>
  </div>
</template>

<script setup>

import CheckInCalendar from "./CheckInCalendar.vue"
import {checkIn} from "../../api/memberapi";
import {useStore} from "vuex";
import {onMounted, ref} from "vue";

const store = useStore();

let checkInButtonDisabled = ref(true);
let checkInButtonText = ref(checkInButtonDisabled.value ? '已签到' : '立刻签到');

const checkInHandler = () => {
  if (store.getters.getIsLogin) {
    checkIn().then(res => {
      if (res.data.code === 0) {
        checkInButtonDisabled.value = true;
      }
    })
  }
}

const checkInListEmitHandler = (status)=>{
  checkInButtonDisabled.value = status;
  checkInButtonText.value = status ? '已签到' : '立刻签到';
}


</script>

<style scoped>

.check-in-button {
  width: 100%;
  height: 40px;
  margin-top: 10px;
}

</style>