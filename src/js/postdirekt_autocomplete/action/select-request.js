"use strict";

var SelectRequest = Class.create();

/**
 * Resource model for SelectRequest objects.
 */
SelectRequest.prototype = {
    /**
     * @property {RequestAdapter} requestAdapter
     */
    requestAdapter : null,

    /**
     * Initialize.
     *
     * @param {string} url
     *
     * @constructor
     */
    initialize: function(url) {
        this.requestAdapter = new RequestAdapter(url);
    },

    /**
     * Triggers the AJAX select request.
     *
     * @param {Object} selectFields
     */
    doSelectRequest: function(selectFields) {
        this.requestAdapter.selectAction(selectFields);
    }
};
