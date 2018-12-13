import Vue from 'vue';
import Vuex from 'vuex';

import * as _ from "lodash";

Vue.use( Vuex );

///////////////////////////////////////////////////////////
//  ...
///////////////////////////////////////////////////////////

module.exports = new Vuex.Store
(
	{ 
		"state": function()
		{
			return {
				"menu" : null,
				"footer" : null,
				"pageTitle" : null,
			}
		},
		"getters" : 
		{
			///////////////////////////////////////////////////////
		    //  Types
		    ///////////////////////////////////////////////////////

		    // Returns a type for a given id
			// "getTypeForId" : (state,getters) => (id) => _.find( state.types, (t)=> t.id == id ),
			
		},

		"mutations" : 
		{
			// 
			getSitewideData ( state, prismic ) 
			{
				// Get menu and footer from prismic API
	            prismic.client.getSingle('menu', { 'fetchLinks': ['project.project_title', 'project.hero_image'] } )
	            .then( (response, error) => 
	            {
	                // Print if error
	                if( error ) console.error( error );
	                // Assign content
	                state.menu = response.data;
	            })
	            prismic.client.getSingle('footer')
	            .then( (response, error) => 
	            {
	                // Print if error
	                if( error ) console.error( error );
	                // Assign content
	                state.footer = response.data;
	            })
	            ;
			},

			updatePageTitle ( state, title ) 
			{
				state.pageTitle = title;
			},
		},

		"actions" : 
		{
			// 
			loadSitewideData ( context, prismic ) 
			{
				context.commit( "getSitewideData", prismic );
			},

			updatePageTitle ( context, title )
			{
				context.commit( "setPageTitle", title );
			}
		},
	}
);