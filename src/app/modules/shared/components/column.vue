<template>
    <div
        :class="[theme === 'Dark' ? 'dark-theme' : 'light-theme', 'section-wrapper']"
    >
    	<div class="container pad-4-v">
    		<div class="col-12" v-if="content.primary.title[0]">
    			<h3>{{ content.primary.title[0].text }}</h3>
	    	</div>
	    	<div class="container -nowrap">
	    		<div
                    class="col"
                    v-for="(item, index) in content.items"
                    :key="index"
                >
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
	"props" : ["content", "theme"],
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

.col {
    padding: 0 3% 0 0;
}

.dark-theme {
    color: white;
}


</style>
