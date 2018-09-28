"use strict";

var DataListRenderer = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
DataListRenderer.prototype = {

    /**
     *
     * @param {Object} fieldNames
     * @param {Object} suggestions
     * @param {String} divider
     *
     * @constructor
     */
    initialize: function(fieldNames, suggestions, divider) {
        this.suggestionModel = suggestions;
        this.fieldNames      = fieldNames;
        this.divider         = divider;
    },

    /**
     * Renders the datalist.
     *
     * @param {HTMLElement} $currentField
     *
     */
    render: function ($currentField) {
        var fieldId = $currentField.id,
            $currentDataList = $('datalist-' + fieldId),
            suggestions = this.suggestionModel.getAddressSuggestions();

        if ($currentDataList) {
            $currentDataList.remove();
        }

        var $dataList = new Element('datalist', {
            'id': 'datalist-' + fieldId
        });

        for (var i = 0; i < suggestions.length; ++i) {
            var $dataListOption  = new Element('option', {
                    'id': suggestions[i].uuid
                }),
                addressData = '',
                initLoop = false;

            // Combine all address items to suggestion string, divided by divider
            for (var fieldName in this.fieldNames) {
                if (suggestions[i][fieldName]) {
                    // Add divider in front of all items but first
                    if (!initLoop) {
                        initLoop = true;
                    } else {
                        addressData += this.divider;
                    }
                    addressData += suggestions[i][fieldName];
                }
            }

            $dataListOption.value = addressData;
            $dataList.insert({
                bottom: $dataListOption
            });
        }

        $currentField.setAttribute('list', 'datalist-' + fieldId);
        $currentField.insert({
            after: $dataList
        });
    }
};
