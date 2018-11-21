<template>
    <div class="">
        <main-header></main-header>

        <div class="container pad-5-v">
            <div class="col">
                <p>Loading the Prismic's Preview...</p>
            </div>
        </div>


        <main-footer></main-footer>
    </div>
</template>

***********************************************************

<script>

    
export default {
    // See: https://prismic.io/docs/vuejs/beyond-the-api/in-website-preview
    name: 'Preview',

    "components": 
    {
        "main-header"   : require("@modules/shared/components/main-header.vue").default,
        "main-footer"   : require("@modules/shared/components/main-footer.vue").default,
    },

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    beforeCreate () 
    {
        const previewToken = this.$route.query.token;

        this.$prismic.client.previewSession(previewToken, this.$prismic.linkResolver, '/')
        .then((url) => {
            window.location.replace(url);
        })
    }
};
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////




</style>