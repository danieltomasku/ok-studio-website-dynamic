<template>
    <div class="section-wrapper" v-infocus="'fade-up'">
    	<div class="container">

            <!-- Eyebrow -->
    		<div class="col-12" v-if="content.primary.eyebrow">
    			<h3 class="project-title">{{ content.primary.eyebrow }}</h3>
	    	</div>


	    	<div class="container">

                <!-- Title -->
	    		<div class="col-6 col-tablet-12">
	    			<prismic-rich-text class="project-tagline" :field="content.primary.rich_text_left" />
	    		</div>

                <!-- Description -->
	    		<div class="col-6 col-tablet-12 description">
	    			<prismic-rich-text class="section-description" :field="content.primary.rich_text_right" />
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

.project-title {
    font-size: 20px;
    font-weight: 100;
    margin-bottom: 21px;
    letter-spacing: .5px;
}

.project-tagline {
    font-size: 60px;
    font-weight: 100;
    padding: 0px 20px 0 0px;

    @media (max-width: $bp-size-md) {
		font-size: 50px;
	}
}

.description {
    padding: 12px 60px 0px 60px;

    @media (max-width: $bp-size-md) {
        margin: 21px 0 0;
		padding: 0;
	}
}

</style>