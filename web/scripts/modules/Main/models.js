define(function (require){

	var _ = require('underscore'),
		$ = require('jquery'),
		Backbone = require('backbone_rollup'),
		Models = {},
		config = module.config();

	Models.urlRoot = config.urlRoot;

	Models.Model = Backbone.Model.extend({
		defaults: { },
		idAttribute: '_id',
		urlRoot: config.urlRoot
	});

	Models.Collection = Backbone.Collection.extend({
		model: Models.Model,
		urlOptions: {
			designDoc: 'all',
			view: 'type',
			descending: false,
			limit: 100
		},

		initialize: function (options) {
			this._super('initialize', arguments);
			options = options || { };
			$.extend(this.urlOptions, options.urlOptions || { });
		},

		url: function () {
			var opts = this.urlOptions;
			return _.string.sprintf(
				'%s/_design/%s/_view/%s?reduce=%s&descending=%s&include_docs=%s&limit=%d%s%s%s%s',
				config.urlRoot,
				opts.designDoc,
				opts.view,
				opts.reduce || 'false',
				opts.descending || 'false',
				!opts.reduce,
				opts.limit || 100,
				_.isUndefined(opts.startkey) ? '' : _.string.sprintf('&startkey=%s', JSON.stringify(opts.startkey)),
				_.isUndefined(opts.startkey_docid) ? '' : _.string.sprintf('&startkey_docid=%s', opts.startkey_docid),
				_.isUndefined(opts.endkey) ? '' : _.string.sprintf('&endkey=%s', JSON.stringify(opts.endkey)),
				_.isUndefined(opts.endkey_docid) ? '' : _.string.sprintf('&endkey_docid=%s', opts.endkey_docid)
			);
		},

		parse: function (response) {
			this._super('parse', arguments);
			this.total_rows = response.total_rows;
			return _.pluck(response.rows, 'doc');
		}
	});

	return Models;
});