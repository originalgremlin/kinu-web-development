define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        i18n = require('lib/i18n'),
        Views = { };

    Views.Navigation = Backbone.Marionette.ItemView.extend({
        events: {
            'click a.logo': 'onLogoClick',
            'click a.login': 'onLoginClick',
            'click a.employee': 'onEmployeeClick',
            'click a.employer': 'onEmployerClick',
            'click a.job': 'onJobClick'
        },
        template: i18n.parse(require('text!templates/Main/Navigation.html')),

        onLogoClick: function (event) {
            event.preventDefault();
            Application.Main.trigger('home');
        },

        onLoginClick: function (event) {
            event.preventDefault();
            Application.Main.trigger('login');
        },

        onEmployeeClick: function (event) {
            event.preventDefault();
            Application.Main.trigger('employee');
        },

        onEmployerClick: function (event) {
            event.preventDefault();
            Application.Main.trigger('employer');
        },

        onJobClick: function (event) {
            event.preventDefault();
            Application.Main.trigger('job');
        }
    });

    Views.Home = Backbone.Marionette.ItemView.extend({
        template: i18n.parse(require('text!templates/Main/Home.html'))
    });

    Views.Login = Backbone.Marionette.ItemView.extend({
        events: {
            'submit form': 'onSubmit'
        },
        template: i18n.parse(require('text!templates/Main/Login.html')),

        onSubmit: function (event) {
            event.preventDefault();
            console.log('submit the login form');
        }
    });

    return Views;
});
