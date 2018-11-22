<template>
    <div class="">
    	<div class="container pad-4-v">
    		<div class="col-12" v-if="content.primary.section_title[0]">
    			<h3>{{ content.primary.section_title[0].text }}</h3>
	    	</div>
	    	<div class="container -nowrap">
                <div class ="col" v-if="content.primary.rich_text[0]">
                    <p>{{ content.primary.rich_text[0].text }}</p>
                </div>
	    		<div class="col" v-for="item in content.items">
	    			<prismic-rich-text :field="item.column_body" />
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
