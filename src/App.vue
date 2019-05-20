<template>
  <div id="app">
    <div class="banner">
      <h1>Please open on a device with a screen width of more than 1200px</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "app"
};
</script>

<style lang="less">
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.banner {
  display: none;
  position: fixed;
  min-height: 100%;
  width: 100%;
  z-index: 1000;
  background: url("./assets/404.svg") #fec82f no-repeat;
  background-position: 0% 10%;
  background-size: content;
  height: 100vh;
}

body {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

@media (max-width: 1200px) { 
  .banner {
    display: block;
  }
}
</style>
