"use strict";

var DatalistSupport = Class.create();

/**
 * @type {{hasSupport: DatalistSupport.hasSupport}}
 */
DatalistSupport.prototype = {
    /**
     * @constructor
     */
    initialize: function () {},

    /**
     * Detect support for the 'datalist' html element
     *
     * @return {boolean}
     */
    hasSupport: function () {
        var datalistSupported = !!(document.createElement('datalist') && window.HTMLDataListElement);
        var ua                = navigator.userAgent;
        var isFireFox         = /firefox/i.test(ua);

        // Android does not have actual support
        var isAndroidBrowser = ua.match(/Android/) && !ua.match(/(Firefox|Chrome|Opera|OPR)/);

        if (datalistSupported && !isAndroidBrowser && !isFireFox) {
            return true;
        }

        return false;
    }
};
