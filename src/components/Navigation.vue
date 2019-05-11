/**
* Created by vouill on 11/13/17.
*/

<template>
  <div class="navigation">
    <div class="logo-wrapper">
      <router-link to="/">
        <span>
          Сertification
          <i class="fas fa-certificate"></i>
        </span>
      </router-link>
    </div>
    <div v-if="isVisible">
      <Loader/>
    </div>
    <div v-if="isProfileLoaded" class="user-link">
      <router-link tag="div" to="/account">
         {{isUserName()}}
        <i class="fas fa-user-ninja"></i>
      </router-link>
    </div>
    <div class="auth-button-wrapper">
      <div v-if="isAuthenticated" @click="logout">
        <span class="logout">
          Logout
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </div>
      <div v-if="!isAuthenticated && !authLoading">
        <router-link to="/login">
          <span>
            Login
            <i class="fas fa-door-closed"></i>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapState } from "vuex";
import store from "../store.js";
import Loader from "../components/Loader.vue";

export default {
  name: "navigation",
  props: {
    name: String
  },
  data: function() {
    return {
      isVisible: false
    }
  },
  components: {
    Loader
  },
  methods: {
    logout: function() {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
        this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
      }, 500);
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

.user-link {
  div {
    color: black;
    cursor: pointer;
  }
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
