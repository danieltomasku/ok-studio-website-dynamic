<template>
    <div
        :class="[theme === 'Dark' ? 'dark-theme' : 'light-theme', 'section-wrapper']"
    >
    	<div class="container">
    		<div class="col-12" v-if="content.primary.eyebrow">
    			<h3 class="project-title">{{ content.primary.eyebrow }}</h3>
	    	</div>
	    	<div class="container -nowrap">
	    		<div class="col">
	    			<prismic-rich-text class="project-tagline" :field="content.primary.rich_text_left" />
	    		</div>
	    		<div class="col description">
	    			<prismic-rich-text class="project-description" :field="content.primary.rich_text_right" />
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

.dark-theme {
    color: white;
}

.project-title {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 21px;
    letter-spacing: .5px;
}

.project-tagline {
    font-size: 60px;
    font-weight: 300;
    padding: 0px 20px 0 0px;
}

.description {
    padding: 12px 60px 0px 60px;
}

.project-description {
    font-weight: 300;
    font-size: 20px;
    line-height: 1.7;
    letter-spacing: .5px;
}

</style>