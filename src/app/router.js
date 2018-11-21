import Vue from 'vue';
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

// Create router instance
let router = new VueRouter( { "routes" : routes } );

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

router.beforeEach((to, from, next) =>
{
	// Scroll to the top when new page is loaded
	// Add delay to allow for DOM to be rewritten before scrolling top
	window.setTimeout( ()=> { window.scrollTo(0, 0); next(); }, 10 );
});

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

module.exports = router;