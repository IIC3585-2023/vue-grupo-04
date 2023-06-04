<template>
    <img class="dog-image" :src=pic>
</template>

<script>
    export default {
    props: ['name'],
    data() {
      return {
        pic: String,
      }
    },
    methods: {
      async getData() {
        if (this.name["name"] == "Caucasian Shepherd Dog"){
            const res_photo = await fetch("https://dog.ceo/api/breed/ovcharka/images/random/1");
            const finalRes_photo = await res_photo.json();
            this.pic = finalRes_photo["message"];
        }
        else if (this.name["name"] == "Bouvier des Flandres"){
            const res_photo = await fetch("https://dog.ceo/api/breed/bouvier/images/random/1");
            const finalRes_photo = await res_photo.json();
            this.pic = finalRes_photo["message"];
        }
        else if (this.name["name"] == "Border Collie"){
            const res_photo = await fetch("https://dog.ceo/api/breed/collie/border/images/random/1");
            const finalRes_photo = await res_photo.json();
            this.pic = finalRes_photo["message"];
        }
        else if (this.name["name"] == "Curly-Coated Retriever"){
            const res_photo = await fetch("https://dog.ceo/api/breed/retriever/curly/images/random/1");
            const finalRes_photo = await res_photo.json();
            this.pic = finalRes_photo["message"];
        }
        else {
            const res_photos = await fetch("https://dog.ceo/api/breed/ovcharka/images/random/1");
            const finalRes_photos = await res_photos.json();
            this.pic = "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg";
        }
      }
    },
    mounted() {
      this.getData()
    }
  }
 
</script>


<style scoped>
    .dog-image{
        width: 18rem;
        display: block;
        padding: 3px 3px;
    }
</style>