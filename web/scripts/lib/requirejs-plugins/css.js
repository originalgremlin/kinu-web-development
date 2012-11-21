// RequireJS plugin for stylesheet dependency loading
// Author: Barry Shapira
// Version: 0.1.0 (2012/08/26)
// Released under the MIT license

define(function () {
    function cacheBust (href, unique_id) {
        return href + (href.indexOf('?') < 0 ? '?' : '&') + unique_id;
    }

    function injectStyle (href, media) {
        try {
            var link = document.createElement('link');
            link.href = href;
            link.media = media || 'screen';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(link);
        } catch (e) {
            // stop r.js from freaking out
            if (e.name === 'ReferenceError' && e.message === 'document is not defined');
        }
    }

    return {
        load: function (href, req, onLoad, config) {
            if (config.urlArgs)
                href = cacheBust(href, config.urlArgs);
            injectStyle(href);
            onLoad(null);
        }
    };
});
