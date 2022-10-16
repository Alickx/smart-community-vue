<template>
    <div class="flex flex-col h-100vh">
        <header class="border-b-5 border-[#f4f5f5]">
            <Header/>
        </header>
        <main class="flex-1">
            <router-view/>
        </main>
    </div>
</template>

<script setup lang="ts">
import Header from '../../components/Header/index.vue';



</script>

<style lang="scss" scoped>



</style>
