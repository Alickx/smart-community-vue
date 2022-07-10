<template>
  <a-calendar :fullscreen="false" :validRange="dateRange">
    <template #dateFullCellRender="{ current }">
      <span :class="isToday(current)" class="calendat-text">{{ dayjs(current).format('D') }}</span>
      <div v-if="isShowIcon(current)">
        <question-outlined v-if="!isCheckIn(current) && isToday(current)" style="color: red"/>
        <check-outlined v-else-if="isCheckIn(current)" style="color: green"/>
        <close-outlined v-else style="color: red"/>
      </div>
    </template>
  </a-calendar>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import {useStore} from "vuex";
import {getCheckInInfo} from "../../api/memberapi";

const store = useStore();

const prop = defineProps({
  checkInList: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'checkInListEmit'
])

let checkInList = ref([]);
let checkInDays = ref(0);


const dateRange = ref([dayjs().startOf('month'), dayjs().endOf('month')]);


const isToday = (current) => {
  return dayjs(current).isSame(dayjs(), 'day') === true ? 'today-cell' : '';
}
const isShowIcon = (current) => {
  return dayjs() > current
      &&
      dayjs(new Date()).format('M') === dayjs(current).format('M');
}

const isCheckIn = (day) => {
  // return checkInList.value.some(item => {
  //   return dayjs(item.checkInDate).isSame(dayjs(day), 'day') === true;
  // });
  return checkInList.value.find(item => {
    return dayjs(item.checkInDate).isSame(dayjs(day), 'day') === true;
  });
}

/**
 * 抛出事件给父组件（签到按钮），今日签到状态
 *
 * @returns {boolean} 签到状态
 */
const emitCheckInList = () => {
  let status = checkInList.value.find(item => {
    return dayjs(item.checkInDate).isSame(dayjs(), 'day') === true;
  });
  emit('checkInListEmit', status);
}

onMounted(() => {
  // 如果登录了就查询签到情况
  if (store.getters.getIsLogin) {
    getCheckInInfo().then(res => {
      checkInList.value = res.data.data.checkInList
      checkInDays.value = res.data.data.checkInDays;
      emitCheckInList();
    })
  }
})


</script>

<style scoped>

.today-cell {
  color: black;
  font-weight: bold;
}

.calendat-text {
  font-size: 16px;
}

/deep/ .ant-picker-cell {
  cursor: default;
}


</style>