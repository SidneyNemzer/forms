/* global define */

// Holds all forms

define([
  'underscore',
  'backbone',
  'backboneLocalstorage',
  'models/FormModel'
], function(_, Backbone, LocalStorage, FormModel) {
  const FormCollecton = Backbone.Collection.extend({
    model: FormModel,
    
    localStorage: new LocalStorage('formCollection'),
    
    initialize() {
      // TODO use arrow functions instead of `self`
      
      const self = this
      this.models.forEach(function (tableModel) {
        self.listenTo(tableModel.attributes.queryCollection, 'change', function() {
          console.log('FormCollecton: saving...')
          tableModel.save()
        })
      })
      
      this.listenTo(this, 'add', function(tableModel) {
        console.log('FormCollecton: new form added')
        self.listenTo(tableModel.attributes.queryCollection, 'change', function() {
          console.log('FormCollecton: saving...')
          tableModel.save()
        })
      })
    }
  })
  
  return new FormCollecton()
})