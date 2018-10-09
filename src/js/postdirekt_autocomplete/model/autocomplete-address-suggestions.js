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
    },

    /**
     * Build datalist options
     *
     * @param {Array} fieldNames
     * @param {String} divider
     * @param {String} optionType
     * @return {HTMLElement[]}
     */
    getAddressSuggestionOptions: function(fieldNames, divider, optionType) {
        var suggestions = this.getAddressSuggestions(),
            options = [];
        if (suggestions.length > 0) {
            suggestions.each(function(suggestionItem) {
                var $dataListOption  = this.getOptionElement(suggestionItem, optionType),
                    addressDataArray = [];

                // Combine all address items to suggestion string, divided by divider
                fieldNames.each(function(fieldName) {
                    if (suggestionItem[fieldName] && suggestionItem[fieldName].length) {
                        addressDataArray.push(suggestionItem[fieldName]);
                    }
                });
                if (optionType === 'li') {
                    var addressData = addressDataArray.join(divider);
                    // Print suggestions's items to datalist option, separated by divider
                    $dataListOption.update(addressData);
                    $dataListOption.setAttribute('data-value', addressData);
                } else {
                    $dataListOption.value = addressDataArray.join(divider);
                }

                options.push($dataListOption);
            }.bind(this));
        }
        return options;
    },

    /**
     *
     * @param {Object} suggestionItem
     * @param {String} optionType
     * @return {Element}
     */
    getOptionElement: function (suggestionItem, optionType) {
        if (optionType === 'li') {
            return new Element('li',
                { 'id': suggestionItem.uuid });
        }

        return new Element('option',
            { 'id': suggestionItem.uuid });
    }

};
