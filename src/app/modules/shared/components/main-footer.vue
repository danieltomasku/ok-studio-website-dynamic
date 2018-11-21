<template>
    <div class="wrapper pad-4-v">
    	<div class="container" v-if="content">
    		<div class="col-4">
    			&copy; {{ currentYear }} OK Studio
    		</div>
    		<div class="col-4">
    			<div class="">
    				<a :href=" 'mailto:' + content.contact_email ">{{ content.contact_email }}</a>
    			</div>
    			<div class="">T {{ content.contact_phone }}</div>
    		</div>
    		<div class="col-4">
    			<div class="" v-for="item in content.social_links" :key="item.label">
    				<a target="_blank" :href="item.link.url">{{ item.label }}</a>
    			</div>
    			<div class="pad-2-top">
    				<input :placeholder="content.subscribe_text" />
    			</div>
    		</div>
    	</div>
	</div>
</template>

***********************************************************

<script>

export default
{
	"components": {},

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

	"methods" : {},

	// 
	"computed" : 
	{
		content () { return this.$store.state.footer; },
		currentYear() { return new Date().getFullYear(); }
	},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

.wrapper
{
	background: black;
	color: white; 

	a 
	{ 
		color: white; 
		text-decoration: underline;
	}
}


</style>