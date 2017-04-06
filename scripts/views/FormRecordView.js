/* global define */

// This view renders a <tr> with info about its form

define([
  'jquery',
  'underscore',
  'backbone',
  'models/FormModel',
  'routers/Router'
], function($, _, Backbone, FormModel, router) {
  return Backbone.View.extend({
    tagName: 'tr',
    
    template: _.template(
`<td class="name">
    <%- name %>
  </td>
  <td class="align-center">
    <span class="total-submissions"><%- totalSubmissions %></span>
  </td>
  <td class="align-right" title="<%- lastSubmissionDate %>">
    <%- lifetime %> ago
  </td>`
    ),
    
    events: {
      'click': 'openForm'
    },
    
    render() {
      const lastSubmission = this.model.get('queryCollection').getLast()
      const lastSubmissionDate = lastSubmission ? lastSubmission.get('timestamp') : 'N/A'
      const lifetime = lastSubmission ? this.timeSince(lastSubmissionDate) : 'N/A'
      
      
      this.$el.html(this.template({
        name: this.model.get('name'),
        totalSubmissions: this.model.get('queryCollection').length,
        lastSubmissionDate: lastSubmissionDate,
        lifetime: lifetime
      }))
      
      return this
    },
    
    openForm() {
      if (!this.router) {
        this.router = require('routers/Router')
      }
      if (!this.router) {
        throw new Error('Failed to get router')
      }
      this.router.navigate(this.model.get('name'), {trigger: true})
    },
    
    // Calculate time that's passed from a given date
    // in the format "10 minutes ago"
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