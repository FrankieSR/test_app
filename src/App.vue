<template>
  <div id="app">
    <div class="banner" v-if="ifVisible">
      <h1>Please open on a device with a screen width of more than 1200px</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "app",
  data: function() {
    return {
      ifVisible: false
    };
  },
  methods: {
    resize() {
      window.innerWidth < 1200
        ? (this.ifVisible = true)
        : (this.ifVisible = false);
      console.log(this.ifVisible);
      window.addEventListener("resize", function() {
        if (window.innerWidth < 1200) {
          return this.ifVisible = true;
        }
      });
    }
  },
  mounted() {
    this.resize();
  }
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
</style>
