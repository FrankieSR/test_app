/**
* Created by vouill on 11/13/17.
*/

<template>
  <div class="navigation">
    <div class="logo-wrapper">
      <router-link to="/">
        <span>Сertification</span>
      </router-link>
    </div>

    <div v-if="isProfileLoaded">
      <router-link to="/account">Hello {{isUserName()}}</router-link>
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
      this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
    },
    isUserName: function() {
      if (localStorage.getItem("username")) {
        return localStorage.getItem("username");
      } else {
        return "_User";
      }
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
  background: #00bd85;
  min-height: 30px;
  border-bottom-left-radius: 35px;
  display: flex;
  justify-content: space-between;
  padding: 0 35px;
  font-weight: 700;
  font-size: 20px;
  align-items: center;
  font-family: "Share Tech Mono", monospace;
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
