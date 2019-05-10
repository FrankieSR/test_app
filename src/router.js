import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Account from "./views/Account.vue";
import Test from "./views/Test.vue";
import Login from "./views/Login.vue";
import ChoiseSertification from "./views/ChoiseSertification.vue";
import store from "./store";

Vue.use(Router);

const ifCustomerLeave = (to, from, next) => {
  const answer = window.confirm(
    "Вы хотите уйти? У вас есть несохранённые изменения!"
  );
  if (answer) {
    next("/");
  } else {
    next(false);
  }
};

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/test/:id",
      name: "Test",
      component: Test,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/choise-certification",
      name: "ChoiseSertification",
      component: ChoiseSertification,
      beforeEnter: ifAuthenticated
    }
  ]
});
