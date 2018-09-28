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
     * @param {Object} fields
     * @param {Object} suggestions
     * @param {String} divider
     *
     * @constructor
     */
    initialize: function(fields, suggestions, divider) {
        this.suggestionModel = suggestions;
        this.fields          = fields;
        this.fieldNames      = fields.getNames();
        this.divider         = divider;
    },

    /**
     * Renders the datalist.
     *
     * @param {HTMLElement} $currentField
     *
     */
    render: function ($currentField) {
        var self = this,
            fieldId = $currentField.id,
            $currentDataList = $('datalist-' + fieldId),
            suggestions = this.suggestionModel.getAddressSuggestions();

        if ($currentDataList) {
            $currentDataList.remove();
        }

        var $dataList = new Element('datalist', {
            'id': 'datalist-' + fieldId
        });

        suggestions.each(function(suggestionItem) {
            var $dataListOption  = new Element('option', {
                    'id': suggestionItem.uuid
                }),
                addressDataArray = [];

            // Combine all address items to suggestion string, divided by divider
            self.fieldNames.each(function(fieldName) {
                if (suggestionItem[fieldName] && suggestionItem[fieldName].length) {
                    addressDataArray.push(suggestionItem[fieldName]);
                }
            });

            // Print suggestions's items to datalist option, separated by divider
            $dataListOption.value = addressDataArray.join(self.divider);
            $dataList.insert({
                bottom: $dataListOption
            });
        });

        $currentField.setAttribute('list', 'datalist-' + fieldId);
        $currentField.insert({
            after: $dataList
        });
    }
};
