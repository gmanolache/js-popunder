/**
 * Smart Popunder maker.
 * This class provides an easy way to make a popunder.
 * Avoid blocked on Google Chrome
 *
 * Note: For Google Chrome, to avoid blocked so each popunder will be  fired by each click.
 *
 * @author: Phan Thanh Cong aka chiplove <ptcong90@gmail.com>
 * @release Jan 11, 2015
 * @version 2.0
 */
(function(window){
    "use strict";
    var Popunder = function(url, options){ this.__construct(url, options); },
    counter     = 0,
    baseName    = 'ChipPopunder',
    lastPopTime = 0;

    Popunder.prototype = {
        defaultWindowOptions: {
            width      : window.screen.width,
            height     : window.screen.height,
            left       : 0,
            top        : 0,
            location   : 1,
            toolbar    : 1,
            status     : 1,
            menubar    : 1,
            scrollbars : 1,
            resizable  : 1
        },
        defaultPopOptions: {
            cookieExpires : null, // in minutes
            cookiePath    : '/',
            newTab        : true,
            blur          : true,
            chromeDelay   : 500,
            smart         : false // for feature, if browsers block event click to window/body
        },
        // Must use the options to create a new window in chrome
        __chromeNewWindowOptions: {
            scrollbars : 0
        },
        __construct: function(url, options) {
            this.url      = url;
            this.index    = counter++;
            this.name     = baseName + '_' + (this.index);
            this.executed = false;

            this.setOptions(options);
            this.register();
        },
        register: function() {
            if (this.isExecuted()) return;
            var self = this, w, i,
            elements = [],
            eventName = 'click',
            run = function(e) {
                // e.preventDefault();
                if (self.shouldExecute()) {
                    lastPopTime = new Date().getTime();
                    self.setExecuted();

                    if (self.options.newTab) {
                        w = window.open(self.url);
                    } else {
                        w = window.open(self.url, this.url, self.getParams());
                    }
                    if (self.options.blur) {
                        self.fireEvent(w, 'blur');
                        self.fireEvent(window, 'focus');
                    } else {
                        self.fireEvent(w, 'focus');
                        self.fireEvent(window, 'blur');
                    }
                    for(i in elements) {
                        self.detachEvent(eventName, run, elements[i]);
                    }
                }
            },
            inject = function(e){
                if (self.isExecuted()) {
                    self.detachEvent('mousemove', inject);
                    return;
                }
                try {
                    if (e.originalTarget && typeof e.originalTarget[self.name] == 'undefined') {
                        e.originalTarget[self.name] = true;
                        self.attachEvent(eventName, run, e.originalTarget);
                        elements.push(e.originalTarget);
                    }
                } catch(err) {}
            };

            // smart injection
            if (this.options.smart) {
                this.attachEvent('mousemove', inject);
            } else {
                this.attachEvent(eventName, run, window);
                elements.push(window);

                this.attachEvent(eventName, run, document);
                elements.push(document);
            }
        },
        shouldExecute: function() {
            if (this.isChrome() && lastPopTime && lastPopTime + this.options.chromeDelay > new Date().getTime()) {
                return false;
            }
            return !this.isExecuted();
        },
        isChrome: function() {
            return !!window.chrome;
        },
        isExecuted: function() {
            return !!(this.executed || this.getCookie(this.name));
        },
        setExecuted: function() {
            this.executed = true;
            this.setCookie(this.name, 1, this.cookieExpires, this.cookiePath);
        },
        setOptions: function(options) {
            this.options = this.mergeObject(this.defaultWindowOptions, this.defaultPopOptions, options || {});
            if (!this.options.newTab && this.isChrome()) {
                for(var k in this.__chromeNewWindowOptions) {
                    this.options[k] = this.__chromeNewWindowOptions[k];
                }
            }
        },
        getParams: function() {
            var params = '', k;
            for (k in this.options) {
                if (typeof this.defaultWindowOptions[k] != 'undefined') {
                    params += (params ? "," : "") + k + "=" + this.options[k];
                }
            }
            return params;
        },
        fireEvent: function(element, name) {
            if (!element) return false;

            if (typeof element[name] == 'function') {
                element[name]();
            } else {
                var event;
                if (document.createEvent) {
                    event = document.createEvent("HTMLEvents");
                    event.initEvent(name, true, true);
                  } else {
                    event = document.createEventObject();
                    event.eventType = name;
                  }
                  event.eventName = event;
                if (document.createEvent) {
                    element.dispatchEvent(event);
                } else {
                    element.fireEvent("on" + event.eventType, event);
                }
            }
        },
        detachEvent: function(event, callback, object) {
            var object = object || window;
            if (!object.removeEventListener) {
                return object.detachEvent("on" + event, callback);
            }
            return object.removeEventListener(event, callback);
        },
        attachEvent: function(event, callback, object) {
            var object = object || window;
            if (!object.addEventListener) {
                return object.attachEvent("on" + event, callback);
            }
            return object.addEventListener(event, callback);
        },
        mergeObject: function() {
            var obj = {}, i, k;
            for(i in arguments) {
                for (k in arguments[i]) {
                    obj[k] = arguments[i][k];
                }
            }
            return obj;
        },
        getCookie: function(name) {
            var cookieMatch = document.cookie.match(new RegExp(name+"=[^;]+", "i"));
            return cookieMatch ? decodeURIComponent(cookieMatch[0].split("=")[1]) : null;
        },
        setCookie: function(name, value, expires, path) {
            // expires must be number of minutes or instance of Date;
            if(expires === null || typeof expires == 'undefined') {
                expires = '';
            } else {
                var date;
                if (typeof expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 3600000);
                } else {
                    date = expires;
                }
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + escape(value) + expires + "; path=" + (path || '/');
        }
    };
    Popunder.make = function(url, options) {
        return new this(url, options);
    };
    window.SmartPopunder = Popunder;
})(window);