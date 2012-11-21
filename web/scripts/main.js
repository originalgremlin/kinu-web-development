(function () {
    var debug = window.location.host === 'localhost';

    require.config({
        config: {
            'modules/main/models': {
                urlRoot: '/api/egg-energy'
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

        var $ = require('jquery'),
            Application = require('modules/controller'),
            Main = require('modules/Main/views');

        // navigation
        var navigation = new Main.Navigation();
        Application.region_navigation.show(navigation);

        // content
        var home = new Main.Home();
        Application.region_content.show(home);

        // event handling
        Application.on('login', function () {
            var login = new Main.Login();
            this.region_content.show(login);
        });

        Application.on('logout', function () {
            var home = new Main.Home();
            this.region_content.show(home);
        });
    });
})();
