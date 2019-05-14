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
        <div class="account-info">
          <div class="name"><span>Hello</span> {{isUserName()}}</div>
          <div class="user-image">
            <img v-bind:src="isUserImage()" alt="">
          </div>
          <span>Good Luck</span>  
        </div>
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
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";

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
        firebase.auth().signOut().then(function() {
      
        }).catch(function(error) {
          // An error happened.
        });
        this.isVisible = false;
        this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
      }, 500);
    },
    isUserName: function() {
      return localStorage.getItem("name");
    },
    isUserImage: function() {
       if (localStorage.getItem("photoURL")) {
        return localStorage.getItem("photoURL");
      }      
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading",
      getProfile: state => state.profile
    }),

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
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  font-weight: 700;
  font-size: 20px;
  align-items: center;
  font-family: "Share Tech Mono", monospace;
}

.account-info {
  display: flex;
  align-items: center;

  .user-image {
    flex-basis: 20%;
  }
  img {
    width: 50%;
    border-radius: 50%;
    border: 4px solid #FEC82F;
    box-sizing: border-box;
  }

  .name {
    color: #005FD1;
  }

      span {
      color: black;
    }
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
