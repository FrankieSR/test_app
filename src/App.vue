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
@blue: #7babed;
@rouse: #f6c2d8;
@yellow: #fcebbf;
@grey: #ced6e3;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;

  -webkit-font-smoothing: antialiased;
}
</style>
