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
routes.push(
{
	path: '/contact',
	beforeEnter: (to, from, next) => 
	{
		// Show the contact form (see shared/contact-form component)
		window.toggleContactForm();
		// Cancel route
		next( false );
	}
});

// Create router instance
let router = new VueRouter( 
	{ 
		"mode" : "history", 
		"routes" : routes,
		"scrollBehavior" : (to, from, savedPosition) => 
		{
			// Scroll to top of screen
			return { x: 0, y: 0 };
		}
	} 
);

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

router.beforeEach((to, from, next) =>
{
	// Reset page title
	store.commit("updatePageTitle", null);
	next();
});

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

module.exports = router;
