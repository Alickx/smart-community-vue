<template>
  <div class="profileForm">
    <a-typography-title :level="3">个人资料</a-typography-title>
    <a-divider/>
    <a-form
        name="member_info_form"
        @finish="profileSubmit"
        :model="memberInfoForm">
      <div class="uploadForm">
        <div class="infoInput">
          <a-form-item label="昵称" name="nickName" :rules="[{required:true,validator: checkNickName,trigger:blur}]">
            <a-input v-model:value="memberInfoForm.nickName" show-count :maxlength="20"></a-input>
          </a-form-item>
          <a-divider/>
          <a-form-item label="性别" name="gender" :rules="[{required:true,validator: checkGender,trigger:blur}]">
            <a-radio-group v-model:value="memberInfoForm.gender">
              <a-radio value="0">男</a-radio>
              <a-radio value="1">女</a-radio>
              <a-radio value="2">私密</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-divider/>
          <a-form-item label="个人介绍" name="intro">
            <a-textarea v-model:value="memberInfoForm.intro" show-count :maxlength="150"/>
          </a-form-item>
          <a-divider/>
        </div>
        <div class="avatarUpload">
          <a-form-item name="avatar">
            <a-upload
                v-model:file-list="fileList"
                name="avatar"
                :customRequest="customRequest"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange"
            >
              <a-avatar :src="memberInfoForm.avatar" :size="64">
              </a-avatar>
              <div v-if="uploadAvatarStatus === false">
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">上传</div>
              </div>
              <div v-else-if="uploadAvatarStatus">
                <div class="ant-upload-text" @click.stop="revokeAvatarUpload">撤销上传</div>
              </div>
            </a-upload>
          </a-form-item>
        </div>
      </div>
      <div class="submit-button">
        <a-form-item>
          <a-button type="primary" :loading="submitLoading" html-type="submit" size="large">保存修改</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {getMemberInfoByUid, memberSettingProfileUpload} from "../../api/memberapi";
import {getOssPolicy, ossUpload} from "../../api/common";
import {message} from "ant-design-vue";
import {useStore} from "vuex";


const store = useStore();
const fileList = ref([])
let loading = ref(false)
let submitLoading = ref(false)
let ossPolicy = ref(null)
let uploadAvatarStatus = ref(false)
let oldAvatarUrl = ref('')
const memberInfoForm = reactive({
  nickName: '',
  gender: '',
  birthday: '',
  intro: '',
  avatar: ''
})

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('你只能上传Jpg或Png格式图片');
  }

  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isLt5M) {
    message.error('图片必须上传5MB以下');
  }

  return isJpgOrPng && isLt5M;
}


const handleChange = (info) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
  }
}


const customRequest = async (file) => {
  await getOssPolicy().then(resp => {
    if (resp.data.code === 0) {
      ossPolicy.value = resp.data.data
    }
  })
  let fromData = new FormData();
  const {policy, dir, host, accessid, signature, fileName} = ossPolicy.value;

  fromData.set("policy", policy)
  fromData.set("OSSAccessKeyId", accessid)
  fromData.set("success_action_status", "200")
  fromData.set("signature", signature)
  fromData.set("key", dir + file.file.name.substring(name.lastIndexOf(".")))
  fromData.set("name", fileName + file.file.name.substring(name.lastIndexOf(".")))
  fromData.set("file", file.file)

  ossUpload(host, fromData).then(() => {
    memberInfoForm.avatar = host + "/" + dir + file.file.name.substring(name.lastIndexOf("."))
    uploadAvatarStatus.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 500)
  })

}

const revokeAvatarUpload = () => {
  memberInfoForm.avatar = oldAvatarUrl.value;
  uploadAvatarStatus.value = false;
}

const profileSubmit = (value) => {
  submitLoading.value = true;
  memberSettingProfileUpload(value).then(resp => {
    setTimeout(() => {
      if (resp.data.code === 0) {
        //更新vuex中用户信息
        store.commit('uploadMemberSetting', resp.data.data)
        submitLoading.value = false;
        message.success(resp.data.message)
      } else {
        submitLoading.value = false;
        message.error(resp.data.message)
      }
    }, 500)
  })
}

const checkNickName = async (_rule, value) => {

  if (!value) {
    return Promise.reject("请输入用户名")
  }

  if (value.length > 20) {
    return Promise.reject("用户名请保持20个汉字以内")
  }
  return Promise.resolve();
}

const checkGender = async (_rule, value) => {
  if (!value) {
    return Promise.reject("请选择性别")
  }
  return Promise.resolve();
}

onMounted(() => {
  getMemberInfoByUid(store.getters.getUserInfo.uid).then(resp => {
    if (resp.data.code === 0) {
      const {nickName, birthday, intro, gender, avatar} = resp.data.data
      memberInfoForm.nickName = nickName
      memberInfoForm.birthday = birthday
      memberInfoForm.intro = intro
      memberInfoForm.gender = gender
      memberInfoForm.avatar = avatar
      oldAvatarUrl.value = avatar
    }
  })
})


</script>

<style scoped>

.profileForm {
  padding: 25px;
  width: 80%;
}

.uploadForm {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.infoInput {
  width: 620px;
}

.avatarUpload {
  margin-left: 150px;
}

.submit-button {
  margin-left: 60px;
}

</style>