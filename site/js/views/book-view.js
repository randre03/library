/**
 * Created by randre03 on 8/30/14.
 */
//Book-View
var app = app || {};

(function ($){

    'use strict';

    app.BookView = Backbone.View.extend({
        tagName:    'div',
        className:  'bookContainer',
        template:   _.template( $('#bookTemplate').html()),

        events: {
            'click .delete':    'deleteBook'
        },

        render: function (){
            //this.el is what we defined in tagName, use $el to get access to jQuery html() function
            this.$el.html( this.template( this.model.attributes));

            return this;
        },

        deleteBook: function (){
            //delete model
            this.model.destroy();

            //delete the view
            this.remove();
        }
    });
})(jQuery);