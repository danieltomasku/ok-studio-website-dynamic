<template>
    <div class="">
        <main-header></main-header>

        <div class="pad-5-v" v-if="content">


            <div class="container">
                <!-- <h1 class="col-12">{{ content.data.title }}</h1> -->
                <div class="col-12">
                    <prismic-rich-text :field="content.data.project_title" class="col-12" />
                    <prismic-image :field="content.data.hero_image" class="" />
                </div>
            </div>

            <component  class="margin-4-v"
                        v-for="(item, index) in content.data.body"
                        :is="componentTypeForContent( item )" 
                        :content="item" 
                        :key="index">
                        </component>


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

        "column"       : require("./components/column.vue").default,
        "two-col-text" : require("./components/two_col_text.vue").default,
        "two-col-two-row-text" : require("./components/two_col_two_row_text.vue").default,
        
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
    {},

    "destroyed": function(){},

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "methods" : 
    {
        getContent ()
        {
            // Get article
            this.$prismic.client.getByUID('project', this.$props.id )
            // Handle article
            .then( (response, error) => 
            {
                // Print if error
                if( error ) console.error(  error );
                // Assign articles
                this.content = response;
                // console.log( this.content );
            });
        }, 

        // Returns the correct component for a slice type
        componentTypeForContent( item )
        { 
            console.log( item );

            if      ( item.slice_type == "column_component" )       return "column";
            else if ( item.slice_type == "two_column_text" )        return "two-col-text";
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

#demo_grid .container
{
    border: 1px solid rgba( 0,0,0, 0.25 );

    & > div
    {
        background: rgba( 255, 255, 100, 0.25 );
        border: 1px solid rgba( 0,0,0, 0.25 );   
    }
}


</style>