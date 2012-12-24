define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('modules/controller'),
        Backbone = require('backbone_rollup'),
        i18n = require('lib/i18n'),
        Views = { };

    Views.Base = Backbone.Marionette.ItemView.extend({
        beforeRender: function () {
            this.template = i18n.parse(this.template);
        },

        onRender: function () {
            if (this.model) {
                this.model.set(this.model.defaults, { silent: true });
                this.bindModel();
            }
        },

        bindModel: function () {
            new Backbone.ModelBinder().bind(this.model, this.$el, this.getModelBindings());
        },

        getModelBindings: function () {
            var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');
            _.each(this.model.constructor.converters, function (func, attr) {
                if (bindings[attr])
                    bindings[attr].converter = func;
            });
            return bindings;
        }
    });

    Views.Navigation = Views.Base.extend({
        events: {
            'click a.logo': 'onLogoClick',
            'click a.login': 'onLoginClick',
            'click a.employee': 'onEmployeeClick',
            'click a.employer': 'onEmployerClick',
            'click a.job': 'onJobClick'
        },
        template: require('text!templates/Main/Navigation.html'),

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

    Views.Home = Views.Base.extend({
        template: require('text!templates/Main/Home.html')
    });

    Views.Login = Views.Base.extend({
        events: {
            'submit form': 'onSubmit'
        },
        template: require('text!templates/Main/Login.html'),

        onSubmit: function (event) {
            event.preventDefault();
            console.log('submit the login form');
        }
    });

    return Views;
});
