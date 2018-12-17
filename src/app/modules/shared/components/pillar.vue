<template>
    <div class="section-wrapper">
    	<div class="container -fluid pillar-wrapper -new-line-heading">
    		<div
                :class="[content.primary.full_width === 'Full Width' ? 'col-12 pad-8-bottom' : 'col-4']"
                v-if="content.primary.section_title[0]"
            >
    			<h3>{{ content.primary.section_title[0].text }}</h3>
	    	</div>
	    	<div :class="[content.primary.full_width === 'Full Width' ? 'col-12' : 'col-8', 'container']">
                <div class ="col-12 pad-8-bottom" v-if="content.primary.rich_text[0]">
                    <p>{{ content.primary.rich_text[0].text }}</p>
                </div>
	    		<div
                    :class="[content.primary.full_width === 'Full Width' && content.items.length === 4 ? 'col-3 four-up' : content.items.length === 3 ? 'col-4' : 'col-6 two-up']"
                    v-for="(item, index) in content.items"
                    :key="index"
                >
                    <template v-for="(richtext, index) in item.column_body">
                        <img v-if="richtext.type === 'image'" :src="richtext.url" class="pillar-image" :key="index" />
                        <h4 v-if="richtext.type === 'heading3'" :key="index" class="role-title">
                            {{ richtext.text }}
                        </h4>
                        <div v-if="richtext.type === 'list-item' || richtext.type === 'paragraph'" :key="index" class="role-item">
                            {{ richtext.text }}
                        </div>
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

.pillar-wrapper {
    display: flex;
    color: white;
}

.pillar-wrapper.-new-line-heading {
    flex-wrap: wrap;
}

.pillar-wrapper p {
    font-weight: 100;
    font-size: 20px;
    line-height: 1.7;
    margin: 12px 0;
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

// .pillar-wrapper h4 {
//     font-size: 55px;
//     font-weight: normal;
//     margin: 12px 0;
//     color: white;
// }

.role-title {
    font-weight: 600;
    margin-bottom: 12px;
    font-size: 18px;
}

.role-item {
    font-size: 18px;
    font-weight: 100;
    margin-bottom: 1px;
    line-height: 1.7;
    letter-spacing: .5px;
}
.pillar-image {
    max-height: 200px;
    margin-bottom: 36px;
}

.pillar-left {
  width: 33.333%;
}

.pillar-right {
  width: 66.666%;
}

.two-up {
    margin-bottom: 15px;
    padding: 0 5% 0 0;
}

.four-up {
    padding: 0 2% 0 0;
}


</style>
