<script setup>
import DogInfo from "./DogInfo.vue";
import DogImage from "./DogImage.vue";
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search by Name of Breed..."
      class="search-input"
      v-model="filter"
      @keyup.enter="getData"
    />
    <button class="search-button" @click="getData">Search</button>
  </div>

  <!-- filter by attributes.male_weight -->
  <div class="filter-group" v-if="filter === ''">
    <span>Group</span>
    <select v-model="group" @change="getData">
      <option v-for="(value, key) in groups" :value="key">{{ value }}</option>
    </select>
  </div>

  <div class="pagination" v-if="filter === ''">
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
      listItems: [],
      currentPage: 1,
      totalPages: 29,
      breedsIds: breedsIds,
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
      // allBreeds: "",
    };
  },
  methods: {
    async getData(page = 1) {
      if (this.group !== "") {
        const res = await fetch(
          `https://dogapi.dog/api/v2/groups/${this.group}`
        );
        const finalRes = await res.json();
        this.listItems = [];

        finalRes.data.relationships.breeds.data.map(async (dog) => {
          const res = await fetch(`https://dogapi.dog/api/v2/breeds/${dog.id}`);
          const finalRes = await res.json();
          this.listItems = [...this.listItems, finalRes.data];
        });
        return;
      }
      if (this.filter !== "") {
        let arrayIdDogs = [];
        this.listItems = [];

        Object.values(breedsIds).map((name) => {
          if (name.toLowerCase().includes(this.filter.toLowerCase())) {
            arrayIdDogs = [
              ...arrayIdDogs,
              ...Object.keys(breedsIds).filter(
                (key) => breedsIds[key] === name
              ),
            ];
          }
        });
        arrayIdDogs.map(async (dogId) => {
          const res = await fetch(`https://dogapi.dog/api/v2/breeds/${dogId}`);
          const finalRes = await res.json();
          this.listItems = [...this.listItems, finalRes.data];
        });

        return;
      }
      const res = await fetch(
        `https://dogapi.dog/api/v2/breeds?page[number]=${page}`
      );
      const finalRes = await res.json();
      this.listItems = finalRes.data;
      this.totalPages = 29;
      // this.allBreeds += this.listItems.map((item) => `"${item.id}": "${item.attributes.name}"\n`);
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
.search-button{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.search-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
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
</style>
