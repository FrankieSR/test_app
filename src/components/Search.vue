<template>
  <div class="search-block" ref="search" v-if="isAuthenticated">
    <input type="text" v-model="search">
    <ul>
      <li v-for="(question, i) in todosByTitle" :key="i">{{ question }}</li>
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
      search: " ",
      questions: []
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
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.authStatus === "loading"
    }),
    todosByTitle() {
      return this.questions.filter(item => item.question.indexOf(this.search) !== -1);
    }
  },
  mounted() {
    this.createArray();
  }
};
</script>

<style scoped lang="less">
</style>
