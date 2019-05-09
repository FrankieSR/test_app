<template>
  <div>
    <p>Please enter your name and password that was provided to you</p>
    <form class="login" @submit.prevent="login">
      <div class="input-wrapper">
        <label for="username">Your name</label>
        <input required v-model="username" id="username" type="text" placeholder="Username">
        <label for="password">Password</label>
        <input required v-model="password" id="password" type="password" placeholder="Password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.loaderVisible = 1;

      this.$store.dispatch("AUTH_REQUEST", { username, password }).then(() => {
        this.$router.push("/");
        this.loaderVisible = 0;
      });
    }
  }
};
</script>
