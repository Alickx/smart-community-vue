<template>
  <div style="margin-bottom: 16px">
    <a-button class="tw-ml-10" type="primary" :disabled="!hasSelected" :loading="selectState.loading"
              @click="removeBanHandler">
      批量解封
    </a-button>
    <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `已选择 ${selectState.selectedRowKeys.length} 名用户` }}
        </template>
      </span>
  </div>
  <a-table :columns="columns"
           :row-selection="{ selectedRowKeys: selectState.selectedRowKeys, onChange: onSelectChange }"
           row-key="banId"
           :data-source="userList">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a-button @click="removeBanHandlerOne(record.banId)" type="default" size="middle">解封</a-button>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup>

import {queryBanMember, removeBanMember} from "../../api/memberBanApi";
import {ref, computed, reactive} from "vue";
import {DateFormatUtil} from "../../util/DateFormatUtil";
import {message, Table} from "ant-design-vue";

let curPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
let userList = ref([]);
let userListLoading = ref(false);
const selectState = reactive({
  selectedRowKeys: [],
  loading: false
})
const columns = [
  {
    title: '用户id',
    dataIndex: 'banMemberUid',
    align: 'center',
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'banMemberName',
    align: 'center',
    width: 100,
  },
  {
    title: '封禁类型',
    dataIndex: 'banType',
    align: 'center',
    width: 100,
  },
  {
    title: '封禁操作者',
    dataIndex: 'banHandlerMemberName',
    align: 'center',
    width: 100,
  },
  {
    title: '封禁时间',
    dataIndex: 'banTime',
    align: 'center',
    width: 100,
  },
  {
    title: '封禁原因',
    dataIndex: 'banReason',
    align: 'center',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 100
  },
];


let hasSelected = computed(() => selectState.selectedRowKeys.length > 0);

const onSelectChange = selectedRowKeys => {
  selectState.selectedRowKeys = selectedRowKeys;
};

const getBanUser = (params) => {
  const {searchValue, searchType, searchTime} = params;
  const data = {
    curPage: curPage.value,
    pageSize: pageSize.value,
    searchValue,
    searchType,
    startTime: searchTime[0] != null ? new Date(searchTime[0]).getTime() : null,
    endTime: searchTime[1] != null ? new Date(searchTime[1]).getTime() : null
  };
  userListLoading.value = true;
  queryBanMember(data).then(resp => {
    if (resp.data.code === 0) {
      userList.value = handleUserList(resp.data.data.list);
      total.value = resp.data.data.total;
      userListLoading.value = false;
    }
  })
}

// 处理用户列表数据
const handleUserList = (list) => {
  return list.map(item => {
    return {
      banId: item.banId,
      banMemberUid: item.banUser.uid,
      banMemberName: item.banUser.nickName,
      banTime: DateFormatUtil(item.banTime) + "至" + DateFormatUtil(item.banEndTime),
      banType: item.banType,
      banHandlerMemberName: item.banHandlerUser.nickName,
      banReason: item.banReason ? item.banReason : '',
    }
  })
}

/**
 * 批量解封
 */
const removeBanHandler = () => {
  selectState.loading = true;
  removeBanMember(selectState.selectedRowKeys).then(resp => {
    if (resp.data.code === 0) {
      setTimeout(() => {
        message.success(resp.data.message);
        selectState.loading = false;
        selectState.selectedRowKeys = [];
        // 删除成功后，删除本地数组数据
        userList.value = userList.value.filter(item => {
          return !selectState.selectedRowKeys.includes(item.banId);
        })
      }, 1000);
    } else {
      message.error(resp.data.message);
      selectState.loading = false;
    }
  })
}

/**
 * 单次解封
 */
const removeBanHandlerOne = (record) => {
  const ids = [record];
  removeBanMember(ids).then(resp => {
    if (resp.data.code === 0) {
      setTimeout(() => {
        message.success(resp.data.message);
        // 删除成功后，删除本地数组数据
        userList.value = userList.value.filter(item => {
          return item.banId !== record;
        })
      }, 1000);
    } else {
      message.error(resp.data.message);
    }
  })
}


defineExpose({
  getBanUser
})


</script>

<style scoped>


</style>