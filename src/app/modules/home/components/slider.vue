<template>
    <section class="landing-slide">
        <ul class="slides" v-if="content" ref="slides">
            <router-link
                v-for="(item, index) in content"
                :key="item.uid"
                :to=" '/project/' + item.home_carousel_item.uid "
            >
                <li
                    :class="['landing-project', { '-active' : index === currentSlideIndex } ]"
                    :style="{
                        backgroundImage: `url(${item.home_carousel_item.data.carousel_image.url})`,
                        cursor: `url(${item.home_carousel_item.data.carousel_cursor_hover.url}) 32 32, auto`,
                        cursor: `-webkit-image-set(url(${item.home_carousel_item.data.carousel_cursor_hover.url}) 1x, url(${item.home_carousel_item.data.carousel_cursor_hover.url}) 2x) 0 0, pointer`
                    }"
                >
                </li>
            </router-link>
        </ul>

        <!-- Hover Area for Mouse Slider Navigation -->
        <ul class="slides-control">
            <li class="slide-backward" @click="onPreviousClick($event)"></li>
            <li class="slide-forward" @click="onNextClick($event)"></li>
        </ul>

        <!-- Slide Dots -->
        <ul class="slide-dots">
        	<li :class="['slide-dot', { '-active' : index === currentSlideIndex } ]" v-for="(item, index) in numSlides" @click="onDotClick(index)"></li>
        </ul>
    </section>
</template>

***********************************************************

<script>

export default
{
	"components": {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		return {
			"currentSlideIndex" : 0,
			"autoplayInterval" : null,
		}
	},
	"props" : ["content"],
	"watch" : {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function()
	{
		// Start autoplay, but after delay for loading screen
		window.setTimeout( this.startAutoplay, 2000 );
	},

	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : 
	{
		previous()
		{
			// Decrement within bounds of items
			this.currentSlideIndex = ( this.currentSlideIndex > 0 ) ? this.currentSlideIndex - 1 : this.$props.content.length - 1;
		},

		next()
		{
			// Increment within bounds of items
			this.currentSlideIndex = ( this.currentSlideIndex < this.$props.content.length - 1 ) ? this.currentSlideIndex + 1 : 0;
		},

		onPreviousClick( event )
		{
			// Previous slide
			this.previous();
			// Cancel autoplay
			this.cancelAutoplay();
		},

		onNextClick( event )
		{
			// Next slide
			this.next();
			// Cancel autoplay
			this.cancelAutoplay();
		},

		onDotClick(index)
		{
			// Assign
			this.currentSlideIndex = index;
			// Cancel autoplay
			this.cancelAutoplay();
		},

		startAutoplay()
		{
			// Advance slide every X seconds
			this.autoplayInterval = window.setInterval( this.next, 7000 );
		},

		cancelAutoplay()
		{
			// Stop auto advance
			window.clearInterval( this.autoplayInterval );
			// Resume it after X seconds
			window.setTimeout( this.startAutoplay, 15000 );
		},
	},

	"computed" : 
	{
		numSlides() { return this.$props.content.length; }
	},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
// 	...
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
    z-index: -1;
}

.landing-project {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
    background-size: cover;
    background-position: center center;
}

.landing-project.-active {
    z-index: 1;
}


.slide-backward {
    position: fixed;
    width: 25vw;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
}
.slide-forward {
    position: fixed;
    width: 25vw;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 10;
}

.slide-backward:hover {
  cursor: url('#{$path-images}/cursors/cursor-arrow-prev.png') 32 32, auto;
  cursor: -webkit-image-set(url('#{$path-images}/cursors/cursor-arrow-prev-lo.png') 1x, url('#{$path-images}/cursors/cursor-arrow-prev.png') 2x) 32 32, pointer; /* Webkit */
}
.slide-forward:hover {
  cursor: url('#{$path-images}/cursors/cursor-arrow-next.png') 32 32, auto;
  cursor: -webkit-image-set(url('#{$path-images}/cursors/cursor-arrow-next-lo.png') 1x, url('#{$path-images}/cursors/cursor-arrow-next.png') 2x) 32 32, pointer; /* Webkit */
}



</style>

<style lang="scss">
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
//  ... Unscoped Styles
///////////////////////////////////////////////////////////

.slide-dots {
  position: absolute;
  bottom: 6%;
  right: 50px;
  display: inline-block;
  z-index: 10;
  mix-blend-mode: difference;
}

.slide-dots li {
  width: 24px;
  padding: 10px 0;
  height: 0px;
  border-radius: 0px;
  display: inline-block;
  margin-right: 11px;
  opacity: .3;
}

.slide-dots li:after {
  content: '';
  display: block;
  background-color: white;
  width: 100%;
  height: 2px;
  z-index: 1000;
}

.slide-dots li:hover {
  cursor: pointer;
}

.slide-dots li.-active {
  opacity: 1;
}


</style>