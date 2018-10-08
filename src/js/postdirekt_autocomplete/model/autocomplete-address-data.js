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
     */
    setData: function(addressData) {
        this.addressData = addressData;
    },

    /**
     * setAddressData.
     *
     * @param {String} key
     * @param {String} value
     */
    setDataValue: function(key, value) {
        this.addressData[key] = value;
    },

    /**
     * Returns current address object
     *
     * @returns {Object} addressData
     */
    getData: function() {
        return this.addressData;
    },

    /**
     * Returns TRUE if the object is empty, FALSE if some address data is set.
     *
     * @returns {boolean}
     */
    isEmpty: function() {
        for (var key in this.addressData) {
            if (this.addressData[key].length) {
                return false;
            }
        }

        return true;
    }
};
