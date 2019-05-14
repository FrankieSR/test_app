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
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
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

      this.$store.dispatch("AUTH_REQUEST", { password }).then(() => {
        // if (this.ifSave) {
        //   localStorage.setItem("username", this.username);
        // }

        this.googleAuth();

      });
    },
    saveCustomer: function() {
      console.log(this.ifSave);
      this.ifSave = !this.ifSave;
    },
    googleAuth: function() {
      let self = this;
      var database = firebase.database();
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // console.log(user);

          self.$store.dispatch("SET_USER_INFO", user);
                  let database = firebase.database();

        // var userId = firebase.auth().currentUser.;
        return firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value")
          .then(function(snapshot) {
            console.log(snapshot.val());
            self.$router.push("/choise-certification");
          });
          
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          self.$store.dispatch("AUTH_LOGOUT");
          // ...
        });
    },
    writeUserData: function(userId, name, email, imageUrl) {
      firebase
        .database()
        .ref("users/" + userId)
        .set({
          username: name,
          email: email,
          profile_picture: imageUrl
        });
    },
    setInfoUser: function(token, name, photo) {
      localStorage.setItem("user-token", token);
      localStorage.setItem("name", username);
      localStorage.setItem("photoURL", user.photo);
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
