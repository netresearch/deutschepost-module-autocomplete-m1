"use strict";

var AutocompleteAddressSuggestions = Class.create();

/**
 * Resource model for AutocompleteAddressSuggestions objects.
 *
 * @type {{}}
 */
AutocompleteAddressSuggestions.prototype = {

    /**
     * Initialize.
     *
     * @param {Object} data
     *
     * @constructor
     */
    initialize: function(data) {
        this.data = data
    },

    /**
     * Sets suggestion object.
     *
     * @param {Object} data
     *
     */
    setAddressSuggestions: function(data) {
        this.data = data;
    },

    /**
     * Returns suggestion object.
     *
     * @returns {Object}
     *
     */
    getAddressSuggestions: function() {
        return this.data;
    },
    /**
     * Returns suggestion item by Uuid.
     *
     * @param {String} uuid
     *
     * @returns {Object}
     *
     */
    getByUuid: function(uuid) {
        return this.data.filter(function (item) {
            return item.uuid === uuid;
        });
    }
};
