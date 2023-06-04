<script setup>
    import Dog from './Dog.vue';
</script>

<template>
    <div class="dogs-container">
        <div class="dog-container" v-for="item in listItems">
            <Dog :data="item.attributes"></Dog>
        </div>
    </div>
</template>


<script>
    export default {
    components: {
        Dog
    },
    data() {
      return {
        listItems: [],
      }
    },
    methods: {
      async getData() {
        const res = await fetch("https://dogapi.dog/api/v2/breeds");
        const finalRes = await res.json();
        this.listItems = finalRes.data;
      }
    },
    mounted() {
      this.getData()
    }
  }
 
</script>

<style scoped>
    .dogs-container{
        flex-direction: row;
        flex-wrap: wrap;
    }

    .dog-container {
        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
    	width: 20rem;
        border-color: rgb(30 64 175);
        border-width: 4px;
        flex-direction: column;
        margin: 1.5rem; /* 20px */
        border-radius: 0.5rem;
    }

    /* On mouse-over, add a deeper shadow */
    .dog-container:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
</style>