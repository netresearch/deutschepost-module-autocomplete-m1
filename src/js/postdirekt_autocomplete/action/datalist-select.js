"use strict";

var DatalistSelect = Class.create();

/**
 * Resource model for DatalistSelect objects.
 */
DatalistSelect.prototype = {
    /**
     * @property {AutocompleteFields}
     */
    fields: {},

    /**
     * @property {AutocompleteAddressSuggestions}
     */
    addressSuggestions: {},

    /**
     * @property {Object[]}
     */
    currentSuggestionObject: false,

    /**
     * Initialize.
     *
     * @param {AutocompleteFields} fields
     * @param {AutocompleteAddressSuggestions} addressSuggestions
     * @constructor
     */
    initialize: function(fields, addressSuggestions) {
        this.fields          = fields;
        this.addressSuggestions = addressSuggestions;
    },

    /**
     * Returns the selected suggestion object.
     *
     * @returns {boolean|Object}
     */
    getCurrentSuggestion: function () {
        if (this.currentSuggestionObject && this.currentSuggestionObject[0]) {
            return this.currentSuggestionObject[0];
        }

        return false;
    },

    /**
     * Updates all observed fields.
     *
     * @param {string} optionId
     */
    updateFields: function (optionId) {
        var self        = this,
            suggestions = this.addressSuggestions;

        if (optionId) {
            self.currentSuggestionObject = suggestions.getByUuid(optionId);
        }

        if (self.currentSuggestionObject && self.currentSuggestionObject.length) {
            // Fill all fields with response values
            self.fields.getNames().each(function(fieldName) {
                // Get data selector with address item
                var field = self.fields.getFieldByName(fieldName);

                if (field && self.currentSuggestionObject[0][fieldName]) {
                    field.value = self.currentSuggestionObject[0][fieldName];
                }
            });
        }
    }
};
