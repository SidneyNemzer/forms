/* global define */

// This view renders a <tr> with info about a query

define([
  'jquery',
  'underscore',
  'backbone',
  'models/QueryModel',
  'views/QueryView',
  'views/ModalView'
], function ($, _, Backbone, QueryModel, QueryView, ModalView) {
  return Backbone.View.extend({
    tagName: 'tr',
    
    template: _.template(
`<td title="<%- dateCreated %>">
    <%- lifetime %> ago
  </td>
  <td class="align-center">
    <span class="total-submissions"><%- totalKeys %></span>
  </td>
  <td class="align-right">
    <button class="warning delete">Delete</button>
  </td>`
    ),
    
    events: {
      'click': 'openQuery',
      'click .delete': 'deleteQuery'
    },
    
    render() {
      this.$el.html(this.template({
        totalKeys: this.model.getTotalKeys(),
        dateCreated: this.model.get('timestamp'),
        lifetime: this.timeSince(this.model.get('timestamp'))
      }))
      return this
    },
    
    openQuery(event) {
      if ($(event.target).is(this.$('button'))) {
        return
      }
      
      if (!this.modal) {
        this.modal = new ModalView({
          el: '#lightbox-view-query'
        })
      }
      if (!this.queryView) {
        this.queryView = new QueryView({
          model: this.model
        })
      }
      
      this.modal.$elements.lightbox.html(this.queryView.render().el)
      this.modal.show()
    },
    
    deleteQuery() {
      this.model.destroy()
      this.remove()
    },
    
    // Calculate time that's passed from a given date
    // to use in the format "10 minutes ago"
    // Source: http://stackoverflow.com/a/23259289
    timeSince(date) {
      if (typeof date !== 'object') {
        date = new Date(date);
      }
  
      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;
  
      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
          intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
            intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }
  
      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }
  
      return interval + ' ' + intervalType;
    }
  })
})