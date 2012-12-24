(function () {
    var debug = window.location.host === 'localhost';

    require.config({
        config: {
            'modules/Main/models': {
                urlRoot: '/api/kazifasta'
            }
        },
        paths: {
            async: 'lib/requirejs-plugins/async',
            backbone: 'lib/backbone.custom',
            backbone_rollup: 'lib/backbone.rollup',
            i18n: 'lib/requirejs-plugins/i18n',
            jquery: 'lib/jquery',
            templates: '../templates',
            text: 'lib/requirejs-plugins/text',
            underscore: 'lib/underscore.custom'
        },
        shim: {
            'lib/backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
            'lib/backbone.collectionbinder': { deps: ['backbone', 'lib/backbone.modelbinder'] },
            'lib/d3.v2': { exports: 'd3' },
            'lib/jquery.ui': { deps: ['jquery'] },
            'lib/rickshaw': { deps: ['lib/d3.v2'], exports: 'Rickshaw' },
            'lib/underscore': { exports: '_' },
            'lib/underscore.custom': { deps: ['lib/underscore'], exports: '_' },
            'lib/uuid': { exports: 'uuid' }
        },
        urlArgs: debug ? (new Date()).getTime() : undefined,
        waitSeconds: 60
    });

    define(function (require) {
        'use strict';

        var _ = require('underscore'),
            $ = require('jquery'),
            Application = require('modules/controller');

        _.each(['Main', 'Employee', 'Employer', 'Job'], function (submodule) {
            Application.module(submodule);
        });

        var Modules = {
            Main: {
                Views: require('modules/Main/views')
            },
            Employee: {
                Views: require('modules/Employee/views')
            },
            Employer: {
                Views: require('modules/Employer/views')
            },
            Job: {
                Views: require('modules/Job/views')
            }
        };

        // initial views
        Application.region_navigation.show(new Modules.Main.Views.Navigation());
        Application.region_content.show(new Modules.Main.Views.Home());

        // event aggregation
        Application.Main.on('home', function () {
            Application.region_content.show(new Modules.Main.Views.Home());
        });

        Application.Main.on('login', function () {
            Application.region_content.show(new Modules.Main.Views.Login());
        });

        Application.Main.on('employee', function () {
            Application.region_content.show(new Modules.Employee.Views.New());
        });

        Application.Main.on('employer', function () {
            Application.region_content.show(new Modules.Employer.Views.New());
        });

        Application.Main.on('job', function () {
            Application.region_content.show(new Modules.Job.Views.New());
        });
    });
})();
