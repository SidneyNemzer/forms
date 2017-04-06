/* global define */

// Combines QueryRecordViews into a <table>

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/QueryCollection',
  'views/QueryRecordView'
], function($, _, Backbone, QueryCollection, QueryRecordView) {
  return Backbone.View.extend({
    tagName: 'div',
    
    template: _.template(
`
<div class="breadcrumbs">
  <span class="forms">Forms</span><a class="current"><%- tableName %></a>
</div>
<table class="table-browser">
  <thead>
    <tr>
      <td>Submitted</td>
      <td class="align-center">Number of keys</td>
      <td class="align-right"></td>
    </tr>
  </thead>
  <tbody>
  
  </tbody>
</table>`),

    events: {
      'click .forms': 'openIndex'
    },
    
    initialize() {
      this.router = require('routers/Router')
      
      this.render()
      this.addAll()
    },
    
    openIndex() {
      this.router.navigate('/view', {trigger: true})
    },
    
    render() {
      this.$el.empty()
      this.$el.html(this.template({
        tableName: this.model.get('name')
      }))
      
      this.$elements = {
        thead: this.$('thead'),
        tbody: this.$('tbody')
      }
      
      this.addAll()
      
      return this
    },
    
    addOne(queryModel) {
      const newQueryRecordView = new QueryRecordView({model: queryModel})
      this.$elements.tbody.append( newQueryRecordView.render().el )
    },
    
    addAll() {
      this.$elements.tbody.empty()
      this.model.get('queryCollection').each(this.addOne, this)
    }
  })
})