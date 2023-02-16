<template>
  <el-row class="bg-white">
    <el-col span="16">
      <el-row align="middle">
        <ul class="flex flex-row">
          <li v-for="item in 8" :key="item">
            <a href="#" class="text-gray-500 hover:text-gray-900">问答</a>
          </li>
        </ul>
      </el-row>
    </el-col>
    <el-col span="8">
      <el-row align="middle">
        <span>标签管理</span>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>

<style scoped></style>
