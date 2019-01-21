<template>
    <!-- Scroll To Top Button -->
    <button ref="scrollProgress" class="scroll-progress" @click="animateToTop(this)">
        <svg viewBox="0 0 640 640">
            <circle fill="#ffffff" opacity="0" cx="300" cy="300" r="281.25"/>
            <path class="outline" fill="none" d="M300 9.375c160.508 0 290.625 130.117 290.625 290.625s-130.117 290.625-290.625 290.625-290.625-130.117-290.625-290.625 130.117-290.625 290.625-290.625"/>
            <svg width="640" height="640" xmlns="http://www.w3.org/2000/svg"><g style="transform: translateX(-15px);" fill="none" fill-rule="evenodd"><path d="M0 0h640v640H0z"/><path fill="#ffffff" fill-rule="nonzero" d="M229 280.13l16.039 16.062 63.586-63.563V451h22.75V232.629l63.473 63.677L411 280.13 320 189z"/></g></svg>
        </svg>
    </button>
</template>

***********************************************************

<script>

import {TweenMax} from "gsap/all";

export default
{
	"components": {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	data ()
	{
		return {}
	},
	"props" : [""],
	"watch" : {},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"mounted": function(){
        // CIRCULAR SCROLL PROGRESS BAR + BACK TO TOP
        const { scrollProgress } = this.$refs;
        var progressPath = document.querySelector('.outline'),
            pathLength   = progressPath.getTotalLength(),
            lastPosition = -1;

        progressPath.style.stroke = '#ffffff';
        progressPath.style.strokeWidth = 20;
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;

        function updateProgress() {
            if (lastPosition > 200) {
                scrollProgress.classList.remove('hide');
            } else {
                scrollProgress.classList.add('hide');
            }
            var progress = pathLength - ( window.pageYOffset * pathLength / ( document.body.scrollHeight - window.innerHeight ) );

            // Update dashOffset
            progressPath.style.strokeDashoffset = progress;
        }

        function loop() {
            if ( lastPosition == window.pageYOffset ) {
                window.requestAnimationFrame( loop );
                return false;
            } else {
                lastPosition = window.pageYOffset;
                updateProgress();
            }
            window.requestAnimationFrame( loop );
        }

        // Call the loop for the first time
        loop();

    },
	"destroyed": function(){},

	///////////////////////////////////////////////////////
	// 	...
	///////////////////////////////////////////////////////

	"methods" : {
        // ANIMATE TO TOP
        animateToTop(e) {
            TweenMax.to(window, 1.7, {scrollTo:{y:0, autoKill: false}, ease: Power4.easeInOut});
        }
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

.scroll-progress {
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 80px;
  width: 80px;
  z-index: 10;
  background-color: transparent;
  border: none;
  outline: none;
  transition: opacity .5s, visibility .5s;
  cursor: pointer;

    @media (max-width: $bp-size-md) {
        bottom: 20px;
        right: 20px;
        height: 40px;
        width: 40px;
        z-index: 10;
        padding: 0;
    }
}

.hide {
  visibility: hidden;
  opacity: 0;
}


</style>