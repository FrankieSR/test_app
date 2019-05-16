<template>
  <div class="search-block" ref="search" v-if="isAuthenticated">
    <div class="input-group">
      <input type="text" v-model.lazy="search">
      <button @click="searchQuestion()">Search</button>
    </div>
    <ul v-if="inputTextLenght">
      <li v-for="(question, i) in sortedList" :key="i">
        <h3 @click="showSearchBlock">{{question.question}}</h3>
        <ol v-show="show">
          <li v-for="(option, i) in question.choise" :key="i*10">{{option.option}}</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import questions from "../data/frontend";

export default {
  name: "Search",
  props: {},
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

    showSearchBlock() {
      this.show = !this.show;
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
    todosByTitle() {

    },
    inputTextLenght() {
      console.log(this.search.length);

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
</style>
