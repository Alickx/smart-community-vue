<template>
  <div class="filter-bar-container">
    <a-row type="flex" align="middle">
      <a-col :span="8">
        <a-select
            ref="select"
            v-model="sectionSelectValue"
            :options="options"
            style="width: 100%;"
            :placeholder="options[0].label"
            @focus="focus"
            @change="handleChange"
        ></a-select>
      </a-col>
      <a-col :span="8">
        <a-select
            ref="select"
            v-model="sectionSelectValue"
            :options="options1"
            style="width: 100%"
            :placeholder="options1[0].label"
            @focus="focus"
            @change="handleChange"
        ></a-select>
      </a-col>
      <a-col :span="8">
        <a-select
            ref="select"
            v-model="sectionSelectValue"
            :options="options3"
            style="width: 100%"
            :placeholder="options3[0].label"
            @focus="focus"
            @change="handleChange"
        ></a-select>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import {ref} from "vue";


//板块选择的值
let sectionSelectValue = ref();

//标签选择的值
let tagSelectValue = ref();

//板块选择框内容
const options = ref([
  {
    value: '1W255',
    label: '编程交流',
  }, {
    value: 'WD4WS',
    label: '闲聊时刻',
  }
])

const options1 = ref([
  {
    value: '1W255',
    label: 'Java',
  }, {
    value: 'WD4WS',
    label: 'Python',
  }, {
    value: '26W51',
    label: 'Rust',
  }, {
    value: '26S85',
    label: 'C++',
  },
])

const options3 = ref([
  {
    value: '1W255',
    label: '热门',
  }, {
    value: 'WD4WS',
    label: '最新',
  }
])

const handleChange = (value) => {
  console.log('板块uid=', value);
}

</script>

<style scoped>
</style>
