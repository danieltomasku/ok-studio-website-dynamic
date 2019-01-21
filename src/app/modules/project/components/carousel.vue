<template>
    <div class="carousel">
		<div class="carousel-wrapper">
			<p ref="status" class="carousel-status"></p>
			<div ref="carousel" class="main-carousel" >
				<div class="carousel-cell" v-for="item in content.items">
					<prismic-image :field="item.image" class="carousel-image" />
				</div>
			</div>
		</div>
	</div>
</template>

***********************************************************

<script>

import Flickity from 'flickity';

export default
{

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		return {
			"flkty" : null,
		}
	},
	"props" : ["content"],
	"watch" : 
	{
		// Recreate flickity when content changes
		content ( value ) { this.createFlickity() },
	},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function()
	{
		this.createFlickity()
	},

	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		createFlickity ()
		{
			// Init flickity
			var isMobile = matchMedia('screen and (max-width: 768px)').matches;
			let options =
			{
				contain: false,
				pageDots: false,
				imagesLoaded: false,
				draggable: isMobile
			}
			this.flkty = new Flickity( this.$refs.carousel, options );
			// Update slide count status on change
			this.flkty.on( 'select', this.updateStatus );
			this.updateStatus();
			// Select first slide
			this.flkty.selectCell( 0, false, true );
		},

		updateStatus()
		{
			this.$refs.status.textContent = this.flkty.selectedIndex + 1 + ' / ' + this.flkty.slides.length;
		},
	},
	"computed" : {},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
///////////////////////////////////////////////////////////

.carousel
{
	margin: 200px 0;
}

.carousel * {  outline: none;  }

.carousel-status {
  font-family: GTWalsheim, sans-serif;
  font-weight: 100;
  font-size: 18px;
  color: white;
  text-align: center;
  margin: 35px 0;
}

.carousel-status.-light-theme {
  color: black;
}

.carousel-wrapper {
  display: block;
  position: relative;
  width: 100%;
  font-family: GTWalsheim;
  font-weight: 100;
}

.carousel-cell {
  width: 63%;
  margin: 0 5%;
}
.carousel-image {
  width: 100%;
}

@include breakpoint( $bp-mobile ) {

    .carousel-wrapper {
      margin: 120px 0;
    }

    .carousel-cell {
      width: 88%;
      margin: 0 1%;
    }
}
</style>

***********************************************************

<style lang="scss">
@import "~styles/_vars.scss";

.carousel
{
	.flickity-prev-next-button {
	  position: absolute;
	  top: 50%;
	  width: 50%;
	  opacity: 0 !important;
	  height: 100%;
	  border-radius: 0;
	  transform: translateY(-50%);
	}

	.flickity-prev-next-button.previous:hover {
	  cursor: url('#{$path-images}/cursors/cursor-arrow-prev.png') 32 32, auto;
	  cursor: -webkit-image-set(url('#{$path-images}/cursors/cursor-arrow-prev-lo.png') 1x, url('#{$path-images}/cursors/cursor-arrow-prev.png') 2x) 32 32, pointer; /* Webkit */
	}
	.flickity-prev-next-button.next:hover {
	  cursor: url('#{$path-images}/cursors/cursor-arrow-next.png') 32 32, auto;
	  cursor: -webkit-image-set(url('#{$path-images}/cursors/cursor-arrow-next-lo.png') 1x, url('#{$path-images}/cursors/cursor-arrow-next.png') 2x) 32 32, pointer; /* Webkit */
	}

	.flickity-prev-next-button.previous {
	  left: 0;
	}

	.flickity-prev-next-button.next {
	  right: 0;
	}

	@include breakpoint( $bp-mobile ) {
	
		.flickity-prev-next-button {
	      width: 10%;
	      right: 0 !important;
	      opacity: 0 !important;
	    }

	    .flickity-prev-next-button.next {
	      right: 0 !important;
	    }

	    .flickity-prev-next-button.previous {
	      left: 0 !important;
	    }
	}
}

</style>