<template>
  <div class="account">
    <div class="wrapper">
      <Navigation/>
      <div class="user-information">
        <div class="name">
          <h3>{{getUsername()}} <i class="fas fa-user-edit"></i></h3>
        </div>
        <div class="img">
          <img v-bind:src="getUserImage()" alt="icon">
        </div>
      </div>
      <h1>This page is under construction.</h1>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  name: "Account",
  components: {
    Navigation
  },
  methods: {
    getUsername: function() {
      return localStorage.getItem("name");
    },

    getUserImage: function() {
      return localStorage.getItem("photoURL");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.account {
  .user-information {
    width: 30%;
    text-align: center;
    padding: 10px 20px 0 0;
    float: right;
    border: 10px solid #00BC87;
    border-bottom-left-radius: 120px;
    margin-left: 35px;

    .img {
      img {
        border-radius: 50%;
        border: 4px solid #FFC261;
        width: 15%;
      }
    }
  }

  background: url("../assets/banner-1.png") no-repeat;
  background-position: 0% 100%;
  background-size: 40%;
  height: 100vh;
  font-size: 30px;

  h1 {
    font-family: "Share Tech Mono", monospace;
  }

  span {
    margin-bottom: 10px;
    line-height: 22px;
    display: block;
  }
}
</style>
