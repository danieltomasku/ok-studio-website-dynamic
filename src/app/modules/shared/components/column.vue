<template>
    <div class="section-wrapper" v-infocus="'fade-up'">
    	<div class="container">
            <div class="col-12" v-if="content.primary.title[0]">
                <h3
                    v-if="content.primary.title[0].text"
                    class="section-title"
                >
                    {{ content.primary.title[0].text }}
                </h3>
            </div>
	    	<div class="container columns-wrapper">
	    		<div
                    class="col col-tablet-12"
                    v-for="(item, index) in content.items"
                    :key="index"
                >
                    <template v-for="(richtext, index) in item.column_body">

                        <img v-if="richtext.type === 'image'" :src="richtext.url" class="pillar-image" :key="index" />

                        <!-- Column Heading -->
                        <h4 v-if="richtext.type === 'heading3'" :key="index" class="column-heading">
                            {{ richtext.text }}
                        </h4>

                        <!-- Column Body (Paragraph) -->
                        <div v-if="richtext.type === 'list-item' || richtext.type === 'paragraph'" :key="index" class="column-body">
                            {{ richtext.text }}
                        </div>

                        <!-- Column Body (Ordered List Item) -->
                        <ul v-if="richtext.type === 'o-list-item'" :key="index" class="column-body">
                            <li>{{index}}. {{ richtext.text }}</li>
                        </ul>
                    </template>
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

.col {
    padding: 0 3% 0 0;
    margin-bottom: 15px;
    flex: 1;

    @media (max-width: $bp-size-md) {
        flex: none;
        margin-bottom: 48px;
	}
}

.pillar-image {
    max-height: 200px;
    margin-bottom: 36px;
}

</style>
