<template>
    <div class="">
    	<div class="container pad-4-v">
    		<div class="col-12" v-if="content.primary.eyebrow">
    			<h3>{{ content.primary.eyebrow }}</h3>
	    	</div>
	    	<div class="container -nowrap">
	    		<div class="col">
	    			<prismic-rich-text :field="content.primary.rich_text_left" />
	    		</div>
	    		<div class="col">
	    			<prismic-rich-text :field="content.primary.rich_text_right" />
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
	"props" : ["content"],
	"watch" : {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function()
	{
		// console.log( this.$props.content );
	},

	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : {},
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