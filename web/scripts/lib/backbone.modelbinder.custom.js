define(function (require) {
    'use strict';

    var _ = require('underscore'),
        ModelBinder = require('lib/backbone.modelbinder');

    var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    ModelBinder.converters = {
		textArray: function (direction, value, attr, model) {
			return (direction === ModelBinder.Constants.ModelToView) ?
				value.join(',') :
				value.split(',');
		},

		numberArray: function (direction, value, attr, model) {
			return (direction === ModelBinder.Constants.ModelToView) ?
				value.join(',') :
				_.map(value.split(','), parseFloat);
		},

		dateArray: function (direction, value, attr, model) {
			return (direction === ModelBinder.Constants.ModelToView) ?
				value.join('/') :
				_.map(value.split('/'), parseFloat);
		},

		datePicker: function (direction, value, attr, model) {
			if (direction === ModelBinder.Constants.ModelToView) {
				return value.length >= 3 ? _.string.sprintf('%02d %s %d', value[2], months[value[1]], value[0]) : '';
			} else {
				var parts = value.split(' ');
				return [parseInt(parts[2], 10), _.indexOf(months, parts[1]), parseInt(parts[0], 10)];
			}
		}
    };
});
