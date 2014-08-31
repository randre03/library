/**
 * Created by randre03 on 8/30/14.
 */
//MODEL

var app = app || {};

(function () {

    'use strict';

    app.Book = Backbone.Model.extend({

        defaults:   {
            coverImage:     'img/placeholder.png',
            title:          'No title',
            author:         'Unknown',
            releaseDate:    'Unknown',
            keywords:       'none'
        },

        parse: function (res) {
            res.id = res._id;
            return res;
        }
    });
})();