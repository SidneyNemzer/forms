/* global require */

/*
  This file tells require JS about non-AMD scripts (like backbone and underscore) then loads the application
*/

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    backboneLocalstorage: {
      deps: ['backbone'],
      exports: 'Store'
    }
  },
  paths: {
    jquery: 'lib/jquery/jquery',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		backboneLocalstorage: 'lib/backbone.localstorage/backbone.localStorage'
  }
})

require([
  'backbone',
  'routers/Router' // Ask for the router so that it gets initialized
], function (Backbone, router) {
  
  Backbone.history.start({pushState: true})
  
})