define(function (require) {
	'use strict';

	var _ = require('lib/underscore');
	_.string = require('lib/underscore.string');

    // CHANGE: Redefine template interpolation delimiters to be Moustache-style {{ and }}.
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	_.mixin({
		register: function (module) {
			var current = window;
			_.each(module.split('.'), function (submodule) {
				if (_.isUndefined(current[submodule]))
					current[submodule] = {};
				current = current[submodule];
			});
			return current;
		}
	});

	_.string.capwords = function (str) {
		return str.toLowerCase().replace(/^.|\s\S/g, function (a) { return a.toUpperCase(); });
	};

	return _;
});
