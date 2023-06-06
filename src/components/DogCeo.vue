<script setup>
import LoadingSpin from "./LoadingSpin.vue";
</script>

<template>
  <main>
    <div class="url-container">
      <span class="console-text">https://dog.ceo/api/breed/</span>
      <select v-model="breed" @change="getRandomImage">
        <option v-for="breed in breedsCeoJson" :key="breed" :value="breed">
          {{ parseNameDog(breed) }}
        </option>
      </select>
      <span class="console-text">/images/random</span>
    </div>
    <div class="container">
      <LoadingSpin v-if="pic === ''" style="margin: 6rem 0" />
      <img class="dog-image" :src="pic" v-if="pic !== ''" />
    </div>
  </main>
</template>

<script>
import breedsCeoJson from "../utils/breedsCeo.json";

export default {
  data() {
    return {
      pic: "",
      breedsCeoJson: breedsCeoJson,
      breed: breedsCeoJson[0],
    };
  },
  methods: {
    async getRandomImage() {
      this.pic = "";
      const res = await fetch(
        `https://dog.ceo/api/breed/${this.breed}/images/random`
      );
      const finalRes = await res.json();
      this.pic = finalRes["message"];
    },

    parseNameDog(name) {
      let nameDog = name
        .split("/")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return nameDog;
    },
  },
  mounted() {
    this.getRandomImage();
  },
};
</script>

<style scoped>
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  background-color: #1b1b1b;
  width: 18rem;
  height: 18rem;
  padding: 1rem;
  margin: 1rem 0;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem;
}

.console-text {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.8rem;
  background-color: #444;
  padding: 0.5rem;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
}

.url-container {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
