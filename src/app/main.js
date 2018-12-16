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
	id: 'UA-XXXXXXXXX-X',
	router
});

Vue.config.productionTip = false;

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

