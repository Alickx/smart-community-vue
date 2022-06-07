<template>
  <div class="filter-bar-container">
    <a-row type="flex" align="middle">
      <a-col :span="8">
        <a-select
            ref="select"
            v-model:value="selectForm.sectionUid"
            :options="sectionList"
            style="width: 100%;"
            placeholder="分类"
            @change="selectChangeHandle"
            @focus="focus"
        ></a-select>
      </a-col>
      <a-col :span="8">
        <a-select
            ref="select"
            v-model:value="selectForm.tagUid"
            :options="tagList"
            style="width: 100%"
            :placeholder=' tagList.length === 0 ? "标签" : tagList[0].label '
            @change="tagChangeHandle"
            @focus="focus"
        ></a-select>
      </a-col>
      <a-col :span="8">
        <a-select
            ref="select"
            v-model="selectOption"
            :options="selectOptions"
            style="width: 100%"
            :placeholder="selectOptions[0].label"
        ></a-select>
      </a-col>
    </a-row>
  </div>
  <a-divider></a-divider>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {getCategoryList} from "../../api/categoryApi";
import {getTagByCategory} from "../../api/tagApi";


let sectionList = ref([])
let tagList = ref([])
let selectOption = ref();

const selectForm = reactive({
  tagUid: null,
  sectionUid: null
})

const selectOptions = ref([
  {label: "最新", value: 0},
  {label: "最火", value: 1}
])

let tagSelectStatus = ref(false);

const emit = defineEmits(["selectChange"])

const selectChangeHandle = () => {
  tagSelectStatus.value = true;
  getTagByCategory(selectForm.sectionUid).then(resp=>{
    if (resp.data.code === 0) {
      tagList.value = resp.data.data
      if (tagList.value !== []) {
        selectForm.tagUid = null;
        emit("selectChange", selectForm);
      }
    }
  })
}

const tagChangeHandle = ()=>{
  emit("selectChange", selectForm);
}

onMounted(() => {
  getCategoryList().then(resp => {
    if (resp.data.code === 0) {
      for (let item of resp.data.data) {
        const sectionItem = {
          "label": item.name,
          "value": item.uid
        }
        sectionList.value.push(sectionItem);
      }
    }
  })
})


</script>

<style scoped>

.filter-bar-container {
  padding-bottom: 30px;
}

</style>
