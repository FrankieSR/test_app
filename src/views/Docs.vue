<template>
  <div class="docs-wrapper">
    <Navigation/>
    <span v-show="loader">
      <Loader/>
    </span>
    <h2>There will be documentation</h2>
    <form @submit.prevent="addLinkToDB">
      <input type="text" ref="link" v-model="addLink">
      <textarea cols="30" rows="10" v-model="noteLink"></textarea>
      <button type="submit">Add Docs Link</button>
    </form>
    <div class="links">
      <ul>
        <li v-for="(link, index) in linksData.link" v-bind:key="index">
          <a v-bind:href="link">{{link}}</a>
          <p>{{linksData.note[index]}}</p>
        </li>
      </ul>
      <p>{{linksData.errorMessage}}</p>
    </div>
    <Rating/>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Login from "./Login.vue";
import Loader from "../components/Loader.vue";
import Navigation from "../components/Navigation.vue";
import Rating from "../components/Rating.vue";
import LastResults from "../components/LastResults.vue";
import store from "../store.js";
import { setTimeout } from "timers";

export default {
  components: {
    Login,
    Loader,
    Navigation,
    Rating,
    LastResults
  },
  name: "home",
  data: function() {
    return {
      addLink: "",
      noteLink: "",
      linksData: {
        link: [],
        note: [],
        errorMessage: ""
      },
      loader: false
    };
  },
  methods: {
    addLinkToDB() {
      const _self = this;
      let _count = Math.ceil(Math.random() * 10000);
      let _linkID = (localStorage.getItem("name") + _count).replace(/\s/g, "");

      _self.loader = true;

      setTimeout(() => {
        let info = {
          _linkResourse: _self.addLink,
          _linkID,
          _noteLink: _self.noteLink
        };

        this.$store.dispatch("ADD_LINK_TO_DB", info).then(() => {
          _self.loader = false;
          _self.getLinks();

        });
      }, 300);
    },

    getLinks() {
      const _self = this;
      _self.loader = true;
      this.$store.dispatch("GET_LINKs_FROM_DB").then((linksInfo) => {
        _self.linksData.link = [];
        _self.linksData.note = [];

        for (const key in linksInfo) {
          if (linksInfo.hasOwnProperty(key)) {
            _self.linksData.link.push(linksInfo[key].link);
            _self.linksData.note.push(linksInfo[key].note);
          }
        }

        _self.loader = false;
      }).catch((message) => {
        _self.linksData.errorMessage = message;
        console.log(_self.linksData.errorMessage);
        _self.loader = false;
      });
    }
  },
  computed: {
    ...mapGetters([
      "getProfile",
      "isAuthenticated",
      "isProfileLoaded",
      "authStatus"
    ])
  },
  mounted() {
    this.getLinks();
  }
};
</script>

<style lang="less" scoped>
.docs-wrapper {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
