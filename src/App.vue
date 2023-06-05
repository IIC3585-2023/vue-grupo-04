<script setup>
import Navbar from './components/Navbar.vue'
import Dogs from './components/Dogs.vue'
</script>

<template>
  <div class="main-page">
    <Navbar></Navbar>

    <Dogs></Dogs>
  </div>
</template>

<style scoped>
  .main-page{
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
