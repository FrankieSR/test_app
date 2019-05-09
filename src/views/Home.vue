<template>
  <div>
    <Navigation/>
    <div class="div" v-if="loading">
      <Loader/>
    </div>
    <div class="home">
      <div v-if="!isAuthenticated">
        <h1>Sertification</h1>
        <div class="login-wrapper">
          <login/>
        </div>
      </div>
      <div class v-else>
        <ChoiseSertification />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "./Login.vue";
import Loader from "../components/Loader.vue";
import Navigation from "../components/Navigation.vue";
import ChoiseSertification from "../views/ChoiseSertification.vue";

export default {
  components: {
    Login,
    Loader,
    Navigation,
    ChoiseSertification
  },
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading";
    }
  }
};
</script>

<style  lang="less">
.home {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  h1 {
    color: #2c3e50;
  }
}
</style>