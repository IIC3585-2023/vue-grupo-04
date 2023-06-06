<script setup>
import DogInfo from "./DogInfo.vue";
import DogImage from "./DogImage.vue";
import LoadingSpin from "./LoadingSpin.vue";
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search by Name of Breed..."
      class="search-input"
      v-model="filter"
      @keyup="filterByName"
    />
  </div>

  <!-- filter by attributes.male_weight -->
  <div class="filter-group" v-if="filter === ''">
    <div>
      <span>Group</span>
      <select v-model="group" @change="runFilters">
        <option v-for="(value, key) in groups" :value="key">{{ value }}</option>
      </select>
    </div>
    <div>
      <span>Weight</span>
      <select v-model="weightCategory" @change="runFilters">
        <option v-for="(value, key) in weightCategories" :value="key">
          {{ value }}
        </option>
      </select>
    </div>
  </div>

  <div class="pagination" v-if="!loadingData">
    <button v-if="currentPage > 1" @click="prevPage">Prev</button>
    <span class="pages-span" v-if="totalPages > 0"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >
    <button v-if="currentPage < totalPages" @click="nextPage">Next</button>
  </div>

  <div class="dogs-container">
    <div class="loader-container">
      <LoadingSpin v-if="loadingData" />
    </div>
    <div
      v-if="!loadingData"
      class="dog-container"
      v-for="item in pageListItems"
    >
      <DogImage :data="item.attributes"></DogImage>
      <DogInfo :data="item.attributes"></DogInfo>
    </div>
  </div>

  <!-- <textarea v-model="allBreeds"></textarea> -->
</template>

<script>
import breedsIds from "../utils/breedsIds.json";

export default {
  components: {
    DogImage,
    DogInfo,
  },
  data() {
    return {
      pic: String,
      savedListItems: [],
      listItems: [],
      pageListItems: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 9,
      breedsIds: breedsIds,
      loadingData: true,
      filter: "",
      group: "",
      groups: {
        "": "All",
        "8000793f-a1ae-4ec4-8d55-ef83f1f644e5": "Foundation Stock Service",
        "b8e4e89d-057f-432a-9e58-0b85b29b693c": "Herding Group",
        "be0147df-7755-4228-b132-2518c0c6d10d": "Hound Group",
        "7f6ea988-366a-4e20-b4ba-4d04274fea61": "Non-Sporting Group",
        "ab110192-e41b-43ff-a630-f7aee156b33a": "Sporting Group",
        "1bbf373b-1937-4e73-9863-45385daa4979": "Terrier Group",
        "f56dc4b1-ba1a-4454-8ce2-bd5d41404a0c": "Toy Group",
        "56081cf0-fdf2-4114-9bf7-23a3f5b6af91": "Working Group",
        "d4b72541-a1c6-46d7-b13c-709e148c7884": "Miscellaneous Class",
      },
      weightCategory: 0,
      weightCategories: {
        0: "All",
        1: "Small dog (10kg or less)",
        2: "Medium dog (11kg -  25kg)",
        3: "Big dog (26kg or more)",
      },
      weightCategoriesWeights: {
        0: [0, Number.POSITIVE_INFINITY],
        1: [0, 10],
        2: [11, 25],
        3: [26, Number.POSITIVE_INFINITY],
      },
      // allBreeds: "",
    };
  },
  methods: {
    setPageItems() {
      this.pageListItems = this.listItems.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.itemsPerPage * this.currentPage
      );
    },
    async getData() {
      const promises = [...Array(29).keys()].map(async (page) => {
        const res = await fetch(
          `https://dogapi.dog/api/v2/breeds?page[number]=${page + 1}`
        );
        const finalRes = await res.json();
        return finalRes.data;
      });

      const results = await Promise.all(promises);
      this.listItems = results.flat();
      this.setPageItems();
      this.totalPages = Math.ceil(this.listItems.length / this.itemsPerPage);
      this.savedListItems = this.listItems.slice();
      // this.allBreeds += this.listItems.map((item) => `"${item.id}": "${item.attributes.name}"\n`);
    },

    async filterByName() {
      this.loadingData = true;
      this.currentPage = 1;
      const term = this.filter.toLowerCase();
      this.listItems = this.savedListItems.filter((dog) =>
        dog.attributes.name.toLowerCase().includes(term)
      );
      this.totalPages = Math.ceil(this.listItems.length / this.itemsPerPage);
      this.setPageItems();
      this.loadingData = false;
    },

    async filterByGroup() {
      this.currentPage = 1;
      if (this.group !== "") {
        const res = await fetch(
          `https://dogapi.dog/api/v2/groups/${this.group}`
        );
        const finalRes = await res.json();
        this.listItems = [];

        const promises = finalRes.data.relationships.breeds.data.map(
          async (dog) => {
            const res = await fetch(
              `https://dogapi.dog/api/v2/breeds/${dog.id}`
            );
            const finalRes = await res.json();
            return finalRes.data;
          }
        );
        const results = await Promise.all(promises);
        this.listItems = results.flat();
        this.totalPages = Math.ceil(this.listItems.length / this.itemsPerPage);
        this.setPageItems();
        this.savedListItems = this.listItems.slice();
        return;
      }
      await this.getData();
    },
    async filterByWeight() {
      if (this.weightCategory !== 0) {
        this.currentPage = 1;
        this.listItems = this.listItems.filter((item) => {
          const maleAverage =
            (item.attributes.male_weight.max +
              item.attributes.male_weight.min) /
            2;
          const femaleAverage =
            (item.attributes.female_weight.max +
              item.attributes.female_weight.min) /
            2;
          const averageInKg = (femaleAverage + maleAverage) / 2;
          return (
            averageInKg >=
              this.weightCategoriesWeights[this.weightCategory][0] &&
            averageInKg <= this.weightCategoriesWeights[this.weightCategory][1]
          );
        });
        this.setPageItems();
        this.totalPages = Math.ceil(this.listItems.length / this.itemsPerPage);
        this.savedListItems = this.listItems.slice();
      }
    },

    async runFilters() {
      this.loadingData = true;
      await this.filterByGroup();
      await this.filterByWeight();
      this.loadingData = false;
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.setPageItems();
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.setPageItems();
      }
    },
  },
  async mounted() {
    this.loadingData = true;
    await this.getData();
    this.loadingData = false;
  },
};
</script>

<style scoped>
.filter-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.search-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.search-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}
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
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
}

/* On mouse-over, add a deeper shadow */
.dog-container:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.loader-container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>
