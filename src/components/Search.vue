<template>
  <div class="search-block" ref="search" v-if="isAuthenticated">
    <div class="input-group">
      <input type="text" v-model.lazy="search" placeholder="Search Your Question">
      <button class="search-button" @click="openSearch">
        <span v-if="searchButtonOpen">Search <i class="fas fa-angle-double-down"></i></span>
        <span v-else>Close <i class="fas fa-angle-double-up"></i></span>
      </button>
      <div class="change-search-test" ref="searchButton">
        <button @click="searchQuestion('frontend')">Frontend</button>
        <button @click="searchQuestion('backend')">Backend</button>
        <button @click="searchQuestion('solution')">Solution</button>
      </div>
    </div>
    <div class="search-result-list" ref="listSearch">
      <ul v-if="inputTextLenght">
        <li v-for="(question, i) in sortedList" :key="i">
          <h5 @click="showSearchBlock($event)" class="search-title">{{question.question}}</h5>
          <ul>
            <span></span>
            <li v-for="(option, i) in question.choise" :key="i*10">
              <span v-if="option.isTrue == true" class="true-answer">{{option.option}}</span>
              <span v-else>{{option.option}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import questionsF from "../data/frontend";
import questionsB from "../data/backend";
import questionsS from "../data/solution";

export default {
  name: "Search",
  props: {
    // visible: Boolean
  },
  data: function() {
    return {
      search: "",
      questions: [],
      show: false,
      sortedList: [],
      searchButtonOpen: true
    };
  },
  methods: {
    createArray(questionsList) {
      for (const key in questionsList) {
        if (questionsList.hasOwnProperty(key)) {
          const element = questionsList[key];
          this.questions.push(element);
        }
      }
    },

    showSearchBlock(elem) {
      elem.toElement.parentNode.children[1].classList.toggle("active");
    },
    searchQuestion(questionsList) {
      this.questions = [];

      if (questionsList == "frontend") {
        this.createArray(questionsF);
      }
      if (questionsList == "backend") {
        this.createArray(questionsB);
      }
      if (questionsList == "solution") {
        this.createArray(questionsS);
      }

      this.sortedList = this.questions.filter(
        item => item.question.indexOf(this.search) !== -1
      );
    },

    openSearch() {
      this.$refs.searchButton.classList.toggle("change-search-open");
      this.searchButtonOpen = false
      this.$refs.searchButton.classList.contains("change-search-open")
        ? (this.searchButtonOpen = false)
        : (this.searchButtonOpen = true);
    }
  },
  filters: {},
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading"
    }),
    inputTextLenght() {
      if (this.search.length < 2) {
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped lang="less">
.search-block {
  max-width: 800px;
  position: relative;
  font-family: "Roboto", sans-serif;
  text-align: left;

  .input-group {
    input {
      height: 25px;
      border: 2px solid #000;
      border-right: none;
      outline: none;
      padding: 3px 10px 0;
      width: 70%;
      font-family: "Share Tech Mono", monospace;
    }

    button {
      padding: 3px 5px 3.6px;
      outline: none;
      border: 2px solid #000;
      border-left: none;
      background: #ffc54e;
      font-family: "Share Tech Mono", monospace;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 6px 0px,
          rgba(0, 0, 0, 0.2) 0px 2px 32px 0px;
      }

      &:active {
        transform: translateY(4px);
        border-top: 3px solid #00a8f3;
      }
    }
  }

  .search-result-list {
    margin-top: 0px;
    position: absolute;
    background: #000;
    width: 640px;
    z-index: 1000;
    right: 150px;
    top: 35px;
    border: 5px solid #00bc87;
    border-bottom: 7px solid #00bc87;
    border-top: none;
    max-height: 600px;
    overflow-y: auto;

    ul {
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 5px;
        font-size: 14px;
        padding: 2px;

        ul {
          background: #ffc54e;
          padding: 0;
          margin: 0;
          max-height: 0;
          transition: max-height 0.5s;
          overflow: hidden;

          position: relative;

          li {
            font-weight: 400;
          }
        }

        .active {
          max-height: 500px;
        }

        .true-answer {
          background: #00bc87;
          display: block;
          padding: 3px 0;
        }
      }
    }

    .search-title {
      padding: 7px;
      background: #fff;
      cursor: pointer;
      z-index: 999;
      top: 0;
      margin: 0;
      display: block;
      font-size: 14px;
    }
  }
}

.change-search-test {
  position: absolute;
  right: 40px;
  display: flex;
  flex-direction: column;
  padding: 3px;
  border: 10px solid #00bc87;
  border-top: 0px solid #00bc87;
  background: black;
  box-shadow: -1px 12px 8px rgba(0, 0, 0, 0.3);
  top: -200px;
  transition: 0.3s;
  z-index: 1000;
}

.change-search-open {
  top: 35px !important;
}

.message-warning {
  font-size: 13px;
  color: red;
  line-height: 10px;
  margin: 0;
  position: relative;
  top: 3px;
  letter-spacing: 0.3px;
}
</style>
