define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        i18n = require('lib/i18n'),
        Views = { };

    Views.New = Backbone.Marionette.ItemView.extend({
        events: {
            'submit form': 'onSubmit'
        },
        template: i18n.parse(require('text!templates/Employer/New.html')),

        onSubmit: function (event) {
            event.preventDefault();
            console.log('submit the new employer form');
        }
    });

    return Views;
});
