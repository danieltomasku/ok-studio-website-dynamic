<template>
    <div class="dark-theme" v-if="content" :style="{background: `linear-gradient( to bottom, ${content.bg_gradient_start}, ${content.bg_gradient_finish})`}">
        <div class="hero-wrapper">

            <!-- Hero Title -->
            <div class="hero-title">
                {{ content.hero_text[0].text }}
            </div>

            <!-- Contact Information -->
            <div class="about-contact-wrapper container">
                <div class="col-4">
                    <template v-for="(item, index) in content.contact_info">
                        <div class="column-heading" v-if="item.type == 'heading2'" :key="index">
                            {{ item.text }}
                        </div>
                        <div class="column-body" v-if="item.type == 'paragraph'" :key="index">
                            {{ item.text }}
                        </div>
                    </template>
                </div>
            </div>
            <img class="about-shape" :src="content.background_shape.url" />
        </div>

        <!-- Slice Zone -->
        <div class="pad-5-v" v-if="content">
            <component
                v-for="(item, index) in content.body"
                :is="componentTypeForContent( item )"
                :content="item"
                :key="index">
            </component>
        </div>

    </div>
</template>

***********************************************************

<script>

export default
{
    "components":
    {
        "column"       : require("@modules/shared/components/column.vue").default,
        "pillar"       : require("@modules/shared/components/pillar.vue").default,

    },

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    data ()
    {
        return { "content" : null };
    },
    "props" : ["id"],
    "watch" : {},

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "created": function()
    {
        // Load content from prismic
        this.getContent();
    },

    "mounted": function()
    {
        // Update page title
        this.$store.commit("updatePageTitle", "About");
    },

    "destroyed": function(){},

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "methods" :
    {
        getContent ()
        {
            // Get content from prismic API
            this.$prismic.client.getSingle( 'about' )
            // Handle response
            .then( (response, error) =>
            {
                // Print if error
                if( error ) console.error( error );
                // Assign content
                this.content = response.data;
            });
        },

        // Returns the correct component for a slice type
        componentTypeForContent( item )
        {
            if      ( item.slice_type == "column_component" )       return "column";
            else if ( item.slice_type == "pillar_component" )        return "pillar";
            else if ( item.slice_type == "two_column_two_row" )   return "two-col-two-row-text";
        },
    },
    "computed" : {},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////


.about-contact-wrapper {
    padding-top: 12px;
    position: relative;
    z-index: 1;
}

.about-contact {
    margin-bottom: 15px;
}

.about-shape {
    position: absolute;
    top: -355px;
    left: -250px;
    width: 100vw;
    z-index: 0;
}


</style>
