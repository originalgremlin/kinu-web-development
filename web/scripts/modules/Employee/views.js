define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        Main = require('modules/Main/views'),
        Views = { };

    Views.New = Main.Base.extend({
        events: {
            'submit form': 'onSubmit'
        },
        template: require('text!templates/Employee/New.html'),

        onSubmit: function (event) {
            event.preventDefault();
            console.log('submit the new employee form');
        }
    });

    return Views;
});
