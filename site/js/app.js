/**
 * Created by randre03 on 8/30/14.
 */
// site/js/app.js

var app = app || {};

$(function() {
    $('#releaseDate').datepicker();
    new app.LibraryView();
});