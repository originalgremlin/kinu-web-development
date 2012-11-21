define(function (require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone_rollup');

    var Application = new Backbone.Marionette.Application();

    Application.addRegions({
        region_navigation: 'body > nav',
        region_content: 'body > section.content'
    });

    Application.bind('initialize:before', function (options) {
        $('body').addClass('initializing');
    });

    Application.addInitializer(function (options) {
        $('body').ajaxStart(function () {
            $(this).addClass('loading');
        });
        $('body').ajaxStop(function () {
            $(this).removeClass('loading');
        });
    });

    Application.bind('initialize:after', function (options) {
        $('body').removeClass('initializing');
    });

    $(document).ready(function (event) {
        Application.start();
    });

    return Application;
});
