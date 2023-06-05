<template>
  <div>
    <div
      class="dog-name"
      @click="toggleDogInfo"
      :class="{ active: showDogInfo }"
    >
      {{ data.name }}
    </div>
    <div class="dog-info" :style="{ height: dogInfoHeight }">
      <div class="dog-description">
        {{ data.description }}
      </div>
      <div class="dog-male-weight">Male weight: {{ data.male_weight }}</div>
      <div class="dog-female-weight">
        Female weight: {{ data.female_weight }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      showDogInfo: false,
      dogInfoHeight: "0px",
    };
  },
  methods: {
    toggleDogInfo() {
      this.showDogInfo = !this.showDogInfo;
      this.dogInfoHeight = this.showDogInfo ? "400px" : "0px";
    },
  },
};
</script>

<style scoped>
.dog-name {
  justify-self: auto;
  background-color: rgb(49, 166, 216);
  width: 100%;
  padding: 3px 0;
  cursor: pointer;
}
.dog-description {
  text-align: justify;
  padding: 4px 4px;
}
.dog-male-weight {
  padding: 4px 4px;
}
.dog-female-weight {
  padding: 4px 4px;
  padding-bottom: 1rem;
}
.dog-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
</style>
