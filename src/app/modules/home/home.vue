<template>
        <div>
            <!-- Landing Slider -->
            <slider v-if="content" :content="content.carousel_items"></slider>

            <!-- Home Intro -->
            <section class="page-content">
                <div class="page-intro">
                    <h1 class="col-12 h-text-center" v-if="content">
                        <p>
                        <template v-for="(item, index) in content.body">
                            <template v-if="item.slice_type === 'emoji_interaction' ">
                                <span v-if="item.items.length > 0" class="char-wrapper" :key="index">
                                    <span class="char-original show">{{item.primary.words[0].text}}&nbsp;</span>
                                    <span class="char-emoji hide" v-for="(emojis, index) in item.items" :key="index"><img :src="emojis.emoji.url" /></span>
                                </span>
                                <span v-else :key="index">{{item.primary.words[0].text}}&nbsp;</span>
                            </template>
                        </template>
                        </p>
                    </h1>

                    <!-- E-mail Link -->
                    <router-link to="/contact" class="say-hello" @click="toggleForm()" v-if="content">
                        {{ content.contact_text }} <span class="say-hello-arrow">→</span>
                    </router-link>

                </div>
            </section>
        </div>
</template>

***********************************************************

<script>

export default
{
    "components": 
    {
        "contact-form"      : require("@modules/shared/components/contact-form.vue").default,
        "slider"            : require("./components/slider.vue").default,
    },

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    data ()
    {
        return {
            "content" : null,
        };
    },
    "props" : [""],
    "watch" : {},

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "created": function()
    {
        // Load content from prismic
        this.getContent();
    },

    "mounted": function()
    {
        // EMOJI WORD REPLACEMENT
        setTimeout(() => {
            const allCharWrapper = Array.from(document.querySelectorAll('.char-wrapper'));
        const allCharOriginal = Array.from(document.querySelectorAll('.char-original'));
        const allCharEmoji = Array.from(document.querySelectorAll('.char-emoji'));

        document.body.addEventListener('click', resetChars);

        allCharWrapper.forEach((item) => {
            item.addEventListener('mouseenter', function (event) {
                handleMouseEnter(event);
            });
        });

        function handleMouseEnter(event) {
            var rand = Math.floor(Math.random() * (event.target.children.length - 1)) + 1;
            if (event.target.children[0].classList.contains('show')) {
                event.target.children[0].classList.add('hide');
                event.target.children[0].classList.remove('show');
                event.target.children[rand].classList.add('show');
                event.target.children[rand].classList.remove('hide');
            } else {
                event.target.children[0].classList.add('show');
                event.target.children[0].classList.remove('hide');
                var allChildren = Array.from(event.target.children);
                var removeEmojiList = allChildren.slice(1);

                removeEmojiList.forEach(item => {
                    item.classList.add('hide');
                    item.classList.remove('show');
                });
            }

            if (allCharEmoji.length === document.querySelectorAll('.char-emoji.show').length) {
                allCharEmoji.forEach(item => {
                    item.style.animation = 'wave 2s infinite';
                });
            } else {
                allCharEmoji.forEach(item => {
                    item.style.animation = '';
                });
            }
        };

        function autoPlayChars() {
            var rand = Math.floor(Math.random() * allCharWrapper.length);
            var randEmoji = Math.floor(Math.random() * (allCharWrapper[rand].children.length - 1)) + 1;

            if (allCharWrapper[rand].children[0].classList.contains('show')) {
                allCharWrapper[rand].children[0].classList.add('hide');
                allCharWrapper[rand].children[0].classList.remove('show');
                allCharWrapper[rand].children[randEmoji].classList.add('show');
                allCharWrapper[rand].children[randEmoji].classList.remove('hide');
            } else {
                allCharWrapper[rand].children[0].classList.add('show');
                allCharWrapper[rand].children[0].classList.remove('hide');
                var allChildren = Array.from(allCharWrapper[rand].children);
                var removeEmojiList = allChildren.slice(1);

                removeEmojiList.forEach(item => {
                    item.classList.add('hide');
                    item.classList.remove('show');
                });
            }
        }

        function resetChars() {
            allCharOriginal.forEach(item => {
                item.classList.add('show');
                item.classList.remove('hide');
            });
            allCharEmoji.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            });
        }
        }, 2000)
    },

    "destroyed": function(){},

    ///////////////////////////////////////////////////////
    //  ...
    ///////////////////////////////////////////////////////

    "methods" :
    {
        getContent ()
        {
            // Get content from prismic API
            this.$prismic.client.getSingle( 'homepage', { 'fetchLinks': ['project.project_title', 'project.carousel_image', 'project.carousel_cursor_hover'] } )
            // Handle response
            .then( (response, error) =>
            {
                // Print if error
                if( error ) console.error( error );
                // Assign content
                this.content = response.data;                
            });
        },
    },
    "computed" : {},
}
</script>

***********************************************************

<style lang="scss" scoped>
@import "~styles/_vars.scss";

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

.page-content {
    margin-top: 100vh;
    background-color: white;
    overflow: auto;
    position: relative;
    z-index: 2;
}

.page-intro {
    width: 70%;
    max-width: 1400px;
    text-align: center;
    margin: 60px auto;

    h1 {
        font-family: $font-family-base;
        font-weight: 300;
        font-size: 4.6vw;
        line-height: 1.4;


        @media (max-width: $bp-size-md) {
            font-size: 6vw;
            width: 100%;
	    }
    }

    @media (max-width: $bp-size-md) {
        width: 90%;
	}
}

/* Emoji Word Replacement */

.char-wrapper {
  position: relative;
  display: inline-block;
}

.char-original {
  position: relative;
  visibility: visible;
  opacity: 1;
  transition: all .6s;
}

.char-emoji {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  transition: all .6s;
}

.char-emoji img {
  width: 6vw;
  max-width: none;
}

.char-wrapper:nth-child(1) .char-emoji {
  animation-delay: .1s !important;
}
.char-wrapper:nth-child(2) .char-emoji {
  animation-delay: .2s !important;
}
.char-wrapper:nth-child(3) .char-emoji {
  animation-delay: .3s !important;
}
.char-wrapper:nth-child(4) .char-emoji {
  animation-delay: .4s !important;
}
.char-wrapper:nth-child(5) .char-emoji {
  animation-delay: .5s !important;
}
.char-wrapper:nth-child(5) .char-emoji {
  animation-delay: .6s !important;
}
.char-wrapper:nth-child(5) .char-emoji {
  animation-delay: .7s !important;
}
.char-wrapper:nth-child(5) .char-emoji {
  animation-delay: .8s !important;
}

.hide {
  visibility: hidden;
  opacity: 0;
}

.show {
  display: inline-block;
}

.char-emoji.show {
  display: block;
  visibility: visible;
  opacity: 1;
}


@keyframes wave {
  0% {
    transform: translate(-50%, 0px);
  }
  50% {
    transform: translate(-50%, -40px)
  }
  100% {
    transform: translate(-50%, 0px);
  }
}

/*End Emoji Word Replacement*/

.say-hello {
  font-family: GTWalsheim, sans-serif;
  font-size: 18px;
  margin: 64px 0;
  text-align: center;
  color: $color-text;
  display: block;
}

.say-hello-arrow {
  display: inline-block;
  transition: transform .2s ease-in-out;
  padding-left: 4px;
}

.say-hello:hover {
  cursor: pointer;
}

.say-hello:hover .say-hello-arrow {
  transform: translateX(4px);
}

</style>
