<template>
    <div v-if="content" :style="{background: `linear-gradient( to bottom, ${content.bg_gradient_start}, ${content.bg_gradient_finish})`}">
        <main-header></main-header>

        <div class="about-hero">
            <div class="hero-title">
                {{ content.hero_text[0].text }}
            </div>
            <div class="about-contact roles">
                <div
                    class="role"
                    v-for="(item, index) in content.contact_info"
                    :key="index + '-contact'"
                >
                    <div class="role-title" v-if="item.type == 'heading2'">
                        {{ item.text }}
                    </div>
                    <div class="role-item" v-if="item.type == 'paragraph'">
                        {{ item.text }}
                    </div>
                </div>
            </div>
            <!-- <img class="about-shape" src="images/about-shape.png"/> -->
        </div>

        <div class="pad-5-v" v-if="content">
            <component  class="margin-4-v"
                        v-for="(item, index) in content.body"
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

header {
    mix-blend-mode: unset;
}

.menu-button {
    mix-blend-mode: unset;
}

.about-hero {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
    background-color: transparent;
    padding: 30vh 100px 0;
}

.hero-title {
    font-size: 5.2vw;
    font-family: $font-family-base;
    font-weight: 900;
    color: white;
    position: relative;
    padding: 0 17% 55px 0;
}

</style>
