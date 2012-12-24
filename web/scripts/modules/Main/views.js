define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        Views = { };

    Views.Navigation = Backbone.Marionette.ItemView.extend({
        events: {
            'click a.login': 'onLoginClick',
            'submit form': 'onSubmit'
        },
        template: require('text!templates/Main/Navigation.html'),

        onLoginClick: function (event) {
            event.preventDefault();
            Application.trigger('login');
        },

        onSubmit: function (event) {
            event.preventDefault();
            var form = $(event.currentTarget),
                input = form.find('input[name=search]'),
                search = input.val();
            this.searchForJobs(search);
        },

        searchForJobs: function (search) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost/api/kazifasta/' + search
            }).done(function (result) {
                $('body').append(result);
            });
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
