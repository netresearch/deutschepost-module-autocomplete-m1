"use strict";

var AutocompleteAddressSuggestions = Class.create();

/**
 * Resource model for Autocomplete Address Suggestions.
 *
 */
AutocompleteAddressSuggestions.prototype = {

    /**
     * @param {Object}
     */
    data: {},

    /**
     * @param {AutocompleteFields} autocompleteFields
     */
    autocompleteFields: {},

    /**
     * Initialize.
     *
     * @param {Object} data
     * @param {AutocompleteFields} autocompleteFields
     *
     * @constructor
     */
    initialize: function(data, autocompleteFields) {
        this.data = data;
        this.autocompleteFields = autocompleteFields;
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
    },

    /**
     * Build datalist options
     *
     * @param {String} divider
     * @param {String} optionType
     * @return {{id: string, title: string}[]}
     */
    getAddressSuggestionOptions: function(divider, optionType) {
        var suggestions = this.getAddressSuggestions(),
            options = [];
        if (suggestions.length > 0) {
            suggestions.each(function(suggestionItem) {
                var addressParts = [],
                    option = {};

                // Combine all address items to suggestion string, divided by divider
                this.autocompleteFields.getNames().each(function(fieldName) {
                    if (suggestionItem[fieldName] && suggestionItem[fieldName].length) {
                        addressParts.push(suggestionItem[fieldName]);
                    }
                });

                option.id = suggestionItem.uuid;
                option.title = addressParts.join(divider);

                options.push(option);
            }.bind(this));
        }

        return options;
    },
};
