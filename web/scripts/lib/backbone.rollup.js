define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    require('lib/backbone.marionette.custom');
    require('lib/backbone.modelbinder.custom');
    require('lib/backbone.collectionbinder');
    require('lib/backbone.validation');

    return Backbone;
});