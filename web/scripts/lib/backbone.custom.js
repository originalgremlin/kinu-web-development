define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('lib/backbone');

    // purge localStorage of expired items
    (function () {
        if (!localStorage)
            return;
        var now = new Date().getTime(),
            expired = [];
        // find all keys with expired values
        for (var i = 0, length = localStorage.length; i < length; i++) {
            try {
                var key = localStorage.key(i),
                    value = JSON.parse(localStorage.getItem(key));
                if (value.expiration && value.expiration < now)
                    expired.push(key);
            } catch (e) { }
        }
        // remove the expired items
        // can't remove them in the for loop because that will mess up the index "i"
        _.each(expired, function (key) {
            localStorage.removeItem(key);
        });
    })();

    // a mixin which allows Backbone storage types (models and collections) to only fetch data from the same url once
    var CacheMixin = {
        _cache: localStorage || {},
        cacheExpiration: 7 * 86400000,  // 7 days (in milliseconds) by default

        parse: function (response, xhr) {
            var url = _.result(this, 'url');
            // cache the data if it doesn't already exist
            if (!_.isNull(response) && !_.has(this._cache, url)) {
                // localStorage only stores string values
                var data = JSON.stringify({
                    data: response,
                    expiration: (new Date().getTime()) + this.cacheExpiration
                });
                try {
                    // save the data
                    this._cache[url] = data;
                } catch (QUOTA_EXCEEDED_ERR) {
                    // oops, our buffer is stuffed. nuke the cache and save again.
                    localStorage.clear();
                    this._cache[url] = data;
                }
            }
            return response;
        },

        sync: function (method, model, options) {
            var rv, cache;
            switch (method) {
                case "read":
                    try {
                        cache = this._cache[_.result(this, 'url')];
                        rv = _.isUndefined(cache) || _.isNull(cache) ?
                            Backbone.sync.call(this, method, model, options) :
                            options.success(JSON.parse(cache).data);
                    } catch (e) {
                        rv = Backbone.sync.call(this, method, model, options);
                    }
                    break;
                case "create":
                case "update":
                case "delete":
                    rv = Backbone.sync.call(this, method, model, options);
                    break;
            }
            return rv;
        }
    };

    Backbone.CachedModel = Backbone.Model.extend(CacheMixin);
    Backbone.CachedCollection = Backbone.Collection.extend(CacheMixin);

    // CHANGE: add 'parent' option as a special one to be attached directly to the view
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'parent'];
    _.extend(Backbone.View.prototype, {
        _configure: function (options) {
            if (this.options) options = _.extend({}, this.options, options);
            for (var i = 0, l = viewOptions.length; i < l; i++) {
                var attr = viewOptions[i];
                if (options[attr]) this[attr] = _.result(options, attr);
            }
            this.options = options;
        },

        _ensureElement: function () {
            if (!this.el) {
                var attrs = _.result(this, 'attributes') || {};
                if (this.id) attrs.id = this.id;
                if (this.className) attrs['class'] = _.result(this, 'className');
                this.setElement(this.make(this.tagName, attrs), false);
            } else {
                this.setElement(this.el, false);
            }
        }
    });

    // https://gist.github.com/1542120
    function _super(methodName, args) {
        this._superCallObjects || (this._superCallObjects = {});
        var currentObject = this._superCallObjects[methodName] || this,
            parentObject = findSuper(methodName, currentObject);
        this._superCallObjects[methodName] = parentObject;

        var result = parentObject[methodName].apply(this, args || []);
        delete this._superCallObjects[methodName];
        return result;
    }

    function findSuper(methodName, childObject) {
        var object = childObject;
        while (object[methodName] === childObject[methodName]) {
            object = object.constructor.__super__;
        }
        return object;
    }

    _.each(['Model', 'Collection', 'View', 'Router'], function (klass) {
        Backbone[klass].prototype._super = _super;
    });

    return Backbone;
});
