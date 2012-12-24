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

    Views.Item = Main.Base.extend({
        tagName: 'li',
        template: require('text!templates/Job/Item.html'),
        templateHelpers: {
            datePosted: function () {
                return new Date(this.timestamp).toDateString();
            }
        }
    });

    Views.List = Backbone.Marionette.CollectionView.extend({
        collection: new Models.Jobs(),
        itemView: Views.Item,
        tagName: 'ul',

        onShow: function () {
            this.collection.fetch();
        }
    });

    return Views;
});
