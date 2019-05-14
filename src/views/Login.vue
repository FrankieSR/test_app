<template>
  <div class="login-page">
    <div class="login-wrapper">
      <p>
        Please enter
        <br>
        <strong>password that was provided to you</strong>
      </p>
      <form class="login" @submit.prevent="login">
        <div class="input-wrapper">
          <!-- <label for="username">Your name</label> -->
          <!-- <div class="input-group">
            <input required v-model="username" id="username" type="text" placeholder="Your Name">
            <i class="fas fa-user-circle"></i>
          </div>-->
          <label for="password">Password</label>
          <div class="input-group">
            <input required v-model="password" id="password" type="text" placeholder="Password">
            <i class="fas fa-lock"></i>
          </div>
          <!-- <div class="input-group">
            <label for="save_customer">Save name?</label>
            <input type="checkbox" @click="saveCustomer" v-model="ifSave" id="save_customer">
          </div>-->
        </div>
        <div class="buton-wrapper">
          <Loader v-if="loading"/>
          <div v-else>
            <button type="submit">
              <span>Enter</span>
              <i class="fas fa-door-closed"></i>
            </button>
          </div>
        </div>
      </form>
      <div v-show="error">
        <span class="error">Error access</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { mapGetters } from "vuex";
import Loader from "../components/Loader.vue";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: "",
      ifSave: true
    };
  },
  components: {
    Loader
  },
  methods: {
    login: function() {
      const { password } = this;
      const self = this;

      this.$store
        .dispatch("AUTH_REQUEST", {
          password
        })
        .then(() => {
          this.$store.dispatch("SET_DEFAULT_DATABASE").then((data) => {
            console.log("data added");
            console.log(data);
          });
          self.$router.push("/choise-certification");
        });
    },
    saveCustomer: function() {
      console.log(this.ifSave);
      this.ifSave = !this.ifSave;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    error: function() {
      return this.authStatus === "error";
    },
    loading: function() {
      return this.authStatus === "loading";
    }
  }
};
</script>


<style lang="less" scoped>
.login-wrapper {
  border: 1px solid #00bd85;
  margin: 35px 0 10px;
  width: 320px;
  margin: 30px auto 0;
  padding: 25px;

  p {
    text-align: center;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    label {
      font-family: "Share Tech Mono", monospace;
    }

    i {
      position: relative;
      top: 5px;
      margin-left: 8px;
      color: #20a8f9;
    }
  }

  input {
    margin: 0 0 10px;
    padding: 10px 15px;
    border: none;
    border-bottom: 2px solid #20a8f9;
  }

  button {
    display: block;
    width: 200px;
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
    margin: 10px auto 20px auto;
    text-align: center;
    position: relative;
    right: 10px;

    &:hover {
      border-bottom: 15px solid #20a8f9;
      border-right: 15px solid #fdc730;
      height: 50px;
    }
  }
}
</style>