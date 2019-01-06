<template>
    <div
        class="dark-theme"
        v-if="content"
        :style="{background: `linear-gradient( to bottom, ${content.bg_gradient_start}, ${content.bg_gradient_finish})`}"
    >

        <!-- Hero Section -->
        <div class="hero-wrapper">
            <!-- Hero Title -->
            <div class="hero-title">
                {{ content.hero_text[0].text }}
            </div>
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
        this.$store.commit("updatePageTitle", "Workshops");
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
            this.$prismic.client.getSingle( 'workshops' )
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




</style>
