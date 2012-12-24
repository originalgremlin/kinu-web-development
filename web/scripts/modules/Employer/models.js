define(function (require){

    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone_rollup'),
        Main = require('modules/Main/models'),
        Models = {};

    Models.Employer = Main.Model.extend({
        defaults: {
            name: null,
            company: null,
            email: null,
            phone: [],
            website: null
        }
    });

    return Models;
});