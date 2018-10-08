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
        this.fieldNames      = fields.getNames();
        this.divider         = divider;
    },

    /**
     * Renders the datalist.
     *
     * @param {HTMLElement} $currentField
     */
    render: function ($currentField) {
        var self             = this,
            fieldId          = $currentField.id,
            suggestions      = this.suggestionModel.getAddressSuggestions();

        this.removeDatalist($currentField);


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
    },
    /**
     * @private
     * @param {HTMLElement} field
     * @returns {HTMLElement}
     */
    getDatalist: function(field) {
        var fieldId = field.id;

        return $('datalist-' + fieldId)
    },

    /**
     *
     * @param {HTMLElement} field
     */
    removeDatalist: function (field) {
        var datalist = this.getDatalist(field);

        if (datalist) {
            datalist.remove();
        }

    }
};
