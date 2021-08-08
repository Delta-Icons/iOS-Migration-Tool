<template>
  <router-view/>
</template>

<script>
export default {
	name: 'App',
}
</script>

<style>
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
	padding: 40px;
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	line-height: 1.4;
	min-height: 100vh;
}

.navigation {
	display: flex;
}

.navigation > *{
	margin-right: 1rem;
}

a {
	color: #e4e4e4;
}
</style>
