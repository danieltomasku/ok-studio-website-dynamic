import Vue from 'vue'
import router from "./router.js";
import store from "./store.js";
import Page from "./page.vue";

import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics';

import PrismicVue from 'prismic-vue';
import linkResolver from '../prismic/link-resolver';
import htmlSerializer from '../prismic/html-serializer'

Vue.use(Meta);
 
// Init Prismic
Vue.use( PrismicVue, {
	endpoint: window.prismic.endpoint,
	linkResolver,
	htmlSerializer
});

// Init Google Analytics
Vue.use( VueAnalytics, {
	id: 'UA-129305382-1',
	router
});

Vue.config.productionTip = false;

Vue.directive('infocus', {
    isLiteral: true,
    bind: (el, binding, vnode) => {
        el.style.opacity = 0;
    },
    inserted: (el, binding, vnode) => {
        const updateInView = () => {
            const rect = el.getBoundingClientRect()
            const inView = !((rect.top + rect.height < 0) || (rect.top > window.innerHeight - 180))
            if (inView) {
                el.classList.add(binding.value)
                window.removeEventListener('scroll', updateInView)
            }
        }
        window.addEventListener('scroll', updateInView)
        updateInView()
    }
  });

// Init app
let app = new Vue(
{
	router,
    store,
	render: (h) => h(Page),
}
).$mount("#app");

// Load site wide data from prismic
app.$store.dispatch( "loadSitewideData", app.$prismic );

