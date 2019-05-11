<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "app",
};
</script>


<style lang="less">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  padding: 0;
  margin: 0;

  -webkit-font-smoothing: antialiased;
}
</style>
