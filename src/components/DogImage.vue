<template>
  <img class="dog-image" :src="pic" />
</template>

<script>
import json from "../utils/mappingDogBreeds.json";

export default {
  props: ["data"],
  data() {
    return {
      pic: String,
      breeds: json.breeds,
    };
  },

  methods: {
    async getData() {
      if (!this.breeds.hasOwnProperty(this.data["name"])) {
        this.pic =
          "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg";
        return;
      }
      const res_photos = await fetch(
        `https://dog.ceo/api/breed/${
          this.breeds[this.data["name"]]
        }/images/random/1`
      );
      const finalRes_photos = await res_photos.json();
      this.pic = finalRes_photos["message"];
    },
  },
  mounted() {
    this.getData();
  },
  // if the data changes, we need to update the image
  watch: {
    data() {
      this.getData();
    },
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
</style>
