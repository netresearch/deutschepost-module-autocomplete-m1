"use strict";

var DatalistSupport = Class.create();

DatalistSupport.prototype = {
    initialize: function () {

    },
    hasSupport: function () {
        var datalistSupported = !!(document.createElement('datalist') && window.HTMLDataListElement);
        var ua = navigator.userAgent;

        // Android does not have actual support
        var isAndroidBrowser = ua.match(/Android/) && !ua.match(/(Firefox|Chrome|Opera|OPR)/);
        if( datalistSupported && !isAndroidBrowser ) {
            return true;
        }
        return false;
    }
};
