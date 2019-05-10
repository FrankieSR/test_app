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
	position: absolute;
	width: 100%;
	height: 100%;
}
.lds-dual-ring {
	position: absolute;
	top: 40%;
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
  border-color: rgb(219, 11, 11) transparent rgb(223, 18, 18) transparent;
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
