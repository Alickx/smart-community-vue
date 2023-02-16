<template>
  <div class="flex flex-col">
    <ul class="bg-white">
      <li v-for="item in 10" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
