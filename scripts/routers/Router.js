define([
  'underscore',
  'backbone',
  'views/AppView',
  'views/FormBrowserView',
  'views/FormView',
  'collections/FormCollection'
], function (_, Backbone, app, FormBrowserView, FormView, formCollection) {
  const Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'view': 'viewFormBrowser',
      '*other': 'viewTable'
    },
    
    initialize() {
      this.views = {
        formBrowser: new FormBrowserView()
      }
      formCollection.fetch({reset: true})
    },
    
    // On Github Pages, this page (404.html) shouldn't ever be shown on the '/' route
    // index.md should be shown instead
    home() {
      // Just in case
      console.error("This page can't handle the current location ("+window.location.href+")")
    },
    
    // Allow the user to look through all tables that have been submited
    viewFormBrowser() {
      app.renderPage(this.views.formBrowser)
    },
    
    // Look at a specific table (possibly submitting a new query too)
    viewTable() {
      // Determine the form's name
      let formName = this.parseFirstDirectoryName(window.location.pathname)
      
      if (formName === '') {
        formName = 'default'
      }
      
      // See if the form already exists
      let formModel = formCollection.where({name: formName})[0]
      
      // Create a new form if one doesn't exist
      if (!formModel) {
        formModel = formCollection.create({name: formName})
      }
      
      // See if a query was submitted
      const queries = this.parseQueries(window.location.search)
      
      if (Object.keys(queries).length > 0) {
        // Create a new QueryModel using the queries
        // TODO Maybe move query parsing from here to the form or query model
        formModel.addQueries(queries)
      }
      
      formModel.save()
      
      this.views.currentFormView = new FormView({
        model: formModel,
        router: this
      })
      
      app.renderPage(this.views.currentFormView)
    },
    
    // This function gets the first directory in a path
    // eg. if the path is `/test/hi/ok` this function would return `test`
    // In Javascript, `window.location.pathname` gets the current page's path
    parseFirstDirectoryName(pathname) {
      const pathRegex = /\/([^\/]+)/
      
      const result = pathRegex.exec(pathname)
      
      if (typeof result == 'object') {
        return result[1]
      }
      return ''
    },
    
    // This function decodes the query string from a URL
    // It expects the value from `window.location.search`
    // TODO Use the DOM object `URLSearchParams` when it's supported better 
    // http://caniuse.com/#feat=urlsearchparams
    parseQueries(queryString) {
      const queries = {}
      
      const queryRegex = /\??([^=]+)=([^&]+)&?/g
      
      let result
      
      while (result = queryRegex.exec(queryString)) {
        const key = decodeURIComponent(result[1])
        const value = decodeURIComponent(result[2])
        
        switch (typeof queries[key]) {
          case 'undefined':
            queries[key] = value                    
            break
          
          case 'string':
            queries[key] = [queries[key]]
            queries[key].push(value)
            break
          
          case 'object': // It's actually an array, but `typeof` pretends arrays are objects
            queries[key].push(value)
            break
        }
      }
      
      return queries
    },
  })
  
  return new Router()
})