/* global define */

// Keeps track of a single collection of submited queries

define([
  'backbone',
  'collections/QueryCollection'
], function(Backbone, QueryCollection) {
  return Backbone.Model.extend({
    defaults: function() {
      
      const collection = new QueryCollection()
      
      return {
        name: 'form',
        queryCollection: collection
      }
    },
    
    initialize() {
      this.listenTo(this.get('queryCollection'), 'destroy', function () {
        this.save()
      })
    },
    
    addQueries(queryObject) {
      this.get('queryCollection').create({data: queryObject})
    },
    
    parse(response) {
      if (!this.get('queryCollection')) {
        response.queryCollection = new QueryCollection(response.queryCollection)
        return response  
      }
    }
  })
})