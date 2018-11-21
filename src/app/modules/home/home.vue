<template>
    <div class="">
        <main-header></main-header>

        <div class="container pad-5-v">
            <div class="col-4 pad-1-bottom" v-if="content">
                <router-link    v-for="item in content.carousel_items" :key="item.uid"
                                :to=" '/project/'+item.home_carousel_item.uid " 
                                class="pad-1-top"
                                >
                    {{ $prismic.richTextAsPlain(item.home_carousel_item.data.project_title) }}
                    <prismic-image :field="item.home_carousel_item.data.carousel_image" />
                </router-link>
            </div>
            <h1 class="col-12 h-text-center pad-12-h pad-5-v">
                OK Studio is a no  bullshit, independent creative  practice based in Portland,  Oregon.
            </h1>
            <div class="col-12 h-text-center pad-2-top" v-if="content">
                <a :href=" 'mailto:' + content.contact_email ">{{ content.contact_text }}</a>
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
    },

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    data ()
    {
        return { 
            "content" : null,
        };
    },
    "props" : [""],
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
            // Get content from prismic API
            this.$prismic.client.getSingle( 'homepage', { 'fetchLinks': ['project.project_title', 'project.carousel_image'] } )
            // Handle response
            .then( (response, error) => 
            {
                // Print if error
                if( error ) console.error( error );
                // Assign content
                this.content = response.data;
            });


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