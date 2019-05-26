<template>
  <div class="navigation">
    <Loader v-if="isVisible"/>
    <div class="logo-wrapper">
      <router-link to="/">
        <span>
          Сertification
          <i class="fas fa-certificate"></i>
        </span>
      </router-link>
    </div>
    <div class="search-block" v-if="isAuthenticated">
      <Search/>
    </div>
    <div class="auth-button-group">
      <router-link tag="div" to="/account">
        <div class="user-info" v-if="isAuthenticated">
          <span class="name">{{ name }}</span>
          <div class="user-image">
            <div v-if="imageSRC">
              <img v-bind:src="imageSRC" alt="icon">
            </div>
            <div v-else>
              <i class="fas fa-user-circle"></i> 
            </div>
          </div>
        </div>
      </router-link>
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
import * as firebase from "firebase/app";
import store from "../store.js";
import Loader from "../components/Loader.vue";
import Search from "../components/Search.vue";
import "firebase/auth";

export default {
  name: "navigation",
  data: function() {
    return {
      isVisible: false,
      name: "",
      imageSRC: ""
    };
  },
  components: {
    Loader,
    Search
  },
  methods: {
    logout: function() {
      const _self = this;

      this.isVisible = true;
      setTimeout(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            // можно добавить евент, когда кастомер разлогинился
            _self.isVisible = false;
          })
          .catch(function(error) {
            console.log(error);
          });

        this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
      }, 500);
    },

    getUsername: function() {
      this.name = localStorage.getItem("name");
    },

    getUserImage: function() {
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
    this.getUsername();
    this.getUserImage();
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
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  font-weight: 700;
  font-size: 20px;
  align-items: center;
  font-family: "Share Tech Mono", monospace;
  text-align: left;

  .logo-wrapper {
    display: flex;
    justify-content: space-between;
    flex-basis: 20%;
  }

  .auth-button-group {
    flex-basis: 20%;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .search-block {
    flex-basis: 35%;
  }

  .navigation-account-link {
    flex-basis: 30%;
    text-align: center;
    display: flex;

    div {
      color: black;
      cursor: pointer;
      margin: 0 auto;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #005fd1;

  &:hover {
    text-decoration: underline;
  }

  .name {
    margin-right: 15px;
  }
}

.user-image {
  cursor: pointer;

  img {
    width: 45px;
    border-radius: 50%;
    border: 2px solid #fec82f;
    box-sizing: border-box;
    margin-right: 10px;
    box-shadow: 1px 1px 8px rgb(66, 65, 65);
    transition: 0.3s;
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
