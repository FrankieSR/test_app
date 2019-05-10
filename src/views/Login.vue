<template>
  <div class="login-wrapper">
    <p>
      Please enter your name and
      <strong>password that was provided to you</strong>
    </p>
    <form class="login" @submit.prevent="login">
      <div class="input-wrapper">
        <label for="username">Your name</label>
        <input required v-model="username" id="username" type="text" placeholder="Username">
        <label for="password">Password</label>
        <input required v-model="password" id="password" type="password" placeholder="Password">
      </div>
      <div class="buuton-wrapper">
        <div v-if="loading">
          <div class="div" v-if="loading">
            <Loader/>
          </div>
        </div>
        <div v-else>
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
    <div v-show="error">
      <span class="error">Error access</span>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { mapGetters } from "vuex";
import Loader from "../components/Loader.vue";

export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    Loader
  },
  methods: {
    login: function() {
      const { username, password } = this;

      this.$store.dispatch("AUTH_REQUEST", { username, password }).then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    error: function() {
      return this.authStatus === "error";
    },
    loading: function() {
      return this.authStatus === "loading";
    },
  }
};
</script>


<style lang="less" scoped>
.login-wrapper {
  width: 40vw;
  min-height: 350px;
  background: #f6c2d8;
  padding: 25px 15px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 7px 0 rgb(187, 123, 155);

  p {
    font-size: 120%;

    strong {
      font-size: 122%;
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;

    label {
      font-weight: 700;
      font-size: 120%;
      padding: 3px;
    }

    input {
      font-size: 120%;
      border-radius: 8px;
      padding: 10px;
      border: none;
      margin-bottom: 15px;
      width: 60%;
    }
  }

  button {
    border-radius: 10px;
    border: none;
    font-size: 120%;
    font-weight: 700;
    padding: 10px 15px;
    cursor: pointer;
    transition: 0.2s;
    background: #7babed;
    box-shadow: 0 3px 0 #3c93d5;
    color: #fff;

    &:hover {
      box-shadow: 0 8px 0 #3c93d5;
      transform: translateY(-6px);
    }
  }

  .error {
    font-size: 140%;
    color: red;
  }

  .buuton-wrapper {
    position: relative;
  }
}
</style>
