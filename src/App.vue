<template>
  <router-view/>
</template>

<script>
export default {
	name: 'App',
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}

body {
	background: #161616;
	color: #fff;
	margin: 0;
	padding: 0;
}

#app {
	font-family: Now, Now Alt, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	padding: 1rem;
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	line-height: 1.4;
	min-height: 100vh;
}

.navigation {
	display: flex;
	align-items: center;
}

.navigation > *{
	margin-right: 1rem;
	margin-top: 0;
}

a {
	color: #e4e4e4;
}

button {
	-webkit-style: none;
	-moz-style: none;
	background: #e4e4e4;
	color: #444;
	padding: .5rem 1rem;
	margin-top: 0.5rem;
	border-radius: .5rem;
	border: 0;
	&:hover {
		background: #ccc;
	}
	&:active {
		background: #888;
		box-shadow: 0px .25rem #666 inset;
	}
}

hr {
	opacity: 0.25;
	display: block;
	margin: 1rem 0;
}
</style>
