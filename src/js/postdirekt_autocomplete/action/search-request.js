"use strict";

var SearchRequest = Class.create();

/**
 * Resource model for SearchRequest objects.
 *
 * @type {{}}
 */
SearchRequest.prototype = {
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
     * Triggers the AJAX search request.
     *
     * @param {Object}   searchFields
     * @param {Function} callback
     */
    doSearchRequest: function(searchFields, callback) {
        this.requestAdapter.searchAction(searchFields, callback);
    }
};
