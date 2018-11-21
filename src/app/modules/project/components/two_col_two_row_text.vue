<template>
    <div class="">
    	<div class="container pad-4-v">
	    	<div class="container -nowrap">
	    		<div class="col-6">
		    		<div class="">
		    			<prismic-rich-text :field="content.primary.rich_text_top" />
		    		</div>
		    		<div class="">
		    			<prismic-rich-text :field="content.primary.rich_text_bottom" />
		    		</div>
		    	</div>
		    	<div class="col-6">
		    		<div class="">
		    			<prismic-rich-text :field="content.primary.rich_text_right" />
		    		</div>
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