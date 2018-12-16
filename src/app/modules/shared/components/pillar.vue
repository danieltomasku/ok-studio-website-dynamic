<template>
    <div class="">
    	<div class="container -fluid pad-4-v pillar-wrapper -new-line-heading">
    		<div
                :class="[content.primary.full_width === 'Full Width' ? 'col-12' : 'col-4']"
                v-if="content.primary.section_title[0]"
            >
    			<h3>{{ content.primary.section_title[0].text }}</h3>
	    	</div>
	    	<div :class="[content.primary.full_width === 'Full Width' ? 'col-12' : 'col-8', 'container']">
                <div class ="col-12" v-if="content.primary.rich_text[0]">
                    <p>{{ content.primary.rich_text[0].text }}</p>
                </div>
	    		<div
                    :class="[content.primary.full_width === 'Full Width' && content.items.length === 4 ? 'col-3' : content.items.length === 3 ? 'col-4' : 'col-6']"
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

.pillar-wrapper {
    display: flex;
    color: white;
}

.pillar-wrapper.-new-line-heading {
    flex-wrap: wrap;
}

.pillar-wrapper p {
    margin: 12px 0;
    font-family: $font-family-base;
    font-size: 20px;
    line-height: 1.7;
}

.pillar-wrapper .roles {
    margin-top: 80px;
}

.pillar-wrapper .roles:first-child {
    margin-top: 0;
}

.pillar-wrapper h3 {
    font-family: $font-family-base;
    font-weight: 800;
    font-size: 55px;
    margin: 0;
    color: white;
}

.pillar-wrapper h4 {
    font-size: 55px;
    font-weight: normal;
    margin: 12px 0;
    color: white;
}

.pillar-left {
  width: 33.333%;
}

.pillar-right {
  width: 66.666%;
}

</style>
