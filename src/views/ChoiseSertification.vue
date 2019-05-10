<template>
  <div class="choiseSertification">
    <Navigation/>
    <div class="choiseSertification-wrapper">
      <div class="frontend item">
        <span>Frontend Developer</span>
        <img src="../assets/front-end-developers-openings-1.gif" alt="image">
        <div class="questions">60 questions</div>
        <button @click="startTest('frontend')">Start Test</button>
      </div>
      <div class="backend item">
        <span>Backend Developer</span>
        <img src="../assets/expert-developers.gif" alt="image">
        <div class="questions">60 questions</div>
        <button @click="startTest('frontend')">Start Test</button>
      </div>
      <div class="asociate item">
        <span>Project managers</span>
        <img src="../assets/giphyp.gif" alt="image">
        <div class="questions">
          60 questions
        </div>
        <button @click="startTest('frontend')">Start Test</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  name: "ChoiseSertification",
  components: {
    Navigation
  },
  methods: {
    startTest: function(route) {
      this.$store.dispatch("CHOISE_TEST", route).then(() => {
        this.$router.push("/test/" + route);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.choiseSertification {
}

.choiseSertification-wrapper {
  display: flex;
  justify-content: center;
  min-height: 95.5vh;
  align-items: center;
  background: url("../assets/tile-2.png") no-repeat;
  background-position: 100% 50%;
  background-size: content;

  .item {
    position: relative;
    padding: 20px 0;
    flex-basis: 20%;
    margin: 20px;
    transition: 0.2s;
    height: 400px;
    border: 2px solid #20a8fa;
    background: rgba(255, 255, 255, 0.8);
    font-family: "Share Tech Mono", monospace;
    font-size: 30px;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 6px 0px,
      rgba(0, 0, 0, 0.2) 0px 2px 32px 0px;

    &:hover {
      box-shadow: 1px 4px 10px 2px grey;
      background: rgba(255, 255, 255, 1);
    }

    img {
      width: 100%;
    }

    .questions {
      color: #1966FF;
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 45px;
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
      font-size: 20px;
      font-family: "Share Tech Mono", monospace;
      transition: 0.3s;
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
