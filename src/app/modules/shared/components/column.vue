<template>
    <div
        :class="[theme === 'Dark' ? 'dark-theme' : 'light-theme', 'section-wrapper']"
    >
    	<div class="container pad-4-v">
    		<div class="col-12" v-if="content.primary.title[0]">
    			<h3 class="section-title">{{ content.primary.title[0].text }}</h3>
	    	</div>
	    	<div class="container -nowrap">
	    		<div
                    class="col"
                    v-for="(item, index) in content.items"
                    :key="index"
                >
	    			<!-- <prismic-rich-text :field="item.column_body" /> -->
                    <template v-for="(richtext, index) in item.column_body">
                        <h4 v-if="richtext.type === 'heading3'" :key="index" class="role-title">
                            {{ richtext.text }}
                        </h4>
                        <div v-if="richtext.type === 'list-item'" :key="index" class="role-item">
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

</style>
