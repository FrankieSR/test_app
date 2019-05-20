<template>
  <div class="search-block" ref="search" v-if="isAuthenticated">
    <div class="input-group">
      <input type="text" v-model.lazy="search" placeholder="Search Your Question">
      <button @click="searchQuestion()" class="search-button">Search</button>
    </div>
    <div class="search-result-list">
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
import questions from "../data/frontend";

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
      sortedList: []
    };
  },
  methods: {
    createArray() {
      for (const key in questions) {
        if (questions.hasOwnProperty(key)) {
          const element = questions[key];
          this.questions.push(element);
        }
      }
    },

    showSearchBlock(elem) {
      console.log(elem.toElement.parentNode.children);
      elem.toElement.parentNode.children[1].classList.toggle("active");
    },
    searchQuestion() {
      this.sortedList = this.questions.filter(
        item => item.question.indexOf(this.search) !== -1
      );
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
        console.log(this.search);
        return false;
      }

      return true;
    }
  },
  mounted() {
    this.createArray();
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
      padding: 2px 10px 0;
      width: 400px;
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
    margin-top: 12px;
    position: absolute;
    background: #00a8f3;
    width: 580px;
    z-index: 1000;
    border: 3px solid #000;
    border-left: 10px solid #00bc87;
    border-bottom: 1px solid red;
    border-top: none;
    max-height: 600px;
    overflow-y: auto;

    ul {
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 5px;
        font-size: 14px;
        padding: 7px;

        ul {
          background: #ffc54e;
          padding: 0;
          margin: 0;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.25, 0.45, 0.52, 0.95);
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
</style>
