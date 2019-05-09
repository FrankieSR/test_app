import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import frontend from "./data/frontend";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token"),
    status: "",
    profile: {
      username: localStorage.getItem("username"),
      bestResult: ""
    },
    questionList: "",
    choiseSertificationTest: ""
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, resp) => {
      state.status = "success";
      state.token = resp.data.token;
    },
    AUTH_ERROR: state => {
      state.status = "error";
    },
    AUTH_LOGOUT: state => {
      state.token = "";
    },
    CHOISE_TEST: (state, testName) => {
      state.choiseSertificationTest = testName;
    },
    SET_TEST: (state, changedTest) => {
      state.questionList = changedTest;
      console.log(state.questionList);
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, { username, password }) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        console.log({ username, password });
        axios
          .post("http://frankiesr.getsandbox.com/login", {
            username: username,
            pass: password
          })
          .then(resp => {
            if (resp.data.isAuth !== "Denied" && resp.data.token !== "") {
              localStorage.setItem("user-token", resp.data.token);
              localStorage.setItem("username", resp.data.name);
              commit("AUTH_SUCCESS", resp);
              resolve(resp);
            } else {
              commit("AUTH_ERROR", resp.isAuth);
              localStorage.removeItem("user-token");
              localStorage.removeItem("username");
            }
          })
          .catch(err => {
            commit("AUTH_ERROR", err);
            localStorage.removeItem("user-token");
            localStorage.removeItem("username");
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem("user-token");
        localStorage.removeItem("username");
        resolve();
      });
    },
    CHOISE_TEST: ({ commit }, testName) => {
      commit("CHOISE_TEST", testName);
      localStorage.setItem("choiseSertificationTest", testName);
      if (localStorage.getItem("choiseSertificationTest") == "frontend") {
        commit("SET_TEST", frontend);
      }
      // if (testName == "backend") {
      //   commit("SET_TEST", frontend);
      // }
      // if (testName == "asociate") {
      //   commit("SET_TEST", frontend);
      // }
    }
  },
  getters: {
    isAuthenticated: state => state.token,
    authStatus: state => state.status,
    isProfileLoaded: state => !!state.profile.username,
    getProfile: state => state.profile,
    getQuestionList: state => state.questionList,
    getTestName: state => state.choiseSertificationTest
  }
});
