<template>
  <div class="home-page">
    <Navigation/>
    <div v-if="isVisible">
      <Loader/>
    </div>
    <div class="last-results" v-if="lastResult">
      <span>Last result: {{lastResult}}%</span>
      <span>Best result: {{bestResult}}%</span>
    </div>
    <div class="home">
      <div v-if="!isAuthenticated">
        <h1>
          Hello
          <span>{{ isUserName()}}</span>(:
        </h1>
        <p>
          Welcome to page.
          <br>To start testing your knowledge, pls log in.
        </p>
        <div class="login-wrapper">
          <div>
            <button class="open-login" @click="openLogin()">
              <span v-if="!isDisplay">
                Open Log In
                <i class="fas fa-caret-up"></i>
              </span>
              <span v-else>
                Close
                <i class="fas fa-caret-down"></i>
              </span>
            </button>
          </div>
          <div v-show="isDisplay" ref="login-block">
            <login/>
          </div>
        </div>
      </div>
      <div class v-else>
        <h1>
          What’s up!
          <br>
          <span class="name">{{isUserName()}} :)</span>
        </h1>
        <h2>Choose a test that you want to try your hand at:</h2>
        <button class="goToChoiseCert open-login" @click="goToSertific">
          Go To Choise Test
          <i class="fas fa-caret-right"></i>
        </button>
        <!-- нужно добавить отображение если авторизирован -->
        <!-- можно добавить логаут -->
      </div>
    </div>
    <Rating />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Login from "./Login.vue";
import Loader from "../components/Loader.vue";
import Navigation from "../components/Navigation.vue";
import ChoiseSertification from "../views/ChoiseSertification.vue";
import Rating from "../components/Rating.vue";
import store from "../store.js";

export default {
  components: {
    Login,
    Loader,
    Navigation,
    ChoiseSertification,
    Rating
  },
  name: "home",
  data: function() {
    return {
      isDisplay: false,
      isVisible: false,
      lastResult: 0,
      bestResult: 0,
      allUsers: [],
      openIcon: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading";
    }
  },
  methods: {
    openLogin: function() {
      this.isDisplay = !this.isDisplay;
    },
    isUserName: function() {
      if (localStorage.getItem("name")) {
        return localStorage.getItem("name");
      } else {
        return "_User";
      }
    },

    logout: function() {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
        this.$store.dispatch("AUTH_LOGOUT").then(() => this.$router.push("/"));
      }, 500);
    },
    goToSertific: function() {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
        this.$router.push("/choise-certification");
      }, 500);
    },
    getResults: function() {
      const userID = localStorage.getItem("id");
      const self = this;

      this.$store.dispatch("GET_DATABASE", userID).then(data => {
        if (data) {
          self.lastResult = data.lastResult;
          self.bestResult = data.bestResultTest;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading"
    })
  },
  mounted() {
    this.getResults();
  }
};
</script>

<style  lang="less" scoped>
.home-page {
  min-height: 100vh;
  background: url("../assets/banner-2.png") no-repeat;
  background-position: 100% 100%;
  background-size: content;
  position: relative;
  overflow-x: hidden;

  .home {
    text-align: left;
    border: 1px solid black;
    border-left: 3px solid black;
    border-top: 3px solid black;
    border-right: 1px solid #fdc730;
    border-bottom: 10px solid #20a8f9;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 4px 0px,
      rgba(0, 0, 0, 0.2) 0px 2px 15px 0px;
    width: 26vw;
    // height: 30vh;
    padding: 35px;
    margin: 10px 50px;
    z-index: 200;
    background: #fff;

    h1 {
      line-height: 41px;
      letter-spacing: 1px;
      font-size: 38px;
      margin-bottom: 35px;

      span {
        font-family: "Share Tech Mono", monospace;
        font-size: 50px;
      }
    }

    p {
      margin: 10px 0;
      font-weight: 700;
      position: relative;
    }

    .open-login {
      width: 100%;
      height: 40px;
      border: none;
      cursor: pointer;
      background: #d9d9d9;
      border-right: 7px solid #fdc730;
      border-bottom: 1px solid #fdc730;
      font-weight: 700;
      font-size: 20px;
      font-family: "Share Tech Mono", monospace;
      transition: 0.3s;

      &:hover {
        border-bottom: 15px solid #20a8f9;
        border-right: 15px solid #fdc730;
        height: 50px;
      }
    }

    .goToChoiseCert {
    }
  }

  .name {
    font-family: "Share Tech Mono", monospace;
    border-bottom: 15px solid #fdc730;
    display: block;
    margin-bottom: 20px;
  }

  .last-results {
    display: flex;
    position: absolute;
    min-width: 550px;
    left: calc(50% - 150px);
    background-color: #fff;
    border: 2px solid black;
    padding: 20px;
    border-bottom-right-radius: 120px;
    border-bottom-left-radius: 120px;
    justify-content: space-around;
    font-family: "Share Tech Mono", monospace;
    border-bottom: 4px solid red;
    font-size: 18px;
    letter-spacing: -1px;
  }
}
</style>