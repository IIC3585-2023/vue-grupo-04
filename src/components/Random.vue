<script setup>
import LoadingSpin from "./LoadingSpin.vue";
</script>

<template>
  <main>
    <div class="container">
      <button class="button-random" @click="getRandomImage">
        Get Random Image
      </button>
      <LoadingSpin v-if="pic === ''" style="margin: 6rem 0" />
      <img class="dog-image" :src="pic" v-if="pic !== ''" />
      <b>{{ nameDog }}</b>
      <div class="text-container">
        <span class="console-text"> dog.ceo </span>
      </div>
    </div>
    <div class="container">
      <button class="button-random" @click="getRandomFact">
        Get Random Fact
      </button>
      <LoadingSpin v-if="fact === ''" />
      {{ fact }}
      <div class="text-container">
        <span class="console-text"> dogapi.dog </span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pic: "",
      fact: "",
      nameDog: String,
    };
  },
  methods: {
    async getRandomImage() {
      // https://dog.ceo/api/breeds/image/random
      this.pic = "";
      const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const finalRes = await res.json();
      this.pic = finalRes["message"];

      // get the name of the dog
      let name = this.pic.split("/")[4];
      this.nameDog = name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    async getRandomFact() {
      // https://dogapi.dog/api/v2/facts
      this.fact = "";
      const res = await fetch(`https://dogapi.dog/api/v2/facts`);
      const finalRes = await res.json();
      this.fact = finalRes["data"][0]["attributes"]["body"];
    },
  },
  mounted() {
    this.getRandomImage();
    this.getRandomFact();
  },
};
</script>

<style scoped>
.button-random {
  justify-self: auto;
  background-color: rgb(49, 166, 216);
  width: 100%;
  padding: 3px 0;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
.button-random:hover {
  filter: brightness(1.2);
}

.button-random:focus {
  outline: none;
}
.dog-image {
  width: 18rem;
  height: 18rem;
  display: block;
  padding: 3px 3px;
  object-fit: cover;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  min-height: 20rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  padding: 1rem;
  margin: 1rem;
}

main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem;
}

.console-text {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.8rem;
  background-color: #1b1b1b;
  padding: 0.3rem 0.5rem;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
}

.text-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
</style>
