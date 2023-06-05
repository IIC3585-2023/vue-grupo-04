<script setup>
import DogInfo from "./DogInfo.vue";
import DogImage from "./DogImage.vue";
</script>

<template>
  <div class="pagination">
    <button v-if="currentPage > 1" @click="prevPage">Prev</button>
    <span class="pages-span">Page {{ currentPage }} of {{ totalPages }}</span>
    <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
  </div>
  <div class="dogs-container">
    <div class="dog-container" v-for="item in listItems">
      <DogImage :data="item.attributes"></DogImage>
      <DogInfo :data="item.attributes"></DogInfo>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    DogImage,
    DogInfo,
  },
  data() {
    return {
      pic: String,
      listItems: [],
      currentPage: 1,
      totalPages: 29,
    };
  },
  methods: {
    async getData(page = 1) {
      const res = await fetch(
        `https://dogapi.dog/api/v2/breeds?page[number]=${page}`
      );
      const finalRes = await res.json();
      this.listItems = finalRes.data;
      this.totalPages = 29;
      // const res_photos = await fetch(
      //   "https://dog.ceo/api/breed/ovcharka/images/random/1"
      // );
      // const finalRes_photos = await res_photos.json();
      // this.listPhotos = finalRes_photos["message"];
      // this.pic = this.listPhotos;
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.getData(this.currentPage);
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.getData(this.currentPage);
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
}
.pages-span {
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem;
}

.dogs-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.dog-container {
  /* Add shadows to create the "card" effect */
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  width: 20rem;
  flex-direction: column;
  margin: 1.5rem; /* 20px */
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
}

/* On mouse-over, add a deeper shadow */
.dog-container:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
