<template>
    <div class="">

        <div class="container pad-5-v">
            <div class="col">
                <p>Loading the Prismic's Preview...</p>
            </div>
        </div>

    </div>
</template>

***********************************************************

<script>

    
export default {
    // See: https://prismic.io/docs/vuejs/beyond-the-api/in-website-preview
    name: 'Preview',

    "components": {},

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