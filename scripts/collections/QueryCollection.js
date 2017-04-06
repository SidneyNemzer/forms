/* global define */

// Holds a group of queries

define([
  'underscore',
  'backbone',
  'backboneLocalstorage',
  'models/QueryModel'
], function(_, Backbone, LocalStorage, QueryModel) {
  return Backbone.Collection.extend({
    model: QueryModel,
    
    initialize() {
      // this.listenTo(this, 'destroy', function () {
      //   console.log('QueryCollection: destroy detected, triggering update')
      //   this.trigger('update')
      // })
    },
    
    getLast() {
      return this.at(-1)
    },
    
    sync() {
      console.warn('Ignoring QueryCollection sync')
      return
    }
  })
})