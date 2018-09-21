"use strict";

var SelectRequest = Class.create();

/**
 * Resource model for SelectRequest objects.
 *
 * @type {{}}
 */
SelectRequest.prototype = {
    requestAdapter : null,

    /**
     * Initialize.
     *
     * @param {String} url
     *
     * @constructor
     */
    initialize: function(url) {
        this.requestAdapter = new RequestAdapter(url);
    },

    /**
     * Triggers the AJAX select request.
     *
     * @param {Object}   selectFields
     * @param {Function} callback
     */
    doSelectRequest: function(selectFields, callback) {
        this.requestAdapter.selectAction(selectFields, callback);
    }
};
