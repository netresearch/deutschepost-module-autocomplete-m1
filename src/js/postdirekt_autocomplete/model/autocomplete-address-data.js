"use strict";

var AutocompleteAddressData = Class.create();

/**
 * Resource model for AutocompleteAddressData objects.
 *
 * @type {{}}
 */
AutocompleteAddressData.prototype = {

    /**
     * Initialize.
     *
     * @param {Object} addressData
     *
     * @constructor
     */
    initialize: function(addressData) {
        this.addressData = addressData;
    },

    /**
     * setAddressData.
     *
     * @param {Object} addressData
     *
     */
    setData: function(addressData) {
        this.addressData = addressData;
    },

    /**
     * setAddressData.
     *
     * @param {String} key
     * @param {String} value
     *
     */
    setDataValue: function(key, value) {
        this.addressData[key] = value;
    },

    /**
     * Returns current address object
     *
     * @returns {Object} addressData
     *
     */
    getData: function() {
        return this.addressData;
    }
};
