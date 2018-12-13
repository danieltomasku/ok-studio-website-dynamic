<template>
    <div class="">
        
        <div>
            <!-- Landing Slider -->

            <section class="landing-slide">
                <ul class="slides" v-if="content">
                    <router-link
                        v-for="item in content.carousel_items"
                        :key="item.uid"
                        :to=" '/project/' + item.home_carousel_item.uid "
                    >
                        <li
                            class="landing-project"
                            :style="{ backgroundImage: `url(${item.home_carousel_item.data.carousel_image.url})` }"
                        >
                        </li>
                    </router-link>
                </ul>

                <!-- Hover Area for Mouse Slider Navigation -->
                <!-- <ul class="slides-control">
                    <li class="slide-backward"></li>
                    <li class="slide-forward"></li>
                </ul>

                <ul class="slide-dots">
                </ul> -->
            </section>

            <!-- Home Intro -->
            <section class="page-content">
                <div class="page-intro">
                    <h1 class="col-12 h-text-center">
                        OK Studio is a no bullshit, independent creative practice based in Portland, Oregon.
                    </h1>
                    <div class="col-12 h-text-center pad-2-top" v-if="content">
                        <a :href=" 'mailto:' + content.contact_email ">{{ content.contact_text }}</a>
                    </div>
                </div>
            </section>
        </div>

    </div>
</template>

***********************************************************

<script>

export default
{
    "components": {},

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

    "mounted": function() {},

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
.slides {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
}

.landing-slide {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}

.landing-project {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
//   opacity: 0;
  z-index: 1;
  transition: opacity 1s;
  background-size: cover;
  background-position: center center;
}

.page-content {
    margin-top: 100vh;
    background-color: white;
    overflow: auto;
    position: relative;
    z-index: 2;
}

.page-intro {
    width: 70%;
    max-width: 1400px;
    text-align: center;
    margin: 60px auto;

    h1 {
        font-family: $font-family-base;
        font-weight: 300;
        font-size: 4.6vw;
        line-height: 1.4;
    }
}

</style>
