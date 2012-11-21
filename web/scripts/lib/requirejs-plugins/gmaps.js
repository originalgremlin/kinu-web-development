// convert Google Maps into an AMD module
define(function (require, exports, module) {
	require('async!https://maps.googleapis.com/maps/api/js?sensor=false');
	return window.google.maps;
});
