define(function (require) {
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        Marionette = require('lib/backbone.marionette');

    _.extend(Marionette.TemplateCache.prototype, {
        // CHANGE: allow inline, undefined, and function templates
        loadTemplate: function (templateId) {
            templateId = _.isFunction(templateId) ? templateId() : (templateId || '');
            var template = _.string.startsWith(templateId, '#') ? $(templateId).html() : templateId;

            // Make sure we have a template before trying to compile it
            if (!_.isString(template)) {
                var msg = "Could not find template: '" + templateId + "'";
                var err = new Error(msg);
                err.name = "NoTemplateError";
                throw err;
            }

            return template;
        }
    });

    _.extend(Marionette.CollectionView.prototype, {
        // CHANGE: add "parent" property to ItemViews created from a CollectionView
        buildItemView: function (item, ItemView) {
            var itemViewOptions = _.result(this, "itemViewOptions");
            var options = _.extend({ model: item, parent: this }, itemViewOptions);
            var view = new ItemView(options);
            return view;
        }
    });
});
