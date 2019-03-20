<template>
    <div class="section-wrapper" v-infocus="'fade-up'">
    	<div class="container pillar-wrapper">

            <!-- Pillar Large Heading -->
    		<div
                :class="[content.primary.full_width === 'Full Width' ? 'col-12' : 'col-4', 'col-tablet-12']"
                v-if="content.primary.section_title[0]"
            >
    			<h3>{{ content.primary.section_title[0].text }}</h3>
	    	</div>

            <!-- Pillar Body -->
	    	<div :class="[content.primary.full_width === 'Full Width' ? 'col-12' : 'col-8', 'container', 'col-tablet-12']">
                <div class ="col-12" v-if="content.primary.rich_text">
                    <p v-for="(richtext, index) in content.primary.rich_text" :key="index">{{ richtext.text }}</p>
                </div>
	    		<div
                    :class="['pillar-rich-text', content.primary.full_width === 'Full Width' && content.items.length === 4 ? 'col-3 four-up' : content.items.length === 3 ? 'col-4' : 'col-6 two-up', 'pad-8-top', 'col-tablet-12']"
                    v-for="(item, index) in content.items"
                    :key="index"
                >

                    <!-- Loop through column body -->
                    <template v-for="(richtext, index) in item.column_body">

                        <!-- Portrait Hover Image-->
                        <img v-if="richtext.type === 'image' && isHoverImage(richtext)" :src="richtext.url" class="pillar-image image-off" :key="index" />

                        <!-- Image-->
                        <img v-else-if="richtext.type === 'image'" :src="richtext.url" class="pillar-image image-on" :key="index" />

                        <!-- Link -->
                        <!-- Specificity needed to detect if link should look like a CTA -->
                        <template
                            v-else-if="
                                richtext.spans &&
                                richtext.spans[0] &&
                                richtext.spans[0].type === 'hyperlink'&&
                                richtext.spans[0].start === 0
                            ">
                            <div v-if="richtext.spans[0].type === 'hyperlink' " :key="index" class=" column-cta cta-wrapper">
                                <prismic-link class="cta" :field="richtext.spans[0].data">{{ richtext.text }}</prismic-link>
                            </div>
                        </template>
<!-- 
                        Since we are destructuring the rich-text, we need a way
                        to show inline tags like bold, italic, etc.
                        The logic here is to detect if there are rich text spans,
                        and if there are, use the prismic-rich-text tag to handle parsing
                        the rich text.
                        
                        And this actually works, however one of the cases it doesn't is when
                        there is an ordered list because it doesn't know what order context the
                        item is in.
                         -->
                        <!-- <template v-else-if="richtext.spans && richtext.spans[0]">
                            <prismic-rich-text class="section-description" :field="[richtext]" :key="index" />
                        </template> -->

                        <!-- Heading -->
                        <h4 v-else-if="richtext.type === 'heading3'" :key="index" class="column-heading">
                            <span v-html="htmlForRichText(richtext)"/>
                        </h4>

                        <!-- List Item -->
                        <div v-else-if="richtext.type === 'list-item' || richtext.type === 'paragraph'" :key="index" class="column-body">
                            <span v-html="htmlForRichText(richtext)"/>
                        </div>

                        <!-- Ordered List Item -->
                        <ul v-else-if="richtext.type === 'o-list-item'" :key="index" class="column-body">
                            <li>{{index}}. <span v-html="htmlForRichText(richtext)"/></li>
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

	"mounted": function(){},

	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : {
        isHoverImage: function (item) {
            return item.url && item.url.indexOf('-hover') !== -1;
        },
        htmlForRichText( richText ) {
            // If no spans, then just return plain text
            if( richText.spans.length == 0 ) return richText.text;
            // Reduce to an array of HTML'd spans and non-spans
            let html = richText.spans.reduce( (sum, span, i ) => {
                // Create the HTML node from the span
                sum.push( `<${span.type}>${richText.text.substring( span.start, span.end )}</${span.type}>` );
                // Add the next non-span. It'll either be text until the next span or if last span then til the end of entire string
                let nextEnd = ( i < richText.spans.length - 1 ) ? richText.spans[i+1].start : richText.text.length;
                sum.push( richText.text.substring( span.end, nextEnd ) );
                // Return newly appended array
                return sum;
            }, [] );
            // Join HTML'd spans and non-spans together as one HTML string 
            return html.join("");
        },
    },
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

    @media (max-width: $bp-size-md) {
        margin-bottom: 20px;
	}
}

.pillar-image {
    max-height: 200px;
    margin-bottom: 36px;

    @media (max-width: $bp-size-md) {
        max-height: 200px;
        margin: 0px auto 36px;
        display: block;
	}
}

.pillar-rich-text .image-off, .pillar-rich-text:hover .image-off + .image-on {
  display: none;
}

.pillar-rich-text .image-on, .pillar-rich-text:hover .image-off {
  display: block;
}

.two-up {
    margin-bottom: 15px;
    padding: 0 5% 0 0;
}

.four-up {
    padding: 0 2% 0 0;

    @media (max-width: $bp-size-lg) {
        width: 50%;
        padding: 0 2% 5% 0;
    }

    @media (max-width: $bp-size-md) {
        width: 100%;
        margin-bottom: 35px;
    }

}

.column-cta {
    margin-top: 50px;
}

</style>