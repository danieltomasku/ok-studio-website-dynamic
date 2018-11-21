<template>
    <div class="">
    	<div class="container pad-4-v">
    		<div class="col-12">
    			<h3>{{ content.primary.title[0].text }}</h3>
	    	</div>
	    	<div class="container -nowrap">
	    		<div class="col" v-for=" item in content.items">
	    			<h5>{{item.column_title}}</h5>
	    			<prismic-rich-text :field="item.column_list" />
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