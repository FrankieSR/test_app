import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import frontend from "./data/frontend";
// import backend from "./data/backend";

import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token"),
    status: "",
    profile: {
      username: localStorage.getItem("name"),
      bestResult: "",
      lastResult: "",
      image: localStorage.getItem("photoURL")
    },
    questionList: frontend,
    choiseSertificationTest: "",
    randomQuestions: true,
    randomOptions: true
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = "success";
      state.token = token;
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
    },
    SORT_QUESTIONS: (state) => {
      state.randomQuestions = !state.randomQuestions;
    },
    SORT_OPTIONS: (state) => {
      state.randomOptions = !state.randomOptions;
    },
    SET_NAME: (state, name) => {
      state.profile.username = name;
    }
  },
  actions: {
    AUTH_REQUEST: ({
      commit,
      dispatch
    }, {
      password
    }) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");

        axios
          .post("https://frankiesr.getsandbox.com/login", {
            pass: password
          })
          .then(resp => {
            if (resp.data.isAuth !== "Denied" && resp.data.token !== "") {
              let provider = new firebase.auth.GoogleAuthProvider();
              const self = this;

              var database = firebase.database();

              firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                  var token = result.credential.accessToken;
                  var user = result.user;
                  localStorage.setItem("user-token", token);
                  commit("AUTH_SUCCESS", token);
                  dispatch("SET_USER_INFO", user);
                  // dispatch("GET_DATABASE", user.uid);  //user.id хранится в localStorage, можно будет обратиться при любом выхове get_database
                  resolve(user);
                })
                .catch(function (error) {
                  console.log(error.message);
                  commit("AUTH_LOGOUT");
                  commit("AUTH_ERROR", error);
                });
            } else {
              commit("AUTH_ERROR", resp.isAuth);
              localStorage.removeItem("user-token");
            }
          })
          .catch(err => {
            commit("AUTH_ERROR", err);
            localStorage.removeItem("user-token");
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: ({
      commit,
      dispatch
    }) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem("user-token");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        localStorage.removeItem("photoURL");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        resolve();
      });
    },

    GET_DATABASE: ({
      commit,
      dispatch
    }, userID) => {
      return new Promise((resolve, reject) => {
        let database = firebase.database();

        return firebase
          .database()
          .ref("/users/" + userID)
          .once("value")
          .then(snapshot => {
            resolve(snapshot.val());
          })
      });
    },

    SET_DEFAULT_DATABASE: ({
      commit,
      dispatch
    }) => {
      return new Promise((resolve, reject) => {
        let database = firebase.database(),
          userID = localStorage.getItem("id"),
          lastResult = localStorage.getItem("last-result") || 0,
          bestResultTest = localStorage.getItem("best_result") || 0,
          username = localStorage.getItem("name"),
          email = localStorage.getItem("email"),
          profile_picture = localStorage.getItem("photoURL");

        dispatch("GET_DATABASE", userID).then((userInfo) => {

          if (userInfo == undefined) {
            firebase
              .database()
              .ref("users/" + userID)
              .set({
                userID,
                username,
                email,
                profile_picture,
                lastResult,
                bestResultTest
              });
          }

          resolve(userInfo);
        });
      });
    },

    UPDATE_RESULT_DATABASE: ({
      commit,
      dispatch
    }) => {
      let database = firebase.database();

      return new Promise((resolve, reject) => {
        let lastResult = localStorage.getItem("last-result") || null;
        let bestResultTest = localStorage.getItem("best_result") || null;

        firebase
          .database()
          .ref("users/" + localStorage.getItem("id"))
          .update({
            result_test: lastResult, // нужно добавить результат теста в локалстораже в test.js
            best_result_test: bestResultTest // нужно добавить результат теста в локалстораже в test.js
          })
          .then(() => {
            resolve();
          });
      });
    },

    CHOISE_TEST: ({
      commit
    }, testName) => {
      commit("CHOISE_TEST", testName);

      if (testName == "frontend") {
        commit("SET_TEST", frontend);
      }
      if (testName == "backend") {
        // commit("SET_TEST", backend);
      }
      if (testName == "solution") {
        // commit("SET_TEST", solution);
      }
    },

    SET_USER_INFO: ({
      commit
    }, user) => {
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("photoURL", user.photoURL);
      localStorage.setItem("id", user.uid);
      localStorage.setItem("email", user.email);
      // commit("SET_USER_INFO");
    },
    SORT_QUESTIONS: ({
      commit
    }) => {
      commit("SORT_QUESTIONS");
    },
    SORT_OPTIONS: ({
      commit
    }) => {
      commit("SORT_OPTIONS");
    },
    SET_NAME: ({
      commit
    }, name) => {
      commit("SET_NAME", name);
    }
  },
  getters: {
    isAuthenticated: state => state.token,
    authStatus: state => state.status,
    isProfileLoaded: state => !!state.profile.username,
    getProfile: state => state.profile.username,
    getQuestionList: state => state.questionList,
    getTestName: state => state.choiseSertificationTest,
    getQuestionSort: state => state.randomQuestions,
    getOptionsSort: state => state.randomOptions
  }
});