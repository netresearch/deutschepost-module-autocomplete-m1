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
     * getAddressSuggestions.
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
    }
};
