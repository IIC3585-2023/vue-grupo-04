<template>
  <div class="rotate-animation">
    <img src="../assets/loadingSpin.svg" alt="loading" />
  </div>
</template>

<script>
export default {
  name: "LoadingSpin",
};
</script>

<style>
/* animation rotate */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.rotate-animation {
  animation: rotate 1s linear infinite;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
