<template>
	<div>
    	<div>
				<div class="loader"></div>
        </div>
    </div>

</template>

<script>
export default {
	name: 'Loader'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loader {
	width: 100vw;
	height: 100vh;
	background: rgba(200, 200, 200, 0.7);
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: red;
}
</style>
