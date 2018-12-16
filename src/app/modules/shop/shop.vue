<template>
    <div class="">

        <div class="pad-5-v" v-if="content">
            <div class="container">
                <div :style="{ height: '100vh', backgroundImage: `url(${content.hero_image.url})`, backgroundSize: 'cover'}">
                    <h1 class="col-12">{{ content.hero_headline[0].text }}</h1>
                    <prismic-rich-text :field="content.hero_subhead" />
                    <a :href="content.hero_cta.url">{{ content.hero_cta_text }}</a>
                </div>

                <prismic-link :field="item.grid_link" v-for="(item,index) in content.grid_items" :key="index">
                    <img :src="item.grid_image.url" />
                    <h3>{{ item.grid_title[0].text }}</h3>
                    <span>{{ item.grid_link_text }}</span>
                </prismic-link>
            </div>
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
        this.$store.commit("updatePageTitle", "Shop");
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
            this.$prismic.client.getSingle( 'shop' )
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
