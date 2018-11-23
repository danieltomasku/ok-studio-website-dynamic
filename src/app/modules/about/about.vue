<template>
    <div class="">
        <main-header></main-header>

        <div class="pad-5-v" v-if="content">
            <div class="container">
                <h1 class="col-12">{{ content.hero_text[0].text }}</h1>
                <div class="col-12" v-for="item in content.contact_info">
                    <strong v-if="item.type == 'heading2'">
                        {{ item.text }}
                    </strong>
                    <span v-if="item.type == 'paragraph'">
                        {{ item.text }}
                    </span>
                </div>

                <component  class="margin-4-v"
                            v-for="(item, index) in content.body"
                            :is="componentTypeForContent( item )"
                            :content="item"
                            :key="index">
                </component>

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

    "mounted": function(){},

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
                console.log(response)
                if( error ) console.error( error );
                // Assign content
                this.content = response.data;
            });
        },

        // Returns the correct component for a slice type
        componentTypeForContent( item )
        {
            console.log( item );

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
