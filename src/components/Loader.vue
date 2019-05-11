<template>
  <div class="loader-wrapper">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loader-wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(59, 179, 251, .6);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 100;
}
.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
