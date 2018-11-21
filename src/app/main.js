import Vue from 'vue'
import router from "./router.js";
import store from "./store.js";

import PrismicVue from 'prismic-vue';
import linkResolver from '../prismic/link-resolver';
import htmlSerializer from '../prismic/html-serializer'
 
// Init Prismic
Vue.use( PrismicVue, {
	endpoint: window.prismic.endpoint,
	linkResolver,
	htmlSerializer
});

Vue.config.productionTip = false;

// Init app
let app = new Vue(
{
	router,
	store
}
).$mount("#app");

// Load site wide data from prismic
app.$store.dispatch( "loadSitewideData", app.$prismic );

