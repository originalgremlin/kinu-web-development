define(function (require){

    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone_rollup'),
        Main = require('modules/Main/models'),
        Models = {};

    Models.Job = Main.Model.extend({
        defaults: {
            type: 'job',
            title: null,
            description: null,
            skills: [],
            salary: 0
        }
    }, {
        converters: {
            skills: Backbone.ModelBinder.converters.textArray
        }
    });

    Models.Jobs = Main.Collection.extend({
        model: Models.Job,
        urlOptions: {
            designDoc: 'job',
            view: 'title'
        }
    });

    return Models;
});
