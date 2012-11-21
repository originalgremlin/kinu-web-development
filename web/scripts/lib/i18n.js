// inspired by django.views.i18n.javascript_catalog
// but uses string interpolation to allow for maximum flexibility in translations
define(function (require) {
    'use strict';

    var _ = require('underscore');

	// TODO: have the server write this file with a template
	// TODO: seems like a perfect job for coubdbapp
	// TODO: or maybe require.i18n

	// TODO: set up gettext to note undefined catalog values and post them to the database as a new word shows up
	// TODO: that way we can use gettext programatically and the translation table will always have the latest data
	var i18n = { };
	i18n.catalog = { };

	i18n.gettext = function (msg, args) {
		var value = i18n.catalog[msg];
		if (_.isUndefined(value)) {
			i18n.catalog[msg] = msg;
			value = msg;
		} else {
			value = _.isString(value) ? value : value[0];
		}
		return args ? _.string.sprintf(value, args) : value;
	};

	i18n.ngettext = function (singular, plural, count, args) {
		var value = i18n.catalog[singular];
		if (_.isUndefined(value)) {
			i18n.catalog[singular] = [singular, plural];
			value = (count === 1) ? singular : plural;
		} else {
			value = value[(count === 1) ? 0 : 1];
		}
		return args ? _.string.sprintf(value, args) : value;
	};

	i18n.gettext_noop = function (msg, args) {
		return args ? _.string.sprintf(msg, args) : msg;
	};

	return i18n;
});
