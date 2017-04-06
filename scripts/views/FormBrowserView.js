/* global define */

// Combines TableRecordViews into a <table>

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/FormCollection',
  'views/FormRecordView'
], function($, _, Backbone, formCollection, FormRecordView) {
  return Backbone.View.extend({
    tagName: 'div',
    
    template:
`
<div class="breadcrumbs">
  <span class="forms">Forms</span>
</div>
<table class="table-browser">
  <thead>
    <tr>
      <td>Form name</td>
      <td class="align-center">Number of submissions</td>
      <td class="align-right">Last submission</td>
    </tr>
  </thead>
  <tbody>
  
  </tbody>
</table>`,
    
    initialize() {
      this.formCollection = formCollection
      
      this.listenTo(this.formCollection, 'add', this.addOne)
      this.listenTo(this.formCollection, 'reset', this.addAll)
      
      this.render()
    },
    
    render() {
      this.$el.empty()
      this.$el.append(this.template)
      
      this.$elements = {
        thead: this.$('thead'),
        tbody: this.$('tbody')
      }
      this.addAll()
      
      return this
    },
    
    addOne(formModel) {
      const newFormRecordView = new FormRecordView({model: formModel})
      this.$elements.tbody.append( newFormRecordView.render().el )
    },
    
    addAll() {
      this.$elements.tbody.empty()
      this.formCollection.each(this.addOne, this)
    }
  })
})