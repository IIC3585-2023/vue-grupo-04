<script setup>
import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
</script>

<template>
  <div class="main-page">
    <Navbar></Navbar>
    <RouterView />
  </div>
</template>

<style scoped>
.main-page {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>
