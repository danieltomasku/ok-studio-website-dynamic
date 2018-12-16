<template>
    <div class="">
        <main-header></main-header>

        <div
            v-if="content"
            :style="{ backgroundColor: content.project_color }"
        >

            <div class="container">
                <prismic-image :field="content.hero_image" class="project-hero" />
            </div>

            <component
                v-for="(item, index) in content.body"
                :is="componentTypeForContent( item )"
                :content="item"
                :theme="content.theme_type"
                :key="index">
            </component>

            <div class="container">
                <div class="col-12 h-text-right">
                    <h6>Next Project</h6>
                    <router-link :to=" '/project/' + content.next_project.uid ">{{ content.next_project.data.project_title[0].text }}</router-link>
                </div>
            </div>

        </div>

        <main-footer></main-footer>
    </div>
</template>

***********************************************************

<script>

export default
{
    "components":
    {
        "main-header"   : require("@modules/shared/components/main-header.vue").default,
        "main-footer"   : require("@modules/shared/components/main-footer.vue").default,

        "column"        : require("@modules/shared/components/column.vue").default,
        "two-col-text"  : require("./components/two_col_text.vue").default,
        "two-col-two-row-text" : require("./components/two_col_two_row_text.vue").default,
        "video-player"  : require("./components/video.vue").default,
        "big-image"     : require("./components/big_image.vue").default,
        "carousel"     : require("./components/carousel.vue").default,
    },

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    data ()
    {
        return { "content" : null };
    },
    "props" : ["id"],
    "watch" :
    {
        // Watch for changes on ID prop
        id ( value)
        {
            // Reload content
            this.getContent();
        },
    },

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "created": function()
    {

    },

    "mounted": function()
    {
        // Load content from prismic
        this.getContent();
    },

    "destroyed": function(){},

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "methods" :
    {
        getContent ()
        {
            // Get article
            this.$prismic.client.getByUID('project', this.$props.id, { 'fetchLinks': ['project.project_title', 'project.carousel_image'] } )
            // Handle article
            .then( (response, error) =>
            {
                // Print if error
                if( error ) console.error(  error );
                // Assign articles
                this.content = response.data;
            });
        },

        // Returns the correct component for a slice type
        componentTypeForContent( item )
        {
            // console.log( item.slice_type, item );

            if      ( item.slice_type == "column_component" )       return "column";
            else if ( item.slice_type == "two_column_text" )        return "two-col-text";
            else if ( item.slice_type == "two_column_two_row" )     return "two-col-two-row-text";
            else if ( item.slice_type == "video" )                  return "video-player";
            else if ( item.slice_type == "big_image" )              return "big-image";
            else if ( item.slice_type == "carousel" )               return "carousel";
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

.project-hero {
    object-fit: cover;
    height: 100vh;
    width: 100%;
}



</style>
