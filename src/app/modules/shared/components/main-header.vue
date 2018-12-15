<template>
	<div>
		<!-- Logo -->
		<header>
			<div class="logo">
				<router-link to="/">
					<svg width="50" viewBox="0 0 478 271" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M135.95 270.92c-74.41 0-135-60.54-135-135C.95 61.46 61.49.97 135.95.97c74.46 0 135 60.54 135 135 0 74.46-60.59 134.95-135 134.95zm0-238.92c-57.437614 0-104 46.562386-104 104s46.562386 104 104 104 104-46.562386 104-104c-.044102-57.4225744-46.577435-103.9648559-104-104.02V32zM365.33 135.95L475.59 270.9h-37.36l-112.3-134.95L438.23 1h39.06z"/></g></svg>
				</router-link>
			</div>
		</header>

		<!-- Menu Button -->
		<button class="menu-button menu-line-wrapper" @click="onMenuClick($event)" aria-label="Open and close navigation menu">
			<span class="menu-line -top"></span>
			<span class="menu-line -bottom"></span>
		</button>

		<!-- Menu Overlay -->
		<main-menu ref="menu"></main-menu>
	</div>
</template>

***********************************************************

<script>

export default
{
	"components": 
	{
		"main-menu"   : require("@modules/shared/components/main-menu.vue").default,
	},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		return {}
	},
	"props" : [""],
	"watch" : {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function(){},
	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		onMenuClick ( event )
		{
			this.$refs.menu.toggleNav();

		}
	},
	// 
	"computed" : {},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

header {
	font-family: $font-family-base;
	font-weight: bold;
	font-size: 16px;
	background-color: transparent;
	height: 90px;
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 101;
	padding: 0 50px;
	mix-blend-mode: difference;

	@media (max-width: $bp-size-md) {
		padding: 0 25px;
	}
}

.logo {
	position: absolute;
	display: inline-block;
	transform: translateY(-36%);
	top: 50%;

	svg {
		fill: white;
	}
}

.menu-button:hover {
	cursor: pointer;
}

.menu-button:focus {
	outline: none;
}

.menu-line-wrapper {
	height: 50px;
	width: 50px;
	padding: 0;
	position: absolute;
	top: 50%;
	right: -13px;
	transform: translate(-50px, -50%);
}


.menu-line-inner-wrapper {
	width: 24px;
	height: 24px;
}

.menu-line {
	backface-visibility: hidden;
	width: 100%;
	height: 2px;
	position: absolute;
	left: 0;
	top: 9px;
	transform-origin: center center;
	transition: transform .4s, background .4s;
	pointer-events: none;
}

.-top {
	background-color: white;
	transform: translateY(-4.5px);
}

.-bottom {
	background-color: white;
	transform: translateY(4.5px);
}

.-active .-top {
	background-color: black;
	transform: rotate(45deg);
}

.-active .-bottom {
	background-color: black;
	transform: rotate(-45deg);
}

.menu-button.-active {
	mix-blend-mode: unset;
}

.menu-button {
	font-weight: normal;
	width: 24px;
	height: 24px;
	position: fixed;
	right: 50px;
	top: 35px;
	display: inline-block;
	z-index: 199;
	transform: none;
	background-color: transparent;
	border: none;
	mix-blend-mode: difference;

	@media (max-width: $bp-size-md) {
		right: 25px;
	}
}

</style>