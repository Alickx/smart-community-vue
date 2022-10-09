<template>
    <div class="flex flex-col h-100vh">
        <header class="h-15">
            <Header/>
        </header>
        <main class="flex-1">
            <router-view/>
        </main>
        <footer class="h-15 bg-blue">
            <Footer/>
        </footer>
    </div>
</template>

<script setup lang="ts">
import Header from '../components/Header/index.vue';
import Footer from '../components/Footer/index.vue';



</script>

<style lang="scss" scoped>



</style>
