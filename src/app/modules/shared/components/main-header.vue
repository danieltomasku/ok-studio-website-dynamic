<template>
    <div class="container">
    	<div class="col-6">
	    	<router-link to="/">OK</router-link>
	    </div>
	    <div class="col-6 h-text-right">
	    	<a @click="onMenuClick($event)">Menu</a>
	    </div>
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
			this.$refs.menu.show();
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

.template
{}


</style>