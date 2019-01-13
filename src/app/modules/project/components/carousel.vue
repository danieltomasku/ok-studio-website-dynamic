<template>
    <div class="carousel">
		<div class="carousel-wrapper">
			<p ref="status" class="carousel-status"></p>
			<flickity ref="flickity" class="main-carousel" :options="flickityOptions">
				<div class="carousel-cell" v-for="item in content.items">
					<prismic-image :field="item.image" class="carousel-image" />
				</div>
			</flickity>
		</div>
	</div>
</template>

***********************************************************

<script>

import Flickity from 'vue-flickity';

export default
{
	"components": { Flickity },

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		var isMobile = matchMedia('screen and (max-width: 768px)').matches;
		return {
			flickityOptions: 
			{
				contain: false,
				pageDots: false,
				imagesLoaded: true,
				draggable: isMobile
			}
		}
	},
	"props" : ["content"],
	"watch" : 
	{
		content ( value ) { this.reset() },
	},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function()
	{
		let flickity = this.$refs.flickity;
		let carousel = this.$refs.flickity.$el;
		let carouselStatus = this.$refs.status;

		function updateStatus() 
		{
			var slideNumber = flickity.selectedIndex() + 1;
			carouselStatus.textContent = slideNumber + ' / ' + flickity.slides().length;
		}
		updateStatus();

		this.$refs.flickity.on( 'select', updateStatus );
	},

	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		reset ()
		{
			// Go to the first slide
			this.$refs.flickity.selectCell( 0, false, true );
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
  margin: 200px 0;
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