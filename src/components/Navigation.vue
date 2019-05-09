/**
* Created by vouill on 11/13/17.
*/

<template>
  <div class="navigation">
    <div class="logo-wrapper">
      <router-link to="/">
        <span>Sertification</span>
      </router-link>
    </div>

    <div v-if="isProfileLoaded">
      <router-link to="/account">Hello {{name}}</router-link>
    </div>
    <div class="auth-button-wrapper">
      <div v-if="isAuthenticated" @click="logout">
        <span class="logout">Logout</span>
      </div>
      <div v-if="!isAuthenticated && !authLoading">
        <router-link to="/login">
          <span>Login</span>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapState } from "vuex";
import store from "../store.js";

export default {
  name: "navigation",
  props: {
    name: String
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("AUTH_LOGOUT")
        .then(() => this.$router.push("/login"));
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading",
      getProfile: state => state.profile
    })
  }
};
</script>


<style lang="less" scoped>
a {
  color: white;
  text-decoration: none;
}

.navigation {
  background: #7babed;
  min-height: 50px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 3px 3px grey;
  margin-bottom: 20px;
}

.logout {
  &:hover {
    cursor: pointer;
  }

  h1 {
    font-weight: 500;
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
