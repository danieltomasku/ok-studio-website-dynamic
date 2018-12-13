<template>
    <div class="">
    	<main-header></main-header>
    	<router-view></router-view>
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
	// 	...
	///////////////////////////////////////////////////////

	"metaInfo" () 
	{
		return { 
			"title" 		: this.head.title,
			"titleTemplate" : this.head.titleTemplate,
			"meta" 			: this.head.meta,
			"link" 			: this.head.link,
		}
	},

	data ()
	{
		return {
			"head" :
			{
				"title" : "",
				"titleTemplate" : "",
				"titleDefault" : "",
				"meta" : 
				[
					{ "property" : "og:type", 	"content" : "website" },
					{ "property" : "og:locale", "content" : "en_US" },
				],
				"link" : [],
			}
		}
	},
	
	"props" : [""],

	"watch" : 
	{
		pageTitle ( value )
		{
			// Assign if new value is not null.. if it is null, then use the default
			this.head.title = (value && value.length > 0) ? value : this.head.titleDefault;
		}
	},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function()
	{
		// Load content from prismic
        this.getMeta();
	},

	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		getMeta ()
        {
            // Get content from prismic API
            this.$prismic.client.getSingle( 'meta' )
            // Handle response
            .then( (response, error) =>
            {
                // Print if error
                if( error ) console.error( error );
                // Assign meta
                this.assignMetaInfo( response.data );
            });
        },

        assignMetaInfo ( prismicMetaObject )
        {
        	// See https://github.com/declandewet/vue-meta#how-do-i-populate-metainfo-from-the-result-of-an-asynchronous-action 

        	// Assign title
        	this.head.titleTemplate = `${prismicMetaObject.title} ${prismicMetaObject.title_separator} %s`;
        	// Store the home's title as the default title
        	this.head.titleDefault = prismicMetaObject.title_home;
        	// If a pageTitle hasn't been assigned yet, use the default
        	if( !this.head.title ) this.head.title = prismicMetaObject.title_home;

        	// Assign meta tags
        	this.head.meta.push( { "property" : "og:title", 		"content" : prismicMetaObject.title } );
        	this.head.meta.push( { "property" : "og:site_name", 	"content" : prismicMetaObject.site_name } );
        	this.head.meta.push( { "property" : "description", 		"content" : prismicMetaObject.description } );
        	this.head.meta.push( { "property" : "og:description",	"content" : prismicMetaObject.description } );
        	this.head.meta.push( { "property" : "og:url",			"content" : prismicMetaObject.url } );
        	this.head.meta.push( { "property" : "og:url",			"content" : prismicMetaObject.url } );
        	this.head.meta.push( { "property" : "og:image",			"content" : prismicMetaObject.image.url } );

        	// Assign favicon
        	this.head.link.push( { "rel": 'icon', 					"href" : prismicMetaObject.favicon.url, "type" : "image/png" } );
        	this.head.link.push( { "rel": 'shortcut icon', 			"href" : prismicMetaObject.favicon.url, "type" : "image/png" } );
        },
	},

	"computed" : 
	{
		pageTitle() { return this.$store.state.pageTitle },
	},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

.template
{}


</style>