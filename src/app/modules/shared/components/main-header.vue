<template>
	<div class="wrapper">
		<!-- Logo -->
		<header ref="header">
			<div class="header-wrapper">
				<div class="logo">
					<router-link to="/" aria-label="OK Studio Logo">
						<svg width="50" viewBox="0 0 478 271" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M135.95 270.92c-74.41 0-135-60.54-135-135C.95 61.46 61.49.97 135.95.97c74.46 0 135 60.54 135 135 0 74.46-60.59 134.95-135 134.95zm0-238.92c-57.437614 0-104 46.562386-104 104s46.562386 104 104 104 104-46.562386 104-104c-.044102-57.4225744-46.577435-103.9648559-104-104.02V32zM365.33 135.95L475.59 270.9h-37.36l-112.3-134.95L438.23 1h39.06z"/></g></svg>
					</router-link>
				</div>
			</div>
			<div class="white-bar"></div>
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

import Headroom from "headroom.js";

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

	"mounted": function()
	{
		let headroom = new Headroom( this.$refs.header );
		headroom.init();
	},

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

$nav-animation-timing: ease-out;
$nav-animation-duration: 0.35s;

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
	

	transition-timing-function: $nav-animation-timing;
	transition-duration: $nav-animation-duration;
	transition-property: height, background;

	&.headroom--not-top
	{
		height: 50px;

		.logo 
		{
			transform: translateY(-50%);
			transition-property: transform;

			svg
			{
				transform: scale(0.7) translateX(-10px);
                fill: black;
			}
		}

		& + .menu-button
		{
			top: 14px;
			transform: scale(0.7);
		}

        & + .menu-button .menu-line.-top, + .menu-button .menu-line.-bottom
		{
			background-color: black;
		}

		.white-bar
		{
			opacity: 1;
		}

	}
}

.header-wrapper
{
	padding: 0 50px;

	@media (max-width: $bp-size-md) {
		padding: 0 25px;
	}
}

.logo 
{
	position: absolute;
	display: inline-block;
	transform: translateY(-36%);
	top: 50%;

	svg {
		fill: white;
		transition: transform $nav-animation-timing $nav-animation-duration;
	}
}

.white-bar
{
	position: absolute;
	z-index: -1;

	
	width: 100%;
	height: 100%;

	background: rgba(255,255,255,0.96);
	
	opacity: 0;
	transition: opacity $nav-animation-timing $nav-animation-duration;
}

.menu-button {

	transition: transform $nav-animation-timing $nav-animation-duration,
                top $nav-animation-timing $nav-animation-duration,
				opacity $nav-animation-timing $nav-animation-duration !important;

	padding: 0;
	position: fixed;
	top: 36px;
	right: 50px;

	font-weight: normal;
	width: 24px;
	height: 24px;
	display: inline-block;
	z-index: 199;
	background-color: transparent;
	border: none;

	transition: top 0.25s ease-out;

	@media (max-width: $bp-size-md) {
		right: 25px;
	}

}

.menu-button:hover {
	cursor: pointer;
	opacity: 0.3 !important;
}

.menu-button:focus {
	outline: none;
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

</style>