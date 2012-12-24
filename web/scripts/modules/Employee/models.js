define(function (require){

    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone_rollup'),
        Main = require('modules/Main/models'),
        Models = {};

    Models.Employee = Main.Model.extend({
        defaults: {
            type: 'employee',
            name: null,
            email: null,
            phone: [],
            skills: [],
            website: null
        }
    });

    return Models;
});