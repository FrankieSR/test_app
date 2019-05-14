import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import * as firebaseDB from "firebase/app";
import firebaseConfig from "./data/firebaseConfig.js";
// import databaseConfig from "./data/databaseConfig.js";
import "firebase/auth";
import "firebase/database";
// firebaseDB.initializeApp(databaseConfig);

var defaultApp = firebase.initializeApp(firebaseConfig);
var defaultAuth = defaultApp.auth();
var defaultDatabase = defaultApp.database();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
