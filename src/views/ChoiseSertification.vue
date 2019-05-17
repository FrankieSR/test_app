<template>
  <div class="choiseSertification">
    <Navigation />
    <Loader v-if="isVisible" />
    <div class="test-options">
      <div class="input-group">
        <label for="sort_questions"
          ><i class="fas fa-random"> </i> Sort Questions?</label
        >
        <input
          type="checkbox"
          @click="changeConditionQuestions"
          v-model="ifSortQuestions"
          id="sort_questions"
        />
      </div>
      <div class="input-group">
        <label for="sort_options"
          ><i class="fas fa-random"></i> Sort Question Options?
        </label>
        <input
          type="checkbox"
          @click="changeConditionOptions"
          v-model="ifSortOptions"
          id="sort_options"
        />
      </div>
    </div>
    <div class="choiseSertification-wrapper">
      <div class="frontend item">
        <span>Frontend Developer</span>
        <img src="../assets/front-end-developers-openings-1.gif" alt="image" />
        <button @click="startTest('frontend')">
          Start Test <i class="fas fa-play"></i>
        </button>
      </div>
      <div class="backend item">
        <span>Backend Developer</span>
        <img src="../assets/expert-developers.gif" alt="image" />
        <button @click="startTest('backend')">
          Start Test <i class="fas fa-play"></i>
        </button>
      </div>
      <div class="asociate item">
        <span>Project managers</span>
        <img src="../assets/giphyp.gif" alt="image" />
        <button @click="startTest('solution')">
          Start Test <i class="fas fa-play"></i>
        </button>
      </div>
    </div>
    <Rating />
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import store from "../store";
import Loader from "../components/Loader.vue";
import { setTimeout } from "timers";
import Rating from "../components/Rating.vue";

export default {
  name: "ChoiseSertification",
  components: {
    Navigation,
    Loader,
    Rating
  },
  data: function() {
    return {
      ifSortQuestions: true,
      ifSortOptions: true,
      isVisible: false
    };
  },
  methods: {
    startTest: function(route) {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
        this.$store.dispatch("CHOISE_TEST", route).then(() => {
          this.$router.push("/test/" + route);
        });
      }, 500);
    },
    changeConditionOptions: function() {
      this.$store.dispatch("SORT_OPTIONS");
    },
    changeConditionQuestions: function() {
      this.$store.dispatch("SORT_QUESTIONS");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.choiseSertification {
  background: url("../assets/case-study-2.png") no-repeat;
  background-position: 0% 10%;
  background-size: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.test-options {
  background: #00bd85;
  margin: 0 auto 20px;
  width: 50%;
  height: 35px;
  border-bottom-right-radius: 120px;
  border-bottom-left-radius: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .input-group {
    font-family: "Share Tech Mono", monospace;
    border-bottom: 4px solid red;
    font-size: 17px;
    letter-spacing: -1px;
  }
}

.choiseSertification-wrapper {
  display: flex;
  height: 88vh;
  justify-content: center;
  align-items: flex-start;

  .item {
    position: relative;
    padding: 20px 0;
    flex-basis: 20%;
    margin: 20px;
    transition: 0.5s cubic-bezier(0.25, 0.45, 0.52, 0.95);
    height: 280px;
    border: 4px solid #20a8fa;
    background: rgba(255, 255, 255, 0.8);
    font-family: "Share Tech Mono", monospace;
    font-size: 30px;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 6px 0px,
      rgba(0, 0, 0, 0.2) 0px 2px 32px 0px;

    &:hover {
      box-shadow: 1px 4px 10px 2px grey;
      background: rgba(255, 255, 255, 1);
      border: 4px solid #00bd85;
    }

    img {
      width: 100%;
    }

    button {
      width: 70%;
      height: 40px;
      border: none;
      cursor: pointer;
      background: #d9d9d9;
      border-right: 7px solid #fdc730;
      border-bottom: 1px solid #fdc730;
      font-weight: 700;
      font-size: 14px;
      font-family: "Share Tech Mono", monospace;
      transition: 0.5s cubic-bezier(0.25, 0.45, 0.52, 0.95);
      position: absolute;
      bottom: 30px;
      left: 15%;

      &:hover {
        border-bottom: 15px solid #20a8f9;
        border-right: 15px solid #fdc730;
        height: 50px;
      }
    }
  }
}
</style>
