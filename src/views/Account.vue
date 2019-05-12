<template>
  <div class="account">
    <div class="wrapper">
      <Navigation/>
      <h1>This page is under construction.</h1>
	  	<div class="info-wrapper">
		  	<span>Contacts:</span> <br/>
			<span><i class="fab fa-skype"></i> jamessvanilla</span><br/>
			<span><a href="https://github.com/FrankieSR/test_app"><i class="fab fa-github-square"></i> CODE</a> - Here is the project code, I will be glad if you offer something of your own or fix something already existing</span>
		</div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  name: "Account",
  components: {
    Navigation
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.account {
  background: url("../assets/banner-1.png") no-repeat;
  background-position: 50% 0%;
  background-size: content;
  height: 94vh;
  font-size: 30px;
  color: red;

h1 {
	font-family: "Share Tech Mono", monospace;
}

  .info-wrapper {
	  width: 70%;
	  margin: 20px auto;
	  text-align: left;
	  color: black;
	  background: rgba(41, 198, 154, 0.4);
	  padding: 20px;
	  border-top: 12px solid #00A9FF;
	  border-bottom: 12px solid #fff;
	  border-right: 12px solid #FFC600;
  }

  span {
	  margin-bottom: 10px;
	  line-height: 22px;
	  display: block;
  }
}
</style>
