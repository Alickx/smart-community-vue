<template>
  <a-button class="tw-ml-3" @click="openBanPanel" type="text">
    <slot></slot>
  </a-button>
  <a-modal v-model:visible="showPanel" title="封禁管理" @ok="banSubmit">
    <div class="tw-p-5">
      <div class="tw-flex tw-flex-col tw-space-y-5 tw-justify-start">
        <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-center">
          <a-checkbox-group name="banTypeGroup" :options="banTypeOptions" v-model:value="dataFrom.banType"/>
        </div>
        <div class="tw-w-56 tw-flex tw-flex-row tw-items-center">
          <span>封禁日期：</span>
          <a-select v-model:value="dataFrom.banTime">
            <a-select-option value="1">1天</a-select-option>
            <a-select-option value="3">3天</a-select-option>
            <a-select-option value="7">7天</a-select-option>
            <a-select-option value="30">30天</a-select-option>
            <a-select-option value="90">90天</a-select-option>
            <a-select-option value="180">180天</a-select-option>
            <a-select-option value="365">365天</a-select-option>
          </a-select>
        </div>
        <div>
          <a-textarea v-model:value="dataFrom.banReason" placeholder="请输入封禁理由" :rows="4" />
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import MemberBanConstant from "../../util/MemberBanConstant";
import {banMember, queryBanMemberType} from "../../api/memberBanApi";
import {message} from "ant-design-vue";

const props = defineProps({
  targetUserInfo: {
    type: Object
  }
})

let showPanel = ref(false);

let dataFrom = reactive({
  banType: [],
  banReason: '',
  banTime: '1',
  memberUid: props.targetUserInfo.uid
})

const banTypeOptions = ref([
  {
    label: '封禁IP',
    value: MemberBanConstant.BAN_IP
  },
  {
    label: '封禁用户',
    value: MemberBanConstant.BAN_USER
  },
  {
    label: '封禁评论和回复',
    value: MemberBanConstant.BAN_COMMENT_REPLY
  },
  {
    label: '封禁站内私信',
    value: MemberBanConstant.BAN_MESSAGE
  }
])


const openBanPanel = ()=>{
  showPanel.value = true;
}

const closeBanPanel = ()=>{
  showPanel.value = false;
}

const initBanTypeOptions = async ()=> {
  await queryBanMemberType({
    memberUid: dataFrom.memberUid
  }).then(res => {
    if (res.data.code === 0) {
      dataFrom.banType = res.data.data
    }
  })
  banTypeOptions.value.forEach(item => {
    if (dataFrom.banType.includes(item.value)) {
      item.disabled = true
    }
  })
}

/**
 * 封禁用户
 */
const banSubmit = ()=> {
  banMember(dataFrom).then(resp => {
    message.success(resp.data.message);
    closeBanPanel();
  })
}

onMounted(()=>{
  initBanTypeOptions();
})


</script>

<style scoped>

</style>