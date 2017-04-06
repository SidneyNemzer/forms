/* global define */

// Keeps track of a single query

define([
  'backbone',
], function(Backbone) {
  return Backbone.Model.extend({
    defaults: function() {
      return {
        timestamp: Date.now(),
        data: {}
      }
    },
    
    getTotalKeys() {
      return Object.keys(this.attributes.data).length
    },
    
    // This model doesn't need to sync itself
    sync() {
      return
    }
  })
})