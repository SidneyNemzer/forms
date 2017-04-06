/* global define */

// This view handles the header and renders the current 'page' view into the <main>

define([
  'jquery',
  'underscore',
  'backbone',
  'views/FormBrowserView',
  'views/FormView',
  'models/FormModel'
], function($, _, Backbone, FormBrowserView, FormView, FormModel) {
  const AppView = Backbone.View.extend({
    el: 'body',
    
    initialize() {
      this.$elements = {
        header: this.$('header'),
        main: this.$('main')
      }
    },
    
    renderPage(view) {
      this.$elements.main.empty()
      this.$elements.main.append(view.render().el)
    }
  })
  
  return new AppView()
})