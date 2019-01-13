<template>
    <div class="section-wrapper">
    	<div class="container pillar-wrapper">

            <!-- Pillar Large Heading -->
    		<div
                :class="[content.primary.full_width === 'Full Width' ? 'col-12 pad-8-bottom' : 'col-4']"
                v-if="content.primary.section_title[0]"
            >
    			<h3>{{ content.primary.section_title[0].text }}</h3>
	    	</div>

            <!-- Pillar Body -->
	    	<div :class="[content.primary.full_width === 'Full Width' ? 'col-12' : 'col-8', 'container']">
                <div class ="col-12" v-if="content.primary.rich_text">
                    <p v-for="(richtext, index) in content.primary.rich_text" :key="index">{{ richtext.text }}</p>
                </div>
	    		<div
                    :class="[content.primary.full_width === 'Full Width' && content.items.length === 4 ? 'col-3 four-up' : content.items.length === 3 ? 'col-4' : 'col-6 two-up', 'pad-8-top']"
                    v-for="(item, index) in content.items"
                    :key="index"
                >
                    <template v-for="(richtext, index) in item.column_body">
                        <img v-if="richtext.type === 'image'" :src="richtext.url" class="pillar-image" :key="index" />

                        <template v-else-if="richtext.spans[0]">
                            <div v-if="richtext.spans[0].data.url === 'https://workbyok.studio'" :key="index" class=" column-cta cta-wrapper">
                                <div class="cta">{{ richtext.text }}</div>
                            </div>
                        </template>

                        <h4 v-else-if="richtext.type === 'heading3'" :key="index" class="column-heading">
                            {{ richtext.text }}
                        </h4>
                        <div v-else-if="richtext.type === 'list-item' || richtext.type === 'paragraph'" :key="index" class="column-body">
                            {{ richtext.text }}
                        </div>
                        <ul v-else-if="richtext.type === 'o-list-item'" :key="index" class="column-body">
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

.pillar-wrapper {
    display: flex;
    flex-wrap: wrap;
}

.pillar-wrapper p {
    font-weight: 100;
    font-size: 20px;
    line-height: 1.7;
    margin: 12px 0;
}

.pillar-wrapper h3 {
    font-weight: 800;
    font-size: 55px;
    margin: 0;
}

.pillar-image {
    max-height: 200px;
    margin-bottom: 36px;
}

.two-up {
    margin-bottom: 15px;
    padding: 0 5% 0 0;
}

.four-up {
    padding: 0 2% 0 0;
}

.column-cta {
    margin-top: 50px;
}


</style>
