import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import frontend from "./data/frontend";
import backend from "./data/backend";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token"),
    status: "",
    profile: {
      username: localStorage.getItem("name"),
      bestResult: ""
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
    AUTH_REQUEST: ({ commit, dispatch }, { password }) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");

        axios
          .post("https://frankiesr.getsandbox.com/login", {
            pass: password
          })
          .then(resp => {
            if (resp.data.isAuth !== "Denied" && resp.data.token !== "") {
              localStorage.setItem("user-token", resp.data.token);
              // commit("SET_NAME", resp.data.name);
              commit("AUTH_SUCCESS", resp);
              resolve(resp);
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
    AUTH_LOGOUT: ({ commit, dispatch }) => {
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
    CHOISE_TEST: ({ commit }, testName) => {
      commit("CHOISE_TEST", testName);

      if (testName == "frontend") {
        commit("SET_TEST", frontend);
      }
      if (testName == "backend") {
        commit("SET_TEST", backend);
      }
      if (testName == "solution") {
        // commit("SET_TEST", solution);
      }
    },
    SET_USER_INFO: ({ commit }, user)=>{
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("photoURL",  user.photoURL);
      localStorage.setItem("id", user.uid);
      localStorage.setItem("email",  user.email);
      // commit("SET_USER_INFO");
    },
    SORT_QUESTIONS: ({ commit }) => {
      commit("SORT_QUESTIONS");
    },
    SORT_OPTIONS: ({ commit }) => {
      commit("SORT_OPTIONS");
    },
    SET_NAME: ({ commit }, name) => {
      commit("SET_NAME", name);
    }
  },
  getters: {
    isAuthenticated: state => state.token,
    authStatus: state => state.status,
    isProfileLoaded: state => !!state.profile.username,
    getProfile: state => state.profile,
    getQuestionList: state => state.questionList,
    getTestName: state => state.choiseSertificationTest,
    getQuestionSort: state => state.randomQuestions,
    getOptionsSort: state => state.randomOptions
  }
});
