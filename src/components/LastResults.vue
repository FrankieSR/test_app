<template>
  <div class="customer-results" v-if="lastResult != undefined && isAuthenticated">
    <span>Last result: {{ lastResult.toFixed(2) }}%</span>
    <span>Best result: {{ bestResult.toFixed(2) }}%</span>
  </div>
</template>

<script>
import store from "../store.js";
import { mapGetters, mapState } from "vuex";

export default {
  name: "LastResults",
    data: function() {
    return {
      lastResult: 0,
      bestResult: 0,
    };
  },
  methods: {
    getResultsScore: function() {
      const _userID = localStorage.getItem("id"),
        _self = this;

      this.$store.dispatch("GET_DATABASE", _userID).then(data => {
        if (data) {
          _self.lastResult = data.lastResult;
          _self.bestResult = data.bestResultTest;
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      "getProfile",
      "isAuthenticated",
      "isProfileLoaded",
      "authStatus"
    ]),
    ...mapState({
      authLoading: state => state.authStatus === "loading",
      loading: function() {
        return this.authStatus === "loading";
      }
    })
  },
  mounted() {
    this.getResultsScore();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .customer-results {
    display: flex;
    flex-direction: column;
    position: absolute;
    min-width: 290px;
    right: 0;
    background-color: #fff;
    border: 2px solid black;
    padding: 15px 0px 15px 15px;
    border-bottom-left-radius: 120px;
    justify-content: space-around;
    font-family: "Share Tech Mono", monospace;
    border-bottom: 4px solid red;
    font-size: 18px;
    letter-spacing: -1px;
  }
</style>
