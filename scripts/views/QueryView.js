/* global define */

// Displays a info about a single query
// That is, the keys and values in the query, and the submission time

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'modal',
    
    template: _.template(
`
<h1>Query</h1>
<span class="close">X</span>
<p>Submited at <%- submitDate %></p>
<table class="query-table">
  <thead>
    <th>Key</th><th>Value</th>
  </thead>
  <tbody>
  </tbody>
</table>
`   ),

    render() {
      this.$el.empty()
      this.$el.html(this.template({
        submitDate: this.model.get('timestamp')
      }))
      
      this.$elements = {
        tbody: this.$('tbody')
      }
      
      _.each(this.model.get('data'), (value, key) => {
        this.$elements.tbody.append(`<tr><td>${key}</td><td>${value}</td></tr>`)
      })
      
      return this
    }
  })
})