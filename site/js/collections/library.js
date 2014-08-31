/**
 * Created by randre03 on 8/30/14.
 */
var app = app || {};

(function (){

    'use strict';

    app.Library = Backbone.Collection.extend({
        model:  app.Book,
        url:    '/api/books'
    });
})();