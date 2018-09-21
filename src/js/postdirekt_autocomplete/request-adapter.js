"use strict";

var RequestAdapter = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
RequestAdapter.prototype = {
    url : '',

    /**
     *
     * @param {string} apiUrl
     * @constructor
     */
    initialize: function(url) {
        this.url = url;
    },

    /**
     * Performs a AJAX request.
     *
     * @param {String}   action
     * @param {Object}   searchFields
     * @param {Function} callback
     */
    ajax: function(action, searchFields, callback) {
        new Ajax.Request(
            this.url + action,
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
        this.ajax('search', searchFields, callback);
    },

    /**
     * Triggers the AJAX select request.
     *
     * @param {Object}   selectFields
     * @param {Function} callback
     */
    selectAction: function(selectFields, callback) {
        this.ajax('select', selectFields, callback);
    }
};
