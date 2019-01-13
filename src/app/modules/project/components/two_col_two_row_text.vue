<template>
    <div class="section-wrapper">
    	<div class="container">
	    		<div class="col-6 col-tablet-12 left-column">

                    <!-- Top Text -->
		    		<div class="top-row">
                        <template v-for="(richtext, index) in content.primary.rich_text_top">
                            <div v-if="richtext.type === 'heading3'" :key="index" class="section-title">
                                {{ richtext.text }}
                            </div>
                            <div v-if="richtext.type === 'paragraph'" :key="index" class="section-description">
                                {{ richtext.text }}
                            </div>
                        </template>
		    		</div>

                    <!-- Bottom Text -->
		    		<div class="">
                        <template v-for="(richtext, index) in content.primary.rich_text_bottom">
                            <div v-if="richtext.type === 'heading3'" :key="index" class="section-title">
                                {{ richtext.text }}
                            </div>
                            <div v-if="richtext.type === 'paragraph'" :key="index" class="section-description">
                                {{ richtext.text }}
                            </div>
                        </template>
		    		</div>
		    	</div>

                <!-- Rich Text -->
		    	<div class="col-6 col-tablet-12 right-column">
		    		<div class="">
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

	"mounted": function(){},

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
.container {
    @media (max-width: $bp-size-md) {
        flex-direction: column-reverse;
	}
}


.top-row {
    margin-bottom: 120px;
}

.left-column {
    padding-right: 8%;

    @media (max-width: $bp-size-md) {
        padding: 0;
	}
}

.right-column {
    padding-left: 8%;

    @media (max-width: $bp-size-md) {
        padding: 0;
        margin-bottom: 50px;
	}
}

</style>