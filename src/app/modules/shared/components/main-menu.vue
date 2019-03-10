<template>
	<div>

		<!-- Menu Overlay -->
		<section id="menu" :class="[{ '-active' : isShown }]" v-if="content">
			<div class="menu-container">
				<div
					class="menu-item"
					v-for="item in links"
					:key="item.label"
					:style="[isIndexShown && {'pointer-events': 'none'}]"
				>
					<div class="menu-item-link" href="/" @click="onLinkClick(item)">
						{{ item.label }}
					</div>
				</div>
			</div>

			<!-- Social Icons -->
			<ul class="social-icons-wrapper">
				<li
					v-for="(item, index) in content.social_links"
					:key="index"
				>
					<a :href="item.link.url" target="_blank" rel="noopener">
						<prismic-image :field="item.icon" class="social-icons-item" />
					</a>
				</li>
			</ul>
		</section>

		<!-- Index Overlay -->
		<section id="index-overlay" :class="[{ '-active' : isIndexShown }]">
			<div class="index-title-container">
				<div class="index-title-wrapper" v-for="item in indexLinks" :key="item.label">
					<h2
						class="index-title goodwell"
						@click="onLinkClick(item)"
						@mouseover="onIndexMouseover(item)"
						@mouseout="onIndexMouseout(item)"
					>
						{{ item.label }}
					</h2>
				</div>
			</div>
			<ul class="index-bg-wrapper">
				<li
					:class="['index-bg-image', {'-active': hoverIndexTitle }]"
					v-for="item in indexLinks"
					:key="item.label + '-bg-image'"
					:style="bgStyleObject"
				>
				</li>
			</ul>
		</section>
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
			"isIndexImagesPreloaded" : false,
			"backgroundImage" : null,
			"hoverIndexTitle" : false,
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

		toggleNav () {
			var menuButton = document.getElementsByClassName('menu-button')[0];

			if (this.isIndexShown) {
				this.isIndexShown = false;
			} else if (this.isShown) {
				this.isShown = false;
				menuButton.classList.remove('-active');
			} else {
				this.isShown = true;
				menuButton.classList.add('-active')
			}

			document.body.classList.contains('lock-scroll') && !this.isShown ? document.body.classList.remove('lock-scroll') : document.body.classList.add('lock-scroll');
		},

		// Shows the menu
		show ()
		{
			this.isShown = true;
			this.isIndexShown = false;
		},

		// Hides the menu
		hide ()
		{
			this.isShown = false;
			this.isIndexShown = false;
			this.backgroundImage = null;
			document.body.classList.remove('lock-scroll');
			document.getElementsByClassName('menu-button')[0].classList.remove('-active');
		},

		// Shows the index menu
		showIndex () 
		{ 
			// Preload images
			this.preloadIndexImages();

			// Show index
			this.isIndexShown = true;
		},

		// Shows index item background image on hover
		onIndexMouseover (item)
		{
			this.backgroundImage = item.image;
			this.hoverIndexTitle = true;
		},

		onIndexMouseout (item)
		{
			this.hoverIndexTitle = false;
		},

		preloadIndexImages ()
		{
			// Bail if they're already preloaded
			if( this.isIndexImagesPreloaded ) return;

			// Preload each project's background image
			let images = [];
			this.indexLinks.forEach( (item, index) => 
			{
				// Preload image
				images[index] = new Image();
				images[index].src = item.image;
			});

			// Set preloaded flag to true
			this.isIndexImagesPreloaded = true;

		},


		///////////////////////////////////////////////////////
		// 	Events
		///////////////////////////////////////////////////////

		// Handle menu link click
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
				{ "label" : "About", 		"link" : "/about-us" },
				{ "label" : "Workshops",	"link" : "/workshops" },
				{ "label" : "Shop", 		"link" : "/shop" },
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
						"image" : item.project.data.carousel_image.url
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

// Menu Styles
#menu {
	width: 100vw;
	height: 100%;
	background-color: white;
	color: black;
	position: fixed;
	top: 0;
	right: 0;
	z-index: 102;
	transition: transform 0.6s cubic-bezier(0.81, 0, 0.23, 0.99), opacity 1s;
	overflow: auto;
	transition: all .8s;
	opacity: 0;
	visibility: hidden;
}

.menu-item {
	color: #dddfe2;
	font-size: 70px;
	margin: 3.3vh 0;
	text-align: right;
	line-height: 1;
	font-weight: 300;
    transition: color .6s;

    @media (max-width: $bp-size-md) {
        margin-top: 42px;
        font-size: 48px;
        line-height: 30px;
	}
}

.menu-item:hover {
	color: black;
	font-weight: 300;
}

.menu-item-link {
	color: #dddfe2;
	text-decoration: none;
	transition: color .6s;
}

.menu-item-link:hover {
	color: black;
	cursor: pointer;
}

.menu-container {
	height: auto;
	width: 100%;
	overflow: auto;
	padding: 50px;
	transform: translateY(-50%);
	top: 48%;
	position: absolute;
	-webkit-overflow-scrolling: touch;

    @media (max-width: $bp-size-md) {
        height: auto;
        width: 100%;
        overflow: auto;
        padding: 0 25px;
	}
}

// Social Icons Styles
.social-icons-wrapper {
	width: auto;
	display: flex;
	justify-content: flex-end;
	height: 40px;
	align-items: center;
	margin-top: 30px;
	position: absolute;
	bottom: 3%;
	right: 50px;

    @media (max-width: $bp-size-md) {
        margin-top: 50px;
        right: 25px;
	}
}

.social-icons-item {
	width: 40px;
	margin: 0 0 0 24px;
	transition: all .5s;
}

.social-icons-item:hover {
	filter: invert(100%);
}


// Index Styles
#index-overlay {
	width: 100vw;
	height: 100vh;
	animation: colorBlend 20s infinite;
	color: black;
	position: fixed;
	top: 0;
	right: 0;
	z-index: 104;
	transition: transform 0.6s cubic-bezier(0.81, 0, 0.23, 0.99), opacity 1s;
	overflow: auto;
	transition: all .8s;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
}

.index-title-container {
	display: inline-block;
	position: relative;
	width: auto;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	text-align: center;
	z-index: 105;
}

.index-title-wrapper {
	color: white;
	text-decoration: none;
	display: block;
}

.index-title {
	color: white;
	font-size: 70px;
	font-weight: 300;
	pointer-events: auto;
	cursor: pointer;
    position: relative;
    padding: 6px 0;

    @media (max-width: $bp-size-md) {
        font-size: 38px;
        margin: 20px 0;
	}
}

.index-title:before, .index-title:after {
	content: '';
	position: absolute;
	width: 0%;
	height: 5px;
	top: 50%;
	margin-top: -0.5px;
    background: #fff;

    @media (max-width: $bp-size-md) {
        display: none;
	}
}

.index-title:before {
	left: -2.5px;
}
.index-title:after {
	right: 2.5px;
	background: #fff;
	transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.index-title:hover:before {
	background: #fff;
	width: 100%;
	transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.index-title:hover:after {
	background: transparent;
	width: 100%;
	transition: 0s;
}


.index-bg-wrapper {
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.index-bg-image {
	position: fixed;
	display: block;
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	visibility: hidden;
	transition: all .7s;
	background-size: cover;
	background-position: center center;
}
</style>
