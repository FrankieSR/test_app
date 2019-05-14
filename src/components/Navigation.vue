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
        <div class="account-info" v-if="isAuthenticated">
          <div class="name">
            <span>Hello</span>
            {{name}}
          </div>
          <div class="user-image">
            <img v-bind:src="imageSRC" alt="icon">
          </div>
          <span>GL HF</span>
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
import "firebase/auth";

export default {
  name: "navigation",
  props: {
    lastResult: Number,
    bestResult: Number
  },
  data: function() {
    return {
      isVisible: false,
      name: "",
      imageSRC: ""
    };
  },
  components: {
    Loader
  },
  methods: {
    logout: function() {
      const self = this;

      this.isVisible = true;
      setTimeout(() => {
        firebase
          .auth()
          .signOut()
          .then(function() {
            // можно добавить евент, когда кастомер разлогинился
            self.isVisible = false;
          })
          .catch(function(error) {
            console.log(error);
          });

        this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
      }, 500);
    },
    isUserName: function() {
      this.name = localStorage.getItem("name");
    },
    isUserImage: function() {
      this.imageSRC = localStorage.getItem("photoURL");
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading"
    })
  },
  mounted() {
    this.isUserName();
    this.isUserImage();
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
    border: 4px solid #fec82f;
    box-sizing: border-box;
  }

  .name {
    color: #005fd1;
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
