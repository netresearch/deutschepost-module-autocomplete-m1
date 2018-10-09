"use strict";

var SearchRequest = Class.create();

/**
 * Search request action.
 */
SearchRequest.prototype = {
    /**
     * @property {RequestAdapter} requestAdapter
     */
    requestAdapter: null,

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
     * Triggers the AJAX search request.
     *
     * @param {Object}   searchFields
     * @param {Function} callback
     */
    doSearchRequest: function(searchFields, callback) {
        this.requestAdapter.searchAction(searchFields, callback);
    }
};
