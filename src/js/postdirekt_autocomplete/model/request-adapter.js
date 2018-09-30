"use strict";

var RequestAdapter = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
RequestAdapter.prototype = {

    /**
     *
     * @param {string} url
     *
     * @constructor
     */
    initialize: function(url) {
        this.url = url;
    },

    /**
     * Performs an AJAX request.
     *
     * @param {Object}   searchFields
     * @param {Function} callback
     */
    ajax: function(searchFields, callback) {
        new Ajax.Request(
            this.url,
            {
                method: 'get',
                parameters: searchFields,
                onSuccess: function(response) {
                    if (callback) {
                        callback(response.responseJSON);
                    }
                }
            }
        );
    },

    /**
     * Triggers the AJAX search request.
     *
     * @param {Object}   searchFields
     * @param {Function} callback
     */
    searchAction: function(searchFields, callback) {
        this.ajax(searchFields, callback);
    },

    /**
     * Triggers the AJAX select request.
     *
     * @param {Object}   selectFields
     * @param {Function} callback
     */
    selectAction: function(selectFields, callback) {
        this.ajax(selectFields, callback);
    }
};
