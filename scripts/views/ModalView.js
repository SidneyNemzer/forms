/* global define */

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return Backbone.View.extend({
    events: {
      'click': function (event) {
        if ($(event.target).is(this.$elements.lightbox)) {
          this.hide()
          this.trigger('cancel')
        }
      },
      'click .done': function () {
        this.hide()
        this.trigger('done')
      },
      'click .cancel': function () {
        this.hide()
        this.trigger('cancel')
      },
      'click .close': function () {
        this.hide()
        this.trigger('cancel')
      }
    },
    
    initialize(args) {
      this.$elements = {
        lightbox: this.$el,
        modal: this.$('.model'),
        cancel: this.$('.cancel'),
        done: this.$('.done'),
        close: this.$('.close')
      }
    },
    
    show() {
      this.$elements.lightbox.removeClass('hidden')
    },
    
    hide() {
      this.$elements.lightbox.addClass('hidden')
    }
  })
})