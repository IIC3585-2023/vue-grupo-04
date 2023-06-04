<template>
    <img class="dog-image" :src=data>
</template>
 
<script>
    export default {
    props: ['data']
    }
</script>

<style scoped>
    .dog-image{
        width: 18rem;
        display: block;
        padding: 3px 3px;
    }
</style>