<template>
    <div class="">
    	<main-header></main-header>
    	<div ref="loading" class="loading-screen">
    		<div ref="loading_name" class="loading-project-name">{{ pageTitle }}</div>
			<svg ref="loading_logo" class="loading-image" width="80" viewBox="0 0 478 271" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M135.95 270.92c-74.41 0-135-60.54-135-135C.95 61.46 61.49.97 135.95.97c74.46 0 135 60.54 135 135 0 74.46-60.59 134.95-135 134.95zm0-238.92c-57.437614 0-104 46.562386-104 104s46.562386 104 104 104 104-46.562386 104-104c-.044102-57.4225744-46.577435-103.9648559-104-104.02V32zM365.33 135.95L475.59 270.9h-37.36l-112.3-134.95L438.23 1h39.06z"/></g></svg>
		</div>
    	<router-view ref="outlet"></router-view>
    	<main-footer></main-footer>
    	<contact-form></contact-form>
        <back-to-top v-if="$route.path !== '/'" />
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
        "contact-form"	: require("@modules/shared/components/contact-form.vue").default,
        "back-to-top"   : require("@modules/shared/components/back-to-top.vue").default,
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
			},
			"loadingInt" : null,
		}
	},
	
	"props" : [""],

	"watch" : 
	{
		pageTitle ( value )
		{
			// Assign if new value is not null.. if it is null, then use the default
			this.head.title = (value && value.length > 0) ? value : this.head.titleDefault;
		},

		'$route' (to, from) 
		{ 
			// Determine if loading home
			let isHome = to.path === "/";

			// Clear any loading timeout
			if( this.loadingInt ) window.clearTimeout( this.loadingInt );

			// Show the loading screen
			this.showLoading( isHome );
		},
	},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function()
	{
		// Load content from prismic
        this.getMeta();

        // Determine if loading home
        let isHome = this.$route.path === "/";
        // Show loading screen
        this.showLoading( isHome );
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
            this.head.meta.push( { "name"     : "description", 		"content" : prismicMetaObject.description } );
        	this.head.meta.push( { "property" : "og:title", 		"content" : prismicMetaObject.title } );
        	this.head.meta.push( { "property" : "og:site_name", 	"content" : prismicMetaObject.site_name } );
        	this.head.meta.push( { "property" : "og:description",	"content" : prismicMetaObject.description } );
        	this.head.meta.push( { "property" : "og:url",			"content" : prismicMetaObject.url } );
        	this.head.meta.push( { "property" : "og:url",			"content" : prismicMetaObject.url } );
        	this.head.meta.push( { "property" : "og:image",			"content" : prismicMetaObject.image.url } );

        	// Assign favicon
        	this.head.link.push( { "rel": 'icon', 					"href" : prismicMetaObject.favicon.url, "type" : "image/png" } );
        	this.head.link.push( { "rel": 'shortcut icon', 			"href" : prismicMetaObject.favicon.url, "type" : "image/png" } );
        },

		showLoading( isHome )
		{
			// If home, only show logo. If not, only show title
			this.$refs.loading_logo.style.display = (isHome) ? 'block' : 'none';
			this.$refs.loading_name.style.display = (isHome) ? 'none' : 'block';

			// Show the loading screen
			this.$refs.loading.classList.add("-shown");

			// Hide after delay
			this.loadingInt = window.setTimeout( this.hideLoading, 2000 );
		},

		hideLoading ()
		{
			// Hide the loading screen
			this.$refs.loading.classList.remove("-shown");
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

@keyframes colorBlend 
{
	0% 		{ background-color: #143e3b; }
	14% 	{ background-color: #d6a49a; }
	28% 	{ background-color: #dddfe2; }
	42% 	{ background-color: #282626; }
	57% 	{ background-color: #fbaf23; }
	71% 	{ background-color: #bd401b; }
	100% 	{ background-color: #143e3b; }
}

.loading-screen 
{
	visibility: hidden;
	opacity: 0;

	position: fixed;
	z-index: 200;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	animation: colorBlend 6s infinite;
	animation-direction: alternate;
	
	$time : 1.5s;
	transition: opacity $time,
				visibility $time;

	cursor: none;
	font-weight: 300;

	&.-shown
	{
		visibility: visible;
		opacity: 1;

		transition: opacity 0s, visibility 0s;
	}
}

.loading-project-name 
{
	position: absolute;
	display: block;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	font-size: 70px;
	color: white;
	width: 80vw;
	text-align: center;

	@include breakpoint( $bp-mobile )
	{
		font-size: 40px;
	}
}

.loading-screen svg 
{
	fill: #fff;
}

.loading-image 
{
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
}


</style>