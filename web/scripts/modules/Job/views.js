define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        Main = require('modules/Main/views'),
        Models = require('modules/Job/models'),
        Views = { };

    Views.New = Main.Base.extend({
        events: {
            'submit form': 'onSubmit'
        },
        model: new Models.Job(),
        template: require('text!templates/Job/New.html'),

        onSubmit: function (event) {
            event.preventDefault();
            this.model.save();
        }
    });

    return Views;
});
