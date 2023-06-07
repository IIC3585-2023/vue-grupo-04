<!-- <script>
import React, { useEffect, useState } from 'react';

const MyComponent = ({ prop1 }) => {
  const [imgUrl, setImgUrl] = useState('');

  const loadImage = () => {
    setImgUrl(prop1 || 'https://upload.wikimedia.org/wikipedia/commons/1/10/Red_Color.jpg');
  };

  useEffect(() => {
    loadImage();
  }, [prop1]);

  return <img className="image-class" src={imgUrl} />;
};

export default MyComponent;
</script> -->



<template>
  <img class="image-class" :src="imgUrl" />
</template>

<script>
export default {
  props: ["prop1"],
  data() {
    return {
      imgUrl: String,
    };
  },

  methods: {
    loadImage() {
      this.imgUrl =
        this.prop1 ||
        "https://upload.wikimedia.org/wikipedia/commons/1/10/Red_Color.jpg";
    },
  },

  mounted() {
    this.loadImage();
  },

  watch: {
    data() {
      this.loadImage();
    },
  },
};
</script>
