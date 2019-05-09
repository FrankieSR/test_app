<template>
  <div class="choiseSertification-wrapper">
    <div class="frontend item" @click="startTest('frontend')">Frontend Developer</div>
    <div class="backend item">Backend Developer</div>
    <div class="asociate item">Project managers</div>
  </div>
</template>

<script>
export default {
  name: "ChoiseSertification",
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
.choiseSertification-wrapper {
  display: flex;
  justify-content: space-between;
  min-width: 60vw;

  .item {
    min-height: 150px;
    flex-basis: 30%;
    background: #f6c2d8;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-radius: 10px;
    box-shadow: 0 3px 3px grey;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      box-shadow: 1px 4px 10px 2px grey;
      background: #fcebbf;
      color: #7babed;
    }
  }
}
</style>
