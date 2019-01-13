<template>
    <div class="dark-theme" v-if="content">

            <!-- Shop Hero -->
            <div class="shop-hero" :style="{ backgroundImage: `url(${content.hero_image.url})` }">
                <div class="shop-hero-text-wrapper">
                    <h1 class="shop-title">{{ content.hero_headline[0].text }}</h1>
                    <prismic-rich-text class="shop-description" :field="content.hero_subhead" />
                    <div class="cta-wrapper">
                        <a class="cta" :href="content.hero_cta.url">{{ content.hero_cta_text }} &nbsp; ↗</a>
                    </div>
                </div>
            </div>

            <!-- Shop Grid -->
            <div class="shop-grid-wrapper container">
                <!-- Grid Item -->
                <div class="col-6" v-for="(item,index) in content.grid_items" :key="index">
                    <prismic-link :field="item.grid_link">
                        <div
                            class="shop-grid-item one"
                            :style="{ backgroundImage: `url(${item.grid_image.url})` }"
                        >
                            <div class="shop-grid-overlay">
                                <div class="shop-grid-text-wrapper">
                                    <h3>{{ item.grid_title[0].text }}</h3>
                                    <span class="shop-grid-cta">{{ item.grid_link_text }}</span>
                                </div>
                            </div>
                        </div>
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


.shop-hero {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    transition: opacity 1s;
    background-color: transparent;
    padding: 30vh 100px 0;
    background-size: cover;
    background-position: center center;
    min-height: 420px;
}

.shop-hero-text-wrapper {
    position: absolute;
    transform: translate(0, -50%);
    top: 52%;
    left: 0;
    width: 100%;
    max-width: 650px;
    padding: 0 50px 0 50px;
    text-align: left;
}

.shop-title {
    font-size: 75px;
    font-weight: 800;
    position: relative;
    padding: 0;
    margin-bottom: 10px;
}

.shop-description {
    font-size: 20px;
    line-height: 1.8;
    font-weight: 100;
    margin-bottom: 30px;
}

.shop-cta a {
    font-size: 20px;
    font-weight: 100;
    text-decoration: none;
}


.shop-grid-wrapper {
    position: relative;
    background-color: black;
}

.shop-grid-wrapper a {
    display: block;
    width: 100%;
    height: 100%;
}

.shop-grid-text-wrapper {
    position: absolute;
    display: block;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}

.shop-grid-item h3 {
    color: white;
    font-size: 60px;
    font-weight: 800;
    margin: 16px;
}

.shop-grid-cta {
    color: white;
    font-size: 20px;
    font-weight: 100;
}

.shop-grid-cta:after {
    content: '↗';
    display: inline-block;
    top: 2px;
    margin-left: 6px;
    position: relative;
}

.shop-grid-overlay {
    background-color: rgba(0, 0, 0, 0.75);
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: .7s ease;
    cursor: pointer;
}

.shop-grid-item:hover .shop-grid-overlay {
    opacity: 1;
}

.shop-grid-item {
    width: 100%;
    background-size: cover;
    background-position: center center;
    text-align: center;
    position: relative;
}

.shop-grid-item.one {
    height: 60vh;
    min-height: 360px;
}


</style>
