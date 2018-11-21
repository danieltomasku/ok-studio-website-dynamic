<template>
    <div :class="[ 'wrapper', 'pad-4', { 'hidden' : !isShown }]" :style="bgStyleObject">
    	<div class="close" @click="onCloseClick($event)">Close</div>
    	<div class="container -center-v -fluid pad-2-top" style="height:100vh">
    		<!-- Main menu -->
    		<div class="col-12 h-text-right" v-if="!isIndexShown">
	    		<div class="pad-1-v" v-for="item in links" :key="item.label">
	    			<div class="menu--link" @click="onLinkClick(item)">{{ item.label }}</div>
	    		</div>
	    	</div>
	    	<!-- Index menu -->
	    	<div class="col-12 h-text-center" v-if="isIndexShown">
	    		<div class="pad-1-v" v-for="item in indexLinks" :key="item.label">
	    			<div class="menu--link" 
	    					@click="onLinkClick(item)"
	    					@mouseover="onIndexMouseover(item)" @mouseout="onIndexMouseout(item)" 
	    					>
	    				{{ item.label }}
	    			</div>
	    		</div>
	    	</div>
    	</div>
	</div>
</template>

***********************************************************

<script>

import * as _ from "lodash";

export default
{
	"components": {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		return {
			"isShown" : false,
			"isIndexShown" : false,
			"backgroundImage" : null,
		}
	},
	"props" : [""],
	"watch" : {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function(){},
	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		///////////////////////////////////////////////////////
		// 	Methods
		///////////////////////////////////////////////////////

		// Shows the memu
		show () 
		{ 
			this.isShown = true; 
			this.isIndexShown = false; 
		},

		// Shows the memu
		hide ()
		{ 
			this.isShown = false; 
			this.isIndexShown = false; 
		},

		// Shows the index menu
		showIndex () { this.isIndexShown = true; },

		// Shows the memu
		hideIndex () { this.isIndexShown = false; },

		// 
		onIndexMouseover (item)
		{
			this.backgroundImage = item.image;
		},

		onIndexMouseout (item)
		{
			this.backgroundImage = null;
		},


		///////////////////////////////////////////////////////
		// 	Events
		///////////////////////////////////////////////////////

		// on close button click
		onCloseClick( event )
		{ 
			// 
			if( this.isIndexShown ) this.isIndexShown = false;
			else this.isShown = false; 
		},

		// on link button click
		onLinkClick( item )
		{ 
			// Handle index
			if( item.label == "Index" )
			{
				this.showIndex();
				return;
			}

			// Nav to link
			this.$router.push( item.link );

			// Hide menu
			this.hide();
		},
	},

	// 
	"computed" : 
	{
		content () { return this.$store.state.menu; },

		// Links used for the main menu
		links () 
		{
			return [
				{ "label" : "Home", 		"link" : "/" },
				{ "label" : "Index", 		"link" : null },
				{ "label" : "About", 		"link" : "/" },
				{ "label" : "Workshops",	"link" : "/" },
				{ "label" : "Shop", 		"link" : "/" },
			];
		},

		// Links used for the index
		indexLinks ()
		{
			// Bail if not loaded
			if( !this.content ) return;
			// Reformat index links from store
			return _.map( this.content.index, item => 
			{
				return { "label" : item.project.data.project_title[0].text, 
						"link" : `/project/${item.project.uid}`,
						"image" : item.project.data.hero_image.url
					};
			});
		},

		// 
		bgStyleObject () 
		{
			return {
				"background-image" : ( this.backgroundImage ) ? `url('${this.backgroundImage}')` : "none",
			}
		},
	},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

.wrapper
{
	position: fixed;
	left: 0;
	top: 0;

	width: 100vw;
	height: 100vh;

	background-color: white;
	background-size: cover;
	background-position: center;
}

.menu--link
{
	font-size: $font-size-large;

	cursor: pointer;
}

.close
{
	position: absolute;
	top: 20px;
	right: 40px;

	font-weight: normal;
	font-size: $font-size-base;
}


</style>