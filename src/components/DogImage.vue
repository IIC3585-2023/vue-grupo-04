<template>
  <img class="dog-image" :src="pic" />
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      pic: String,
      breeds: {
        "Caucasian Shepherd Dog": "ovcharka",
        "Bouvier des Flandres": "bouvier",
        "Border Collie": "collie/border",
        "Curly-Coated Retriever": "retriever/curly",
        // "Grand Basset Griffon Vendéen": "",
        // "Hokkaido": "",
        // "Japanese Terrier": "",
        // "Hanoverian Scenthound": "",
        // "Tibetan Spaniel": "",
        // "Skye Terrier": "",
      },
    };
  },

  methods: {
    async getData() {
      if (!this.breeds.hasOwnProperty(this.name["name"])) {
        this.pic =
          "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg";
        return;
      }
      const res_photos = await fetch(
        `https://dog.ceo/api/breed/${
          this.breeds[this.name["name"]]
        }/images/random/1`
      );
      const finalRes_photos = await res_photos.json();
      this.pic = finalRes_photos["message"];
    },
  },
  mounted() {
    this.getData();
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
