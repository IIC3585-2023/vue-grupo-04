<script setup>
  const base_url = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <nav class="topnav">
    <h1><span style="color: rgb(49, 166, 216)"> Miku</span>'s Dogs</h1>
    <div class="links-container">
      <a
        :class="{ active: activeLink === `${base_url}/` }"
        @click="setActiveLink(`${base_url}/`)"
        href="./"
        >Home</a
      >
      <a
        :class="{ active: activeLink === `${base_url}/random` }"
        @click="setActiveLink(`${base_url}/random`)"
        href="./random"
        >Random</a
      >
      <a
        :class="{ active: activeLink === `${base_url}/dogceo` }"
        @click="setActiveLink(`${base_url}/dogceo`)"
        href="./dogceo"
        >DogCeo</a
      >
      <!-- <a
        :class="{ active: activeLink === '/helloworld' }"
        @click="setActiveLink('/helloworld')"
        href="/helloworld"
        >HelloWorld</a
      > -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "home",
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link;
    },
  },
  mounted() {
    this.activeLink = window.location.pathname;
  },
};
</script>

<style scoped>
.topnav {
  width: 100%;
  background-color: #333;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.links-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: rgb(2 132 199);
  color: white;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
/* @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
} */

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
/* @media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
} */
</style>
