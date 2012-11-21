define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        Views = { };

    Views.Navigation = Backbone.Marionette.ItemView.extend({
        events: {
            'click a.login': 'onLoginClick'
        },
        template: require('text!templates/Main/Navigation.html'),

        onLoginClick: function (event) {
            Application.trigger('login');
        }
    });

    Views.Home = Backbone.Marionette.ItemView.extend({
        events: {
            'click': 'onClick',
            'mouseover': 'onMouseOver'
        },
        template: require('text!templates/Main/Home.html'),

        onClick: function (event) {
            console.log('you clicked the home section');
        },

        onMouseOver: function (event) {
            console.log('mouseover the home section');
        }
    });

    Views.Login = Backbone.Marionette.ItemView.extend({
        events: {
            'click a.logout': 'onLogout'
        },
        template: require('text!templates/Main/Login.html'),

        onLogout: function (event) {
            Application.trigger('logout');
        }
    });

    return Views;
});
