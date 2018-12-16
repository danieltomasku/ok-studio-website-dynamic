import Vue from 'vue';
import store from "./store.js";
import VueRouter from 'vue-router';

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

Vue.use( VueRouter );

// Gather routes from modules
let routes = [];
routes = routes.concat( require("@modules/home/routes.js") );
routes = routes.concat( require("@modules/preview/routes.js") );
routes = routes.concat( require("@modules/project/routes.js") );
routes = routes.concat( require("@modules/about/routes.js") );
routes = routes.concat( require("@modules/workshops/routes.js") );
routes = routes.concat( require("@modules/shop/routes.js") );

// Create router instance
let router = new VueRouter( { mode: 'history', "routes" : routes } );

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

router.beforeEach((to, from, next) =>
{
	// Reset page title
	store.commit("updatePageTitle", null);
	// Scroll to the top when new page is loaded
	// Add delay to allow for DOM to be rewritten before scrolling top
	window.setTimeout( ()=> { window.scrollTo(0, 0); }, 10 );
	next();
});

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

module.exports = router;
